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
    frontera: ['', [Validators.required]],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  cargando: boolean = false;

  constructor(private fb: FormBuilder, private ps: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.ps.regiones;

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => {
        this.miFormulario.get('pais')?.reset('');
        this.cargando = true;
      }),
      switchMap(region => this.ps.getPaisesPorRegion(region))
    )
    .subscribe(paises => {
      this.paises = paises;
      this.cargando = false;
    });

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap(() => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap(codigo =>this.ps.getPaisPorCodigo(codigo))
    )
    .subscribe( pais => {
      this.fronteras = pais?.borders || [];
      this.cargando = false;  
    });

  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
