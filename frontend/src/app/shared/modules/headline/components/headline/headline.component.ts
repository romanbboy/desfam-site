import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Moment} from "moment";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit, OnChanges{
  @Input() date: Moment;
  @Output('setDate') setDateEvent = new EventEmitter();

  day: string = '';
  fullDate: string = '';

  constructor(private config: PrimeNGConfig) {}

  ngOnInit(): void {
    this.initValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
      this.day = changes.date.currentValue.format('dddd');
      this.fullDate = changes.date.currentValue.format('DD.MM.YYYY');
    }
  }

  initValues(): void {
    this.config.setTranslation({
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
      monthNamesShort: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
    });
  }

  selectDate(date: Date): void {
    this.setDateEvent.emit(date);
  }
}
