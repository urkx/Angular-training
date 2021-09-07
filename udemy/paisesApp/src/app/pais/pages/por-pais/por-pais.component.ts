import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`

    li{
      cursor: pointer;
    }

  `
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){

    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    this.paisService.buscarPais(this.termino)
    .subscribe( paises => {

      console.log(paises);
      this.paises = paises;

    },
      error => {
        this.hayError = true;
        this.paises = [];
      });

  }

  sugerencias(termino: string){
    this.hayError=false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino).subscribe(res => this.paisesSugeridos = res.splice(0,3), (err) => this.paisesSugeridos = []);
  }

  buscarSugerido(termino: string){
    this.mostrarSugerencias = false;
    this.buscar(termino);
  }

}
