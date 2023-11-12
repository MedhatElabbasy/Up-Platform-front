import {
  Component,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { ClubService } from '../../services/club.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import {
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { TrainingService } from 'src/app/training/Services/training.service';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

@Component({
  selector: 'app-club-events',
  templateUrl: './club-events.component.html',
  styleUrls: ['./club-events.component.scss'],
  providers: [DatePipe],
})
export class ClubEventsComponent implements AfterViewInit {
  @ViewChild('calendar') calendar: MatCalendar<Moment> | undefined;
  selectedDate: Moment | undefined;
  selected: Date | null = null;
  Allcities = ['الكل'];
  AllChoices = ['كل الفعاليات', 'أسبوع', 'أسبوعين', '3 أسابيع', 'شهر'];
  cities!: any;
  events!: any;
  choiceEvents!: any;
  isLoading: boolean = true;
  userDetails: any = {};
  userDetailsString: string = '';
  selectedCity: string = '';
  selectedChoice: string = '';
  isCalendarVisible: boolean = true;
  infoData: string[] = ['اسم الفعالية', 'الموعد', 'المدينة'];
  choices: string[] | undefined;

  eventTable: any[][] = [];
  public eventLog: string[] = [];
  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 4,
    currentPage: 1,
  };
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`,
  };

  cityForm = new FormGroup({
    cities: new FormControl(null, [Validators.required]),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private _club: ClubService,
    private TrainingService: TrainingService,
    private toastr: ToastrService,
    private _Router: Router,
    private datePipe: DatePipe,
    private _renderer: Renderer2
  ) {
    this.getAllEvents();
    this.calculateChoices();
  }

  calculateChoices() {
    const currentDate = new Date();
    const numberOfDaysToAdd = this.calculateDaysToAdd(this.selectedChoice);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    this.choices = [];
    for (
      let date = new Date(currentDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      this.choices.push(`${this.formatDate(date)}`);
    }
    this.getAllEvents();
  }

  calculateDaysToAdd(choice: string): number {
    switch (choice) {
      case 'أسبوع':
        return 6;
      case 'أسبوعين':
        return 13;
      case '3 أسابيع':
        return 20;
      case 'شهر':
        return 29;
      default:
        return 0;
    }
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  get city(): any {
    return this.cityForm.get('cities');
  }

  ngOnInit(): void {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString != null) {
      const userDetails = JSON.parse(userDetailsString);
      this.userDetails = userDetails;
      const user_id = this.userDetails.id;
      this.getEventsByID(user_id);
    } else {
      console.log('User details not found in local storage');
    }

    this.spinner.show();

    this.getAllEvents();

    this.getAllLocations();
    console.log('ngOnInit');
  }

  onPageChange(number: number) {
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.logEvent(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
  }

  private logEvent(message: string) {
    this.eventLog.unshift(`${new Date().toISOString()}: ${message}`);
    console.log('logEvent');
  }

  citiesFilteration(event: any) {
    this.selectedCity = event.value;
    if (this.selectedCity == 'الكل') {
      this.getAllEvents();
    } else {
      this.getAllEventsByLocations(this.selectedCity);
      if (this.events.length > 0) {
        this.getEventsBySelectedDate(this.selected);
      }
    }
  }

  choiceFilteration(event: any) {
    this.selectedChoice = event.value;
    this.calculateChoices();
    //  if (this.selectedChoice == 'كل الفعاليات') {
    //    this.getAllEvents();
    //  }
    if (this.selectedChoice == 'أسبوع') {
      this.choiceEvents = [];
      this._club.eventFilter(7).subscribe((res) => {
        console.log(res);
        this.choiceEvents = res;
        this.choiceEvents = this.choiceEvents.data;
        console.log(this.choiceEvents);
        if (this.choiceEvents.length > 0) {
          this.getEventsBySelectedDate(this.selected);
        }
      });
      this.choiceEvents.forEach((ele: any) => {
        this.AllChoices.push(ele);
      });
      this.isCalendarVisible = false;
    } else if (this.selectedChoice == 'أسبوعين') {
      this.choiceEvents = [];
      this._club.eventFilter(14).subscribe((res) => {
        console.log(res);
        this.choiceEvents = res;
        this.choiceEvents = this.choiceEvents.data;
        if (this.choiceEvents.length > 0) {
          this.getEventsBySelectedDate(this.selected);
        }
      });
      this.choiceEvents.forEach((ele: any) => {
        this.AllChoices.push(ele);
      });
      this.isCalendarVisible = false;
    } else if (this.selectedChoice == '3 أسابيع') {
      this.choiceEvents = [];
      this._club.eventFilter(21).subscribe((res) => {
        console.log(res);
        this.choiceEvents = res;
        this.choiceEvents = this.choiceEvents.data;
        if (this.choiceEvents.length > 0) {
          this.getEventsBySelectedDate(this.selected);
        }
      });
      this.choiceEvents.forEach((ele: any) => {
        this.AllChoices.push(ele);
      });
      this.isCalendarVisible = false;
    } else if (this.selectedChoice == 'شهر') {
      this.choiceEvents = [];
      this._club.eventFilter(30).subscribe((res) => {
        console.log(res);
        this.choiceEvents = res;
        this.choiceEvents = this.choiceEvents.data;
        if (this.choiceEvents.length > 0) {
          this.getEventsBySelectedDate(this.selected);

          this.applyStylesToEvents();
        }
      });
      this.choiceEvents.forEach((ele: any) => {
        this.AllChoices.push(ele);
      });
      this.isCalendarVisible = false;
    } else {
      this.isCalendarVisible = true;
    }
    // this.getAllEventsByLocations(this.selectedChoice);
    if (this.choiceEvents.length > 0) {
      this.getEventsBySelectedDate(this.selected);
    }
    console.log('choiceFilteration');
  }

  handleCalendarVisibility() {
    this.isCalendarVisible = this.selectedChoice !== 'كل الفعاليات';
    console.log('handleCalendarVisibility');
  }

  getAllEvents() {
    this.events = [];
    this.isLoading = true;
    this._club.getAllEvents().subscribe((res) => {
      this.events = res;
      console.log(this.events);
      this.isLoading = false;
      if (this.events.length > 0) {
        this.getEventsBySelectedDate(this.selected);
        this.applyStylesToEvents();
      }
    });
    this.events.forEach((ele: any) => {
      this.AllChoices.push(ele);
    });
    console.log('getAllEvents');
  }

  applyStylesToEvents() {
    setTimeout(() => {
      const cells = Array.from(
        document.querySelectorAll<HTMLDivElement>(
          '.mat-calendar .mat-calendar-body-cell-content'
        )
      );

      cells.forEach((c) => {
        const cellDate = c.parentElement?.getAttribute('aria-label');
        const eventsOnSelectedDate = this.getEventsBySelectedDate(
          new Date(cellDate || '')
        );
        const eventTitle =
          eventsOnSelectedDate.length > 0 ? eventsOnSelectedDate[0].title : '';
        console.log(eventTitle);
        c.innerText = c.innerText.length == 1 ? '0' + c.innerText : c.innerText;
        const numbersOnly = this.extractNumbers(c.innerText);

        c.innerHTML =
          '<div class="row"><div class="col-12" style="font-size:1.5em;">' +
          numbersOnly +
          '</div><div class="col-12" style="border-radius:50px; font-size:16px; background-color:#2F92B2; color:white; margin:auto; width:75px"> <a routerLink="/club/club-events/{{eventsOnSelectedDate[0].id}}">' +
          eventTitle +
          '</a></div></div>';
      });
    });
    console.log('applyStylesToEvents');
  }

  extractNumbers(text: string) {
    const numericChars = text.match(/\d+/);
    console.log('extractNumbers');

    return numericChars ? numericChars[0] : '';
  }

  getAllLocations() {
    this._club.getAllLocations().subscribe((res) => {
      this.cities = res;
      this.cities.forEach((ele: any) => {
        this.Allcities.push(ele);
      });
    });
    console.log('getAllLocations');
  }

  getAllEventsByLocations(city: string) {
    this.events = [];
    this.isLoading = true;
    const locationObject = { location: city };
    this._club.getAllLocationEvents(city).subscribe((res) => {
      this.isLoading = false;
      this.events = res;
      if (this.events.length > 0) {
        this.getEventsBySelectedDate(this.selected);
      }
    });
    console.log('getAllEventsByLocations');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('events' in changes && this.events.length > 0) {
      this.getEventsBySelectedDate(this.selected);
    }
    console.log('ngOnChanges');
  }

  getEventsByID(user_id: number) {
    this._club.getEventsByID(user_id).subscribe((res) => {
      // console.log(res);
    });
    console.log('getEventsByID');
  }

  addToCart(id: number, type: string) {
    const cartBtn = document.getElementById('cartBtn') as HTMLButtonElement;
    this.TrainingService.addToCart(id, type).subscribe((res: any) => {
      if (res.success) {
        this.showSuccessToast(res.message);
      } else {
        this.showErrorToast(res.message);
      }
    });
  }

  showSuccessToast(message: string) {
    this.toastr.success('تم إضافة العنصر للسلة بنجاح');
  }

  showErrorToast(message: string) {
    this.toastr.error('العنصر موجود بالفعل في السلة');
  }

  navigateToEventDetails(id: number) {
    this._Router.navigate(['club/club-events/' + id]);
  }

  compareDates(selectedDate: string | null, eventStartDate: string): boolean {
    const startDate = new Date(eventStartDate);
    startDate.setHours(0, 0, 0, 0);

    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate);
      formattedSelectedDate.setHours(0, 0, 0, 0);
      return startDate.getTime() === formattedSelectedDate.getTime();
    }
    console.log('compareDates');

    return false;
  }

  getEventsBySelectedDate(selectedDate: Date | null): any[] {
    if (!selectedDate) {
      return this.events;
    }

    const formattedSelectedDate = this.datePipe.transform(
      selectedDate,
      'yyyy-MM-dd'
    );
    const dateObj = this.events.filter((event: { start_at: string }) => {
      const isDateMatch = this.compareDates(
        formattedSelectedDate,
        event.start_at.split(' ')[0]
      );
      return isDateMatch;
    });
    console.log('getEventsBySelectedDate');

    return dateObj;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const formattedDate = this.datePipe.transform(cellDate, 'yyyy-MM-dd');
    const eventsOnSelectedDate = this.getEventsBySelectedDate(cellDate);
    if (eventsOnSelectedDate.length > 0) {
      return 'special-date-with-events';
    }
    console.log('dateClass');

    return '';
  };

  ngAfterViewInit() {
    const monthPrevBtn = document.querySelectorAll(
      '.mat-calendar-previous-button'
    );
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');

    if (monthPrevBtn) {
      Array.from(monthPrevBtn).forEach((button) => {
        this._renderer.listen(button, 'click', (event) => {
          this.updateCalendar();
        });
      });
    }

    if (monthNextBtn) {
      Array.from(monthNextBtn).forEach((button) => {
        this._renderer.listen(button, 'click', (event) => {
          this.updateCalendar();
        });
      });
    }

    this.updateCalendar();
    console.log('ngAfterViewInit');
  }

  updateCalendar() {
    this.getAllEvents();

    setTimeout(() => {
      const cells = Array.from(
        document.querySelectorAll<HTMLDivElement>(
          '.mat-calendar .mat-calendar-body-cell-content'
        )
      );

      cells.forEach((c) => {
        const cellDate = c.parentElement?.getAttribute('aria-label');
        const eventsOnSelectedDate = this.getEventsBySelectedDate(
          new Date(cellDate || '')
        );
        const eventTitle =
          eventsOnSelectedDate.length > 0 ? eventsOnSelectedDate[0].title : '';

        c.innerText = c.innerText.length == 1 ? '0' + c.innerText : c.innerText;
        c.innerHTML =
          '<div class="row"><div class="col-12" style="font-size:1.5em;">' +
          c.innerText +
          '</div><div class="col-12">' +
          eventTitle +
          '</div></div>';
      });
    });
    this.applyStylesToEvents();
    console.log('updateCalendar');
  }

  eventMatchesChoice(event: any, choice: string): boolean {
    const eventDuration = this.calculateDaysToAdd(choice);
    const eventDate = new Date(event.start_at.split(' ')[0]);
    const currentDate = new Date();
    console.log('eventMatchesChoice');

    // Check if the event date is within the selected duration
    return (
      eventDate >= currentDate &&
      eventDate <=
        new Date(currentDate.setDate(currentDate.getDate() + eventDuration))
    );
  }

  closer(){}
}
