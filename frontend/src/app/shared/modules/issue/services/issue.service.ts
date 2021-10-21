import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {IssueFullInterface, IssueInterface} from "../../../types/issue.interface";
import {Observable} from "rxjs";
import {IssueRequestInterface} from "../types/issueRequest.interface";
import {IssuesRequestInterface} from "../../../types/issuesRequest.interface";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  add(issueRequest: IssueRequestInterface): Observable<IssueFullInterface> {
    const url = environment.apiUrl + '/issues'
    return this.http.post<IssueFullInterface>(url, issueRequest)
  }

  get(data: IssuesRequestInterface): Observable<IssueFullInterface[]> {
    const url = environment.apiUrl + '/issues/get'
    return this.http.post<IssueFullInterface[]>(url, data)
  }

  status(issue: IssueFullInterface): Observable<IssueFullInterface> {
    const url = `${environment.apiUrl}/issues/${issue.id}/status`
    return this.http.put<IssueFullInterface>(url, null)
  }

  delete(issue: IssueFullInterface): Observable<any> {
    const url = `${environment.apiUrl}/issues/${issue.id}`
    return this.http.delete<any>(url)
  }

  edit(data: {issue: IssueFullInterface, content: string}): Observable<IssueFullInterface> {
    const url = `${environment.apiUrl}/issues/${data.issue.id}`
    return this.http.put<IssueFullInterface>(url, {content: data.content})
  }

  constructor(private http: HttpClient) { }
}
