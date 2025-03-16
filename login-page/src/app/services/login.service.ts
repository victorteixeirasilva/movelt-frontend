import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrlLogin: string = "http://localhost:8080/api/auth/login";
  apiUrlRegister: string = "http://localhost:8080/api/auth/register";

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
      return this.httpClient.post<LoginResponse>(this.apiUrlLogin, { email, password }).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
        })
      )
  }
  
  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrlRegister, {name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
      })
    )
}

}
