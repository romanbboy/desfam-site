import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {InviteRequestInterface} from "../types/inviteRequest.interface";
import {InviteInterface} from "../types/invite.interface";
import {DatebookInterface} from "../types/datebook.interface";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  add(invite: InviteRequestInterface): Observable<string> {
    const url = environment.apiUrl + '/invitations';
    return this.http.post<string>(url, invite);
  }

  getAll(): Observable<InviteInterface[]> {
    const url = environment.apiUrl + '/invitations';
    return this.http.get<InviteInterface[]>(url);
  }

  accept(invitation: InviteInterface): Observable<DatebookInterface> {
    const url = environment.apiUrl + `/invitations/${invitation.id}/accept`;
    return this.http.get<DatebookInterface>(url);
  }

  reject(invitation: InviteInterface): Observable<string> {
    const url = environment.apiUrl + `/invitations/${invitation.id}/reject`;
    return this.http.delete<string>(url);
  }

  constructor(private http: HttpClient) {
  }
}
