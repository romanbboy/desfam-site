import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Moment} from "moment";

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnChanges{
  @Input() date: Moment

  day: string = ''
  fullDate: string = ''

  ngOnChanges(changes: SimpleChanges) {
    changes.date.currentValue.locale('ru');
    this.day = changes.date.currentValue.format('dddd');
    this.fullDate = changes.date.currentValue.format('DD.MM.YYYY');
  }
}
