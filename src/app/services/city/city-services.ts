import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateDto } from '../../models/state/state-dto';
import { Observable } from 'rxjs';
import { CityDto } from '../../models/cities/city-dto';

@Injectable({
  providedIn: 'root',
})
export class CityServices {

 private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getCityByStateName(stateName:string): Observable<CityDto[]> {
    return this.httpClient.get<CityDto[]>(`${this.baseUrl}/getCityByStateName/${stateName}`);
  }
  

  
  
}
