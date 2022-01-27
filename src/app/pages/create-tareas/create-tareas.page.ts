import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tareas.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.page.html',
  styleUrls: ['./create-tareas.page.scss'],
})
export class CreateTareasPage implements OnInit {
  createTarea: FormGroup;
  submitted = false;
  myForm: FormGroup;
  loading: boolean = false;

  options: AnimationOptions = {
    path: 'assets/agregar.json',
  };

  constructor(
    public formBuilder: FormBuilder,
    private _tareaService: TareasService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      horas: ['', Validators.required],
      tarea: ['', Validators.required],
    });
  }

  ngOnInit() {}

  fetchDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('fecha').setValue(date, {
      onlyself: true,
    });
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    const tarea: any = {
      fecha: this.myForm.value.fecha,
      horas: this.myForm.value.horas,
      tarea: this.myForm.value.tarea,
      fechaCreacion: new Date(),
    };

    this.loading = true;

    this._tareaService
      .agregarTarea(tarea)
      .then(() => {
        console.log('Tarea registrada con exito');
        this.loading = false;
        this.router.navigate(['/tareas']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
}
