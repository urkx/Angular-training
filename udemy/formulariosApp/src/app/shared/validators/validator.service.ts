import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerPericoPalotes(control: FormControl): ValidationErrors | null{
    const valor: string = control.value?.trim().toLowerCase();

    if(valor === 'pericopalotes'){
      return {
        noPericoPalotes: true,
      }
    }
    return null; //null means there is no error in validation!
  }
}
