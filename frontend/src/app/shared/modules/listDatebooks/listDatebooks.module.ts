import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ListDatebooksComponent } from './components/list-datebooks/list-datebooks.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    ListDatebooksComponent
  ],
  declarations: [
    ListDatebooksComponent
  ]
})
export class ListDatebooksModule {}
