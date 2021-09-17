import {Component, Input, OnInit} from '@angular/core';
import {DatebookInterface} from "../../../../types/datebook.interface";
import {select, Store} from "@ngrx/store";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {currentUserSelector} from "../../../../../auth/store/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-datebooks',
  templateUrl: './list-datebooks.component.html',
  styleUrls: ['./list-datebooks.component.scss']
})
export class ListDatebooksComponent implements OnInit {
  @Input('datebooks') datebooksProps: DatebookInterface[]
  currentUser$: Observable<CurrentUserInterface>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

}
