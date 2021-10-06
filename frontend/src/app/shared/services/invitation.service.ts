import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {InviteRequestInterface} from "../types/inviteRequest.interface";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  add(invite: InviteRequestInterface): Observable<string> {
    const url = environment.apiUrl + '/invitations';
    return this.http.post<string>(url, invite);
  }

  constructor(private http: HttpClient) {
  }
}
