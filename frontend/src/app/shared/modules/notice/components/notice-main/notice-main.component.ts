import {Component, Input, OnInit} from '@angular/core';
import {NoticeType} from "../../../../types/notice.type";

@Component({
  selector: 'app-notice-main',
  templateUrl: './notice-main.component.html',
  styleUrls: ['./notice-main.component.scss']
})
export class NoticeMainComponent implements OnInit {
  @Input('type') typeProps: string

  constructor() { }

  ngOnInit(): void {
  }

}
