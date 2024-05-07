import { Routes } from '@angular/router';
import {ClasesComponent} from "./admin/clases/clases.component";
import {LoginComponent} from "./login/login.component";
import {canActivateAdmin, canActivateEstudiante, canActivateProfesor} from "./security/authguard";
import {AdminComponent} from "./admin/admin.component";
import {CursosComponent} from "./admin/cursos/cursos.component";
import {AsignaturasComponent} from "./admin/asignaturas/asignaturas.component";
import {UsuariosAdminComponent} from "./admin/usuarios/usuarios-admin.component";
import {ProfesorFormComponent} from "./admin/usuarios/profesor/form/form.component";
import {EstudianteFormComponent} from "./admin/usuarios/estudiante/form/form.component";
import {ProfesorComponent} from "./profesor/profesor.component";
import {EstudianteComponent} from "./estudiante/estudiante.component";
import {AulasProfesorComponent} from "./profesor/aulas/aulas-profesor.component";
import {AulaProfesorComponent} from "./profesor/aulas/aula/aula-profesor.component";
import {UsuariosProfesorComponent} from "./profesor/aulas/aula/usuarios/usuarios-profesor.component";
import {TemasProfesorComponent} from "./profesor/aulas/aula/temas/temas-profesor.component";
import {ClaseComponent} from "./admin/clases/clase/clase.component";
import {ProfesoresClaseComponent} from "./admin/clases/clase/profesores/profesores-clase.component";
import {TareasComponent} from "./admin/clases/clase/tareas/tareas.component";
import {AulasClaseComponent} from "./admin/clases/clase/aulas/aulas-clase.component";
import {AulasEstudianteComponent} from "./estudiante/aulas/aulas-estudiante.component";
import {AulaEstudianteComponent} from "./estudiante/aulas/aula/aula-estudiante.component";
import {TemasEstudianteComponent} from "./estudiante/aulas/aula/temas/temas-estudiante.component";
import {UsuariosEstudianteComponent} from "./estudiante/aulas/aula/usuarios/usuarios-estudiante.component";

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent, canActivate: [canActivateAdmin],children:[
      {path:'clases',component:ClasesComponent},
      {path:'clases/:id',component:ClaseComponent,children:[
          {path:'',component:TareasComponent},
          {path:'aulas',component:AulasClaseComponent},
          {path:'profesores',component:ProfesoresClaseComponent},
          {path:'**',pathMatch:'full',redirectTo:''}
        ]},
      {path:'cursos',component:CursosComponent},
      {path:'asignaturas',component:AsignaturasComponent},
      {path:'usuarios',component:UsuariosAdminComponent},
      {path:'profesor/create',component:ProfesorFormComponent},
      {path:'profesor/edit/:id',component:ProfesorFormComponent},
      {path:'estudiante/create',component:EstudianteFormComponent},
      {path:'estudiante/edit/:id',component:EstudianteFormComponent},
      {path:'**',pathMatch:'full',redirectTo:'clases'}
      ]
  },
  {path:'profesor',component:ProfesorComponent, canActivate: [canActivateProfesor],children:[
      {path:'',component:AulasProfesorComponent},
      {path:'aula/:id',component:AulaProfesorComponent,children:[
          {path:'',component:TemasProfesorComponent},
          {path:'usuarios',component:UsuariosProfesorComponent},
          {path:'**',pathMatch:'full',redirectTo:''}
        ]},
      {path:'**',pathMatch:'full',redirectTo:''}
    ]
  },
  {path:'estudiante',component:EstudianteComponent, canActivate: [canActivateEstudiante],children:[
      {path:'',component:AulasEstudianteComponent},
      {path:'aula/:id',component:AulaEstudianteComponent,children:[
          {path:'',component:TemasEstudianteComponent},
          {path:'usuarios',component:UsuariosEstudianteComponent},
          {path:'**',pathMatch:'full',redirectTo:''}
        ]},
      {path:'**',pathMatch:'full',redirectTo:''}
    ]
  },
  {path:'**',pathMatch:'full',redirectTo:'login'}
];
