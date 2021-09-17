import {Component, Input, OnInit} from '@angular/core';
import {NoticeType} from "../../../../types/notice.type";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  @Input('notice') noticeProps: NoticeType
  @Input('type') typeProps: string

  constructor() { }

  ngOnInit(): void {
  }

}
