import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(private firestore: AngularFirestore) {}

  //Crea la tarea en firestore dentro de la colecion tarea
  agregarTarea(tarea: any): Promise<any> {
    let infoDocente = JSON.parse(localStorage.getItem('infoDocente'));
    return this.firestore
      .collection('docentes')
      .doc(infoDocente.email)
      .collection('tareas')
      .add(tarea);
  }

  //Servicio que consume los datos
  getTarea(): Observable<any> {
    let infoDocente = JSON.parse(localStorage.getItem('infoDocente'));
    return this.firestore
      .collection('docentes')
      .doc(infoDocente.email)
      .collection('tareas', (ref) => ref.orderBy('fechaCreacion', 'desc'))
      .snapshotChanges();
  }

  eliminarTarea(id: string): Promise<any> {
    let infoDocente = JSON.parse(localStorage.getItem('infoDocente'));
    return this.firestore
      .collection('docentes')
      .doc(infoDocente.email)
      .collection('tareas')
      .doc(id)
      .delete();
  }
}
