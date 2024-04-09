import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl('admin').then(() => {console.log('Ya logueado, cargando index.')});
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.clean();
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('isLoggedIn = '+ this.isLoggedIn);
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
        // this.router.navigate(['index']).then(
        //   () => {console.log('Login OK, cargando index.')}
        // )
        console.log(data)
      },
      error: err => {
        this.errorMessage = "usuario o contraseña incorrecta";
        this.isLoginFailed = true;
        console.log(err)
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
