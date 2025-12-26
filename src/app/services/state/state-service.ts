import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateDto } from '../../models/state/state-dto';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  
private baseUrl="http://localhost:8080";

constructor(private httpClient:HttpClient){}

getAllStates():Observable<StateDto[]>
{
  return this.httpClient.get<StateDto[]>(`${this.baseUrl}/getAllStates`)
}


getStateByCountryName(countryName: string):Observable<StateDto[]>
{
  return this.httpClient.get<StateDto[]>(`${this.baseUrl}/getStatesByCountryName/${countryName}`);
}




}
