import { Component, OnInit } from '@angular/core';

interface Persona{
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {


  persona: Persona = {
    nombre: 'Urko',
    favoritos: [
      {id: 1, nombre: 'MGS'},
      {id: 2, nombre: 'MGS2'}
    ]
  };

  nuevoJuego: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    console.log('Formulario posteado');
  }

  eliminar(idx: number){
    this.persona.favoritos.splice(idx, 1);
  }

  agregarJuego(){
    const juego: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    };

    this.persona.favoritos.push({...juego});
    this.nuevoJuego = '';
  }

}
