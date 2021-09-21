import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.evs]],
    username: ['', [Validators.required, this.vs.noPuedeSerPericoPalotes]],
    password:['',[Validators.required, Validators.minLength(6)]],
    password2:['',[Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password', 'password2')]
  });

  //emailErrorMsg: string = '';

  constructor(private fb: FormBuilder, private vs: ValidatorService, private evs: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Urko Lopez',
      email: 'test@protonmail.com',
      username: 'ChemaElCrema',
      password: '123456',
      password2: '123456',
    });
  }

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'El email es obligatorio';
    } else if(errors?.pattern){
      return 'El email no tiene un formato válido';
    } else if(errors?.usedEmail){
      return 'El email ya está en uso';
    }
    
    return '';
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }

  emailRequired(){
    return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  }

  emailFormat(){
    return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  }

  emailUsed(){
    return this.miFormulario.get('email')?.errors?.usedEmail && this.miFormulario.get('email')?.touched;
  }


}
