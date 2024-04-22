import { Component } from '@angular/core';
import {MdbModalModule, MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalComponent} from "../../util/modal/modal.component";
import {AulaForm} from "../../interfaces/aula";
import {Option} from "../../interfaces/option";
import {ProfesorService} from "../../services/profesor.service";
import {AulaService} from "../../services/aula.service";
import {StorageService} from "../../services/storage.service";
import {FormModalComponent} from "../../util/form-modal/form-modal.component";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-aulas',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    MdbModalModule
  ],
  templateUrl: './list-aulas.component.html',
  styleUrl: './list-aulas.component.css'
})
export class ListAulasComponent {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  aula:AulaForm={
    id:0,
    clase:{id:0,nombre:""},
    grupo:"",
    año:""
  }
  aulas:Option[]=[];
  clases:Option[]=[];
  constructor(private profesorService:ProfesorService,private aulaService:AulaService,
              private modalService: MdbModalService,private storageService: StorageService) {
    var id=storageService.getUser().content.id
    profesorService.getAulas(id).subscribe({
      next: (a) => {
        this.aulas = a as Option[]
      },
      error: (error) => {
        console.error(error);
      }
    })
    profesorService.getClases(id).subscribe({
      next: (c) => {
        this.clases = c as Option[]
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  openEditarModal(o:Option) {
    this.modalRef = this.modalService.open(FormModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: { name:"Aula",option: {id:o.id,nombre:o.nombre} },
    });
    this.modalRef.onClose.subscribe((o: Option) => {
      if (o!=null){
        this.editarAula(o)
      }
    });
  }
  openEliminarModal(option:Option) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { name:"Aula",option:option },
    });
    this.modalRef.onClose.subscribe((o: Option) => {
      if (o!=null){
        this.eliminarAula(o.id)
      }
    });
  }
  ngOnInit(){
    const anioActual = new Date().getFullYear()-2000;
    this.aula.año = `${anioActual}/${anioActual + 1}`;
  }
  crearAula(){
    console.log(this.aula)
    if (this.aula.clase.id>0){
      this.aulaService.crearAula(this.aula).subscribe({
        next: (data) => {
          console.log(data)
          this.aulas.push(data as Option)
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }
  editarAula(o:Option){
    this.aulaService.actualizarAula(o).subscribe({
      next: (data) => {
        this.aulas.splice(this.aulas.findIndex(a=>a.id==o.id), 1, o);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  eliminarAula(id: number) {
    this.aulaService.deleteAula(id).subscribe({
      next: (data) => {
        this.aulas = this.aulas.filter(a => a.id != id)
      },
      error: (error) => {
        alert("No se ha podido eliminar el aula")
        console.error(error);
      }
    });
  }
}