import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from 'src/app/services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private _heroesService: HeroesService, private _router: Router ) { //console.log('Constructor') 
  }

  ngOnInit(): void {
    this.heroes = this._heroesService.getHeroes();
    //console.log(this.heroes);
  }

  verHeroe(idx: number)
  {
    this._router.navigate(['/heroe',idx]);
  }

}
