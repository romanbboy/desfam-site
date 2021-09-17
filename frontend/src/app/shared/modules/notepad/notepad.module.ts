import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotepadComponent} from "./components/notepad/notepad.component";
import {IssueModule} from "../issue/issue.module";
import {PicshowModule} from "../picshow/picshow.module";

@NgModule({
  imports: [CommonModule, IssueModule, PicshowModule],
  declarations: [NotepadComponent],
  exports: [NotepadComponent]
})
export class NotepadModule {}
