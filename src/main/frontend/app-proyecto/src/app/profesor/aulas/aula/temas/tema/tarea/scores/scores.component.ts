import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TareaService} from "../../../../../../../services/tarea.service";
import {NgForOf, NgIf} from "@angular/common";
import {PuntoEstudiante} from "../../../../../../../interfaces/tarea-estudiante";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,NgbModule
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent {
  id:number=0
  puntos:PuntoEstudiante[]=[]
  constructor(route:ActivatedRoute,private tareaService:TareaService) {
    route.params.subscribe(p => {
      this.id = Number(p['id'])||0;
      tareaService.getPuntos(this.id).subscribe({
        next: (t) => {
          this.puntos=t;
        },
        error: (error) => {
          alert(error);
        }
      })
    })
  }
  onColorClick(estudianteId:number,nivel: number) {
    this.tareaService.changeNivel(this.id,estudianteId,nivel).subscribe({
      next: (t) => {
        this.puntos.filter(p=>p.estudiante.id==estudianteId)[0].fase=t
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
