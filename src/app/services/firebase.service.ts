import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { TareasService } from './tareas.service';

const firebaseConfig = {
  apiKey: 'AIzaSyDMKt_ygSWGmV0239jrv4cccoN6pe3Bu0Y',
  authDomain: 'angulardash-7c183.firebaseapp.com',
  projectId: 'angulardash-7c183',
  storageBucket: 'angulardash-7c183.appspot.com',
  messagingSenderId: '373679118964',
  appId: '1:373679118964:web:b58a53e8398d1172220f21',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  provider = new GoogleAuthProvider();
  auth = getAuth();

  //Variables necesarias para los docentes
  infoDocente: any;
  tareasDocente: any;
  listaDocentes: any;
  numerotareas: any;

  //Variables necesarias para los admins
  infoAdmin: any;
  uidDocentes: any = {};

  datosDocentes: any = {};

  constructor(
    private router: Router,
    private tareas: TareasService,
    private firestore: AngularFirestore
  ) {}

  //Funcion para verificar si el docente esta autorizado
  async checkDocentes(user) {
    const docSnap = await getDoc(doc(db, 'autorizados', 'docentes'));
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data()['correos']);
      let listaDocentes = docSnap.data()['correos'];
      if (listaDocentes.includes(user.email)) {
        console.log('yes');
        this.infoDocente = {
          uid: user.uid,
          email: user.email,
          nombre: user.displayName,
        };
        const creacionDocente = async () => {
          await setDoc(doc(db, 'docentes', user.email), {
            email: user.email,
            nombre: user.displayName,
          });
        };
        creacionDocente().then(() => {
          localStorage.setItem('infoDocente', JSON.stringify(this.infoDocente));
          localStorage.setItem(
            'tareasDocente',
            JSON.stringify(this.tareasDocente)
          );
          this.router.navigate(['/tareas']);
        });
      } else {
        alert('No esta autorizado');
      }
    }
  }

  //Funcion para verificar si el usuario es un admin
  async checkAdmins(user) {
    const docSnap = await getDoc(doc(db, 'autorizados', 'admins'));
    if (docSnap.exists()) {
      let listaAdmins = docSnap.data()['correos'];
      if (listaAdmins.includes(user.email)) {
        let getAllDocentes = async () => {
          const querySnapshot = await getDocs(collection(db, 'docentes'));
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            this.uidDocentes[doc.id] = doc.data();
          });
        };
        getAllDocentes().then(() => {
          localStorage.setItem(
            'listaDocentes',
            JSON.stringify(this.uidDocentes)
          );
          this.router.navigate(['/admin-layout']);
        });
      }
    }
  }

  loginGoogle() {
    this.provider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // User obtiene los datos del correo que se logea
        const user = result.user;
        const checkUID = async () => {
          const uidSnap = await getDoc(doc(db, 'docentes', user.uid));
          if (uidSnap.exists()) {
            this.infoDocente = {
              uid: user.uid,
              email: user.email,
              nombre: user.displayName,
            };
            localStorage.setItem(
              'infoDocente',
              JSON.stringify(this.infoDocente)
            );
            this.router.navigate(['/tareas']);
          } else {
            this.checkDocentes(user);
          }
        };
        checkUID();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  }

  loginGoogleAdmin() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const user = result.user;
        this.checkAdmins(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
      });
  }

  datosDashboard(arrayDocentes) {
    arrayDocentes.forEach((element) => {
      const queryDocentes = async () => {
        const querySnapshot = await getDocs(
          collection(db, 'docentes', element, 'tareas')
        );
        let horas = 0;
        let tareas = 0;

        querySnapshot.forEach((doc) => {
          horas += doc.data()['horas'];
          tareas++;
          this.datosDocentes[element] = {
            horas: horas,
            tareas: tareas,
          };
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
        });
      };

      queryDocentes();
    });
  }

  async getInfo(correo: any) {
    let document;
    // console.log(correo);
    const promise = await new Promise((resolve) => {
      return this.firestore
        .collection('docentes')
        .doc(correo)
        .collection('tareas')
        .get()
        .toPromise()
        .then((resp) => {
          document = resp.docs;
        })
        .then(() => {
          resolve(document);
        });
    });
    return promise;
  }
}
