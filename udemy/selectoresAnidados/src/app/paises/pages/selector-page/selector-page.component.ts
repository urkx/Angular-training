import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  });

  regiones: string[] = [];

  constructor(private fb: FormBuilder, private ps: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.ps.regiones;
  }

  guardar(){
    console.log(this.miFormulario.value);
  }

}
