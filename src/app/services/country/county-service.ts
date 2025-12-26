import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDto } from '../../models/country/country-dto';

@Injectable({
  providedIn: 'root',
})
export class CountyService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<CountryDto[]> {
    return this.httpClient.get<CountryDto[]>(`${this.baseUrl}/getAllCountries`);
  }

}
