import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../../models/login/login-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  doLoginSuccessfully(loginDto:LoginDto):Observable<string>
  {
    return this.httpClient.post(`${this.baseUrl}/doLogin`,loginDto,{responseType:'text'})
  }

}
