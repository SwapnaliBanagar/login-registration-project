import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login-service';
import { RegistrationService } from '../../../services/register/registration-service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistrationDto } from '../../../models/register/registration-dto';
import { CountryDto } from '../../../models/country/country-dto';
import { StateDto } from '../../../models/state/state-dto';
import { CityDto } from '../../../models/cities/city-dto';
import { CountyService } from '../../../services/country/county-service';
import { StateService } from '../../../services/state/state-service';
import { CityServices } from '../../../services/city/city-services';
import { form } from '@angular/forms/signals';


@Component({
  selector: 'app-update-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  templateUrl: './update-page.html',
  styleUrl: './update-page.css',
})
export class UpdatePage implements OnInit {
  username: string = '';
  password: string = '';

  user: any = {
    username: '',
    password: '',
    gender: '',
    dob: new Date(),
    language: [],
    mobileNo: '',
    email: '',
    countryName: '',
    stateName: '',
    cityName: ''
  };


  showUpdateForm = false;

  hidePassword = true;


  countryDto: CountryDto[] = [];
  selectCountryName!: string;


  stateDto: StateDto[] = [];
  selectStateName!: string;

  cityDto: CityDto[] = [];
  selectCityName!: string;


  ngOnInit(): void {
    this.getCountries();

  }

  constructor(private router: Router, private registrationService: RegistrationService,
    private countryService: CountyService, private stateService: StateService,
    private cityService: CityServices, private cdr: ChangeDetectorRef) { }


  backButton() {
    //alert("update page back button clicked..");
    this.router.navigate(["/login"]);
  }


  checkValidationForUpdate() {

    if (!this.username || !this.password) {
      alert('Please enter username and password!');
      return;
    }


    this.registrationService.checkUserNamePassword(this.username, this.password).subscribe({
      next: (response) => {

        this.registrationService.getUserByUsername(this.username).subscribe({
          next: (data) => {
            //console.log(data);
            this.user = data;
            this.getStateByCountry(this.user.country.countryName);
            this.getCities(this.user.state.stateName);
          }
        });


        // Use SweetAlert instead of alert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response,
          confirmButtonText: 'Continue to Update'
        }).then(() => {
          this.showUpdateForm = true;
          this.cdr.detectChanges(); // Ensure Angular updates the *ngIf
        });
      },

      error: (err) => {
        alert(err.error);
      }
    });
  }
  //---------------------------------------------------------------------------------------------------------------

  getCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countryDto = data;
        console.log('All Countries:', this.countryDto); // 👈 print all countries
      },

      error: (err) => console.error(err)
    });
  }


  getStateByCountry(countryName: string) {

    this.stateService.getStateByCountryName(countryName).subscribe({
      next: (data) => {

        
        //this.user.state.stateName=null; // remove old value from (user)

        this.stateDto = data;
            
        console.log("Selected Country Name:", countryName);

        

        // Clear old selections
        this.selectStateName = '';
        this.selectCityName = '';
        this.cityDto = [];

        // Print only state names
        const stateNames = this.stateDto.map(state => state.stateName);
        console.log("States by country:", stateNames);

      },
      error: (err) => console.log(err)
    });
  }

  getCities(stateName: string) {

    this.cityService.getCityByStateName(stateName).subscribe({
      next: (data) => {

        //this.user.city.cityName=null; // remove old value from (user)

        this.cityDto = data;
        console.log("Selected state name:", stateName);

        // Print only state names
        const cityNames = this.cityDto.map(city => city.cityName);
        console.log("Cities by State:", cityNames);

      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  //-------------------------------------------------------------

updateDetails(form:NgForm)
{

  //console.log(this.user);
 
  if (
    !this.user.email ||
    !this.user.gender ||
    !this.user.dob ||
    !this.user.mobileNo ||
    !this.user.country?.countryName ||
    !this.user.state?.stateName ||
    !this.user.city?.cityName
  ) {
    //alert('All fields are mandatory');
    return;
  }


 

 // ✅ CREATE DTO OBJECT (THIS IS THE KEY)
  const registrationDto: RegistrationDto = {
    username: this.user.username,
    password: this.user.password,
    email: this.user.email,
    gender: this.user.gender,
    dob: this.user.dob,
     language: [this.user.language],
    mobileNo: this.user.mobileNo,
    countryName: this.user.country.countryName,
    stateName: this.user.state.stateName,
    cityName: this.user.city.cityName,
    
  };

  //console.log('Payload sent to backend:', registrationDto);

  
 this.registrationService.updateUserDetails(registrationDto).subscribe({
  next:(response)=>{
    
    console.log("Response:",response);
    Swal.fire({                                      // this is using sweetaltert2
                icon: 'success',
                title: response,
                confirmButtonText: 'OK'
              });
              this.router.navigate(["/login"]);
  },
  error:(err)=>{
    alert(err.error);
  }
 });

  
}

}
