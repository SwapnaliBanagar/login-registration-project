import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login-service';
import { LoginDto } from '../../../models/login/login-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {

  hidePassword = true;

  loginDto: LoginDto = new LoginDto;

  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {

  }

  checkValidation(loginForm: NgForm) {
    //alert("Inside check validation..");

    if (loginForm.invalid) {
      alert("Invalid form");
      return;
    }

    this.loginDto.username = loginForm.value.username;
    this.loginDto.password = loginForm.value.password;

    this.loginService.doLoginSuccessfully(this.loginDto).subscribe({
      next: (response) => {
        this.router.navigate(["/loginSuccess"]);
      },
      error: (err) => {
        

        if (err.error=="Invalid username.") {
          Swal.fire
            ({
              icon: 'error',
              title: err.error,
              text: 'Please enter valid username',
              confirmButtonText: 'OK'
            });
        }


        else if (err.error == "Invalid password..") {
          Swal.fire
            ({
              icon: 'error',
              title: err.error,
              text: 'Please enter valid password',
              confirmButtonText: 'OK'
            });

        }
        else {
          console.log(err)
        }





      }
    });
  }

  registrationPage() {
    console.log("Registration button clicked");
    this.router.navigate(["/register"]);
  }


  updatePage() {
    console.log("Update button clicked");
    this.router.navigate(["/update"]);
  }


}




