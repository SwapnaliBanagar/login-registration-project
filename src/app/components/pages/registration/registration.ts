import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CountryDto } from '../../../models/country/country-dto';
import { CountyService } from '../../../services/country/county-service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StateDto } from '../../../models/state/state-dto';
import { StateService } from '../../../services/state/state-service';
import { CityServices } from '../../../services/city/city-services';
import { CityDto } from '../../../models/cities/city-dto';
import { RegistrationService } from '../../../services/register/registration-service';
import { RegistrationDto } from '../../../models/register/registration-dto';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-registration',
  standalone: true,
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
MatDatepickerModule,
MatNativeDateModule,
  ],
  templateUrl: './registration.html',
   styleUrl: './registration.css',
})

export class Registration implements OnInit {


  countryDto: CountryDto[] = [];
  selectCountryName!: string;


  stateDto: StateDto[] = [];
  selectStateName!: string;

  cityDto: CityDto[] = [];
  selectCityName!: string;

  registrationDto!: RegistrationDto;


  hidePassword = true;

  ngOnInit(): void {
    this.getCountries();
    // this.getStates();
  }

  constructor(private router: Router,
    private countryService: CountyService, private stateService: StateService,
    private cityService: CityServices, private registrationService: RegistrationService) { }






  getCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countryDto = data;
        console.log('All Countries:', this.countryDto); // 👈 print all countries
      },

      error: (err) => console.error(err)
    });
  }

  //---------------------------------------------  get all states  -----------------------------------------------------------------------------

  //  getStates()
  //  {
  //   this.stateService.getAllStates().subscribe({
  //     next:(data)=>
  //     {
  //       this.stateDto=data
  //        console.log("All States:",this.stateDto); //-- print all states
  //     },
  //     error:(err)=>console.error(err)
  //   });
  //  } 


  //---------------------------------------------  get states by country Name -----------------------------------------------------------------------------

  getStateByCountry(countryName: string) {
    
    this.stateService.getStateByCountryName(countryName).subscribe({
      next: (data) => {
       
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



  //---------------------------------------------  get city by state Name  -----------------------------------------------------------------------------


  getCities(stateName: string) {
   
    this.cityService.getCityByStateName(stateName).subscribe({
      next: (data) => {
       
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



  //---------------------------------------------  save/add registration details -----------------------------------------------------------------------------


  //  --------- for language -----------
  selectedLanguages: string[] = [];

  onLangChange(event: any, lang: string) {
    if (event.checked) {
      this.selectedLanguages.push(lang);
    } else {
      this.selectedLanguages =
        this.selectedLanguages.filter(n => n !== lang);
    }
  }




  doRegistration(form: NgForm) {
    if (form.valid) {

      const registrationData: RegistrationDto = {
        ...form.value,
        language: [...this.selectedLanguages]
      };
        //console.log(registrationData);


      this.registrationService.addRegistrationDetails(registrationData).subscribe({
        next: (response: any) => {
          //alert(response);

          //console.log(registrationData);

          Swal.fire({                                      // this is using sweetaltert2
            icon: 'success',
            title: response,
            text: 'now you are able to login using this username and password',
            confirmButtonText: 'OK'
          });

          this.router.navigate(["/login"]);

          //this.selectedLanguages=[];
          // form.resetForm();// clear form
          // console.log("clear form........")

        },
        error: (err) => console.log(err.error)

      });
    }
  }





  //-----------------------------------------------         back button          ----------------------------------------------------------

  backButton() {
   // alert("back button clicked.");
    this.router.navigate(["/login"])
  }

}

