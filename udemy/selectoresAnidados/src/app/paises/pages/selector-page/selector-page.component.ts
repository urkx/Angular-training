import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(private fb: FormBuilder, private ps: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.ps.regiones;

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => {
        this.miFormulario.get('pais')?.reset('');
      }),
      switchMap(region => this.ps.getPaisesPorRegion(region))
    )
    .subscribe(paises => {
      this.paises = paises;
    });

  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
