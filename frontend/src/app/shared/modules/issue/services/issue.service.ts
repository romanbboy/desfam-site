import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {DatebookInterface} from "../../../types/datebook.interface";
import {IssueInterface} from "../../../types/issue.interface";
import {Observable} from "rxjs";
import {IssueRequestInterface} from "../types/issueRequest.interface";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  add(issueRequest: IssueRequestInterface): Observable<IssueInterface> {
    const url = environment.apiUrl + '/issues'
    return this.http.post<IssueInterface>(url, issueRequest)
  }

  constructor(private http: HttpClient) { }
}
