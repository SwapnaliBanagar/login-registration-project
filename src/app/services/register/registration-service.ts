import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationDto } from '../../models/register/registration-dto';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }


  addRegistrationDetails(registrationData: RegistrationDto): Observable<string> {
    return this.httpClient.post(`${this.baseUrl}/doRegistration`, registrationData, { responseType: 'text' })
  }

  checkUserNamePassword(username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/check/${username}/${password}`;
    return this.httpClient.post(url, {}, { responseType: 'text' });
  }


  getUserByUsername(username:string):Observable<RegistrationDto>
  {
    return this.httpClient.get<RegistrationDto>(`${this.baseUrl}/getUserByUserName/${username}`);
  }


  updateUserDetails(registrationDto: RegistrationDto):Observable<string>
  {
    return this.httpClient.put(`${this.baseUrl}/updateDetails`,registrationDto,{ responseType: 'text' });
  }
  

}
