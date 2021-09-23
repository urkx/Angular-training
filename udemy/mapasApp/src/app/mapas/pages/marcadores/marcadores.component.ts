import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
       height: 100%;
       width: 100%;
     }

     .list-group{
       position: fixed;
       top: 20px;
       right: 20px;
       z-index: 99;
     }

     li{
       cursor: pointer;
     }
   `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-6.0051704, 37.408372];
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    /* const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola Mundo';

    new mapboxgl.Marker(
      {element: markerHtml}
      )
      .setLngLat(this.center)
      .addTo(this.mapa); */

    this.leerLocalStorage();
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

    this.marcadores.push({
      color: color, 
      marker: nuevoMarcador
    });

    this.guardarMarcadorEnLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadorEnLocalStorage();
    });

  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }

  guardarMarcadorEnLocalStorage(){
    
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {

      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });

    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){return;}

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!); 

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
          color: m.color,
          draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadorEnLocalStorage();
      });
    });

  }

  borrarMarcador(idx: number){
    this.marcadores[idx].marker?.remove();
    this.marcadores.splice(idx, 1);
    this.guardarMarcadorEnLocalStorage();
  }

}
