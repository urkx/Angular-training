import { FormControl } from "@angular/forms";

export const nombreApellidoPattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const noPuedeSerPericoPalotes = (control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();

    if(valor === 'pericopalotes'){
      return {
        noPericoPalotes: true,
      }
    }
    return null; //null means there is no error in validation!
  }