import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.interface";

@Injectable()
export class UserService {
  findOne(field, val) {
    const url = environment.apiUrl + '/users/findOne';
    return this.http.post<UserInterface | null>(url, {field, val})
  }

  constructor(private http: HttpClient) {
  }
}
