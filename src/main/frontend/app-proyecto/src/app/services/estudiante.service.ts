import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Estudiante} from "../interfaces/estudiante";
const ESTUDIANTEURL="http://localhost:8080/v1/api/estudiantes"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http:HttpClient) {
  }

  //Métodos (incluir tipos correctos en los argumentos)
  getEstudiantes():Observable<Object>{
    return this.http.get(ESTUDIANTEURL);
  }
  getEstudiante(id:number):Observable<Object>{
    const url = `${ESTUDIANTEURL}/${id}`
    return this.http.get<Estudiante>(url);
  }
  crearEstudiante(nombre:any):Observable<Object>{
    return this.http.post<Estudiante>(ESTUDIANTEURL, {
      nombre
    },HTTPOPTIONS)
  }

  actualizarEstudiante(e:any):Observable<Object>{
    const url = `${ESTUDIANTEURL}/${e.id}`;
    return this.http.put<Estudiante>(url, e, HTTPOPTIONS);
  }

  deleteEstudiante(e:any):Observable<any>{
    const url = `${ESTUDIANTEURL}/${e}`
    return this.http.delete(url, HTTPOPTIONS)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
