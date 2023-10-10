import { Component } from '@angular/core';

@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.scss']
})
export class OnlineConsultationComponent {
  selected!: Date | null;
}
