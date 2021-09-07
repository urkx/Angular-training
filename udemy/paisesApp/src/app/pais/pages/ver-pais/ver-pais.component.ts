import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe( 
        switchMap((params) => this.paisService.buscarPaisPorCodigo(params.id)), 
        tap(console.log) 
      )
      .subscribe(pais => this.pais = pais);

    // this.activatedRoute.params.subscribe(({id}) => {  // {id} === params.id
    //   this.paisService.buscarPaisPorCodigo(id)
    //   .subscribe(pais => {
    //     console.log(pais);
    //   });
    // })
  }

}
