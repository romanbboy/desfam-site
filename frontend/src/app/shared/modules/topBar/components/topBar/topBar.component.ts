import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {select, Store} from "@ngrx/store";
import {currentUserSelector} from "../../../../../auth/store/selectors";
import {logoutAction} from "../../../../../auth/store/actions/sync.action";

@Component({
  selector: 'app-topbar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit{
  currentUser$: Observable<CurrentUserInterface>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initValues()
  }

  initValues() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  logout() {
    this.store.dispatch(logoutAction())
  }
}
