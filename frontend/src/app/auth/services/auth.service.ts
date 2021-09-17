import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {RegistrationRequestInterface} from "../types/registrationRequest.interface";
import {environment} from "../../../environments/environment";
import {LoginRequestInterface} from "../types/loginRequest.interface";
import {CurrentUserInputInterface} from "../../shared/types/currentUserInput.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  registration (data: RegistrationRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/registration'
    return this.http.post<CurrentUserInterface>(url, data)
  }

  login (data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/login'
    return this.http.post<CurrentUserInterface>(url, data)
  }

  getCurrentUser (): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get<CurrentUserInterface>(url)
  }

  updateCurrentUser(data: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    let formData = new FormData();
    for (let key in data) formData.append(key, data[key])

    const url = environment.apiUrl + '/user'
    return this.http.put<CurrentUserInterface>(url, formData)
  }
}
