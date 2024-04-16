import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CursoService} from "../../services/curso.service";
import {RouterLink} from "@angular/router";
import {Option} from "../../interfaces/option";
import {ModalComponent} from "../../util/modal/modal.component";
import {MdbModalModule, MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {FormModalComponent} from "../../util/form-modal/form-modal.component";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    MdbModalModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  searchTerm:string="";
  cursos: Option[] = [];
  nombreCurso:string="";
  constructor(private modalService: MdbModalService,private cursoService: CursoService) {
    this.buscar();
  }
  openEliminarModal(option:Option) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { name:"curso",option:option },
    });
    this.modalRef.onClose.subscribe((o: Option) => {
      if (o!=null){
        this.eliminarCurso(o.id)
      }
    });
  }
  openEditarModal(o:Option) {
    this.modalRef = this.modalService.open(FormModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: { name:"asignatura",option: {id:o.id,nombre:o.nombre} },
    });
    this.modalRef.onClose.subscribe((o: Option) => {
      if (o!=null){
        this.editarCurso(o)
      }
    });
  }
  buscar(){
    this.cursoService.buscarAsignatura(this.searchTerm).subscribe({
      next: (data:any) => {
        this.cursos = (data as Option[])
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  crearCurso() {
      if (this.existe(this.nombreCurso)){
          this.cursoService.crearCurso(this.nombreCurso).subscribe({
              next: (data) => {
                  this.cursos.push(data as Option)
              },
              error: (error) => {
                  console.error(error);
              }
          });
      }else{
        alert("¡El curso ya existe!")
      }
  }
  editarCurso(o:Option){
    if (this.existe(o.nombre)){
      this.cursoService.actualizarCurso(o).subscribe({
        next: (data) => {
          this.cursos.splice(this.cursos.findIndex(a=>a.id==o.id), 1, o);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }else{
      alert("¡El curso ya existe!")
    }
  }
    eliminarCurso(id: number) {
        this.cursoService.deleteCurso(id).subscribe({
            next: (data) => {
                this.cursos = this.cursos.filter(c => c.id != id)
            },
            error: (error) => {
              alert("No se ha podido eliminar el curso")
              console.error(error);
            }
        });
    }
  existe(nombre:string):boolean{
    return this.cursos.filter(c=>c.nombre==nombre).length==0;
  }
}