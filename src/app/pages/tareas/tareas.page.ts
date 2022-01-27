import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TareasService } from 'src/app/services/tareas.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareas: any[] = [];

  constructor(private _tareaService: TareasService) {}
  page: number = 1;

  ngOnInit() {
    this.getTareas();
    console.log(JSON.parse(localStorage.getItem('infoDocente')));
  }

  getTareas() {
    this._tareaService.getTarea().subscribe((data) => {
      this.tareas = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.tareas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(), //crear objeto con el ID y toda la información
        });
      });
      localStorage.setItem('tareasDocente', JSON.stringify(this.tareas));
      console.log(this.tareas);
    });
  }

  eliminarTarea(id: string) {
    this._tareaService
      .eliminarTarea(id)
      .then((data) => {
        console.log('Tarea Eliminada');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  options: AnimationOptions = {
    path: 'assets/TareasDurmiendo.json',
  };
}
