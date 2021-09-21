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

  constructor(private fb: FormBuilder, private vs: ValidatorService, private evs: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Urko López',
      email: 'test@protonmail.com',
      username: 'ChemaElCrema',
    });
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    this.miFormulario.markAllAsTouched();
  }

}
