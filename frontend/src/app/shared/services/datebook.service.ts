import { Injectable } from '@angular/core';
import {DatebookAddingInputInterface} from "../../main/types/datebookAddingInput.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DatebookInterface} from "../types/datebook.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatebookService {
  add(data: DatebookAddingInputInterface): Observable<DatebookInterface> {
    const url = environment.apiUrl + '/datebooks/add'
    return this.http.post<DatebookInterface>(url, data)
  }

  getAll(): Observable<Array<DatebookInterface>> {
    const url = environment.apiUrl + '/datebooks/getAll'
    return this.http.get<Array<DatebookInterface>>(url)
  }

  get(id) {
    const url = `${environment.apiUrl}/datebooks/${id}`;
    return this.http.get(url);
  }

  constructor(private http: HttpClient) {
  }
}
