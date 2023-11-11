import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { WheelService } from 'src/app/core/services/wheel.service';

@Component({
  selector: 'app-wheel-of-luck',
  templateUrl: './wheel-of-luck.component.html',
  styleUrls: ['./wheel-of-luck.component.scss'],
})
export class WheelOfLuckComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  success: any = {};
  slicePrizes: any[] = [];
  wheelSpinAudio!: HTMLAudioElement;
  clapAudio!: HTMLAudioElement;
  seed = [...this.slicePrizes.keys()];
  idToLandOn: any;
  items: any[] = [];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  userCanSpin: boolean = false;
  wheelMessage: string = '';
  isWheelClicked: boolean = false;
  isWheelLoading: boolean = true;
  isLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;

  // clock code
  @ViewChild('clockCanvas', { static: true })
  clockCanvas!: ElementRef<HTMLCanvasElement>;
  targetTime: string = '';
  countdown: string = '';
  isClock:boolean = false;
  private ctx!: CanvasRenderingContext2D;
  canSpin: boolean = false;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  isCountingDown: boolean = false;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  constructor(
    private _AuthServices: AuthServices,
    private _WheelService: WheelService
  ) {
    this.wheelSpinAudio = new Audio('../../../assets/sounds/wheel-spin.wav');
    this.clapAudio = new Audio('../../../assets/sounds/claps.mp3');
    if (localStorage.getItem('userDetails')) {
      this.isLoggedIn = true;
    }
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res;
    });
  }

  probabilities: number[] = [];

  weightedRandomNumber(probabilities: number[]) {
    const totalWeight = probabilities.reduce((acc, prob) => acc + prob, 0);
    const randomNumber = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i];
      if (randomNumber <= sum) {
        return i + 1;
      }
    }
    return;
  }

  ngOnInit() {
    this.before();
    this.checkIfUserCanSpin();
    this._WheelService.getAllPrizes().subscribe((prizes: any) => {
      prizes.push({ id: 123, points: 'محاولة أخرى', probability: '100' });
      console.log('Received Prizes: ', prizes);
      this.slicePrizes = prizes;
      this.probabilities = prizes.map((prize: any) =>
        parseInt(prize.probability, 10)
      );

      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 200);

      gradient.addColorStop(0, '#47C7FF');
      gradient.addColorStop(1, '#3267F5');

      let gradientColors = this.slicePrizes.map((color, i) => {
        if (i % 2) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          // Define gradient colors and positions
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(0.3, '#47C7FF');
          gradient.addColorStop(0.8, '#3267F5');
          gradient.addColorStop(1, '#E45493');
          return gradient;
        } else {
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          // Define gradient colors and positions
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(1, '#fff');
          return gradient;
        }
      });

      this.idToLandOn = this.weightedRandomNumber(this.probabilities);
      console.log(this.idToLandOn);
      console.log(this.slicePrizes);
      this.items = this.slicePrizes.map((value: any) => ({
        fillStyle: this.getColorForId(value.id),
        text: value.points,
        id: value.id,
        textFillStyle: '#fff',
        textFontSize: '18',
        textFontFamily: 'Bahij Regular',
      }));
      console.log('Items: ', this.items);
    });

    this._WheelService.getAllPrizes().subscribe((prizes: any) => {
      prizes.push({ id: 123, points: 'محاولة أخرى', probability: '100' });
      console.log('Received Prizes: ', prizes);
      this.slicePrizes = prizes;
      this.probabilities = prizes.map((prize: any) =>
        parseInt(prize.probability, 10)
      );

      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 200);

      gradient.addColorStop(0, '#47C7FF');
      gradient.addColorStop(1, '#3267F5');

      let gradientColors = this.slicePrizes.map((color, i) => {
        if (i % 2) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          // Define gradient colors and positions
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(0.3, '#47C7FF');
          gradient.addColorStop(0.8, '#3267F5');
          gradient.addColorStop(1, '#E45493');
          return gradient;
        } else {
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          // Define gradient colors and positions
          gradient.addColorStop(0, '#fff');
          gradient.addColorStop(1, '#fff');
          return gradient;
        }
      });

      this.idToLandOn = this.weightedRandomNumber(this.probabilities);
      console.log(this.idToLandOn);
      console.log(this.slicePrizes);
      this.items = this.slicePrizes.map((value: any) => ({
        fillStyle: this.getColorForId(value.id),
        text: value.points,
        id: value.id,
        textFillStyle: '#fff',
        textFontSize: '18',
        textFontFamily: 'Bahij Regular',
      }));
      console.log('Items: ', this.items);
    });
    this.updateClockEveryMinute();
    // Call the method to update the clock every minute
  // setInterval(() => {
  //   console.log("aaaaaaaaaaaaaaaaaaaaa");
  //   this.updateClockEveryMinute();
  // }, 60000); // 60000 milliseconds = 1 minute
  setInterval(() => this.updateClockEveryMinute(), 1000);

  }

  updateClockEveryMinute() {
    console.log("updateClockEveryMinute");
    // Update the clock immediately
    this.updateClockAnimation();
  
    // // Update the clock every minute
    // setInterval(() => {
    //   this.updateClockAnimation();
    // }, 60000); // 60000 milliseconds = 1 minute
  }

  getColorForId(id: number): string {
    const colors = ['#6ACBE4', '#00AF7A', '#005CA6', '#FFB300']; // Define your set of colors
    if (!this.items.length) {
      this.items.push({ fillStyle: colors[0] }); // Initialize the first color
      return colors[0];
    }

    const lastIndex = this.items.length - 1;
    const lastColor = this.items[lastIndex].fillStyle;
    const lastColorIndex = colors.indexOf(lastColor);

    let nextColorIndex = (lastColorIndex + 1) % colors.length; // Get the next color index in the cycle
    if (nextColorIndex === 0) {
      // Shuffle the colors to provide a different order after cycling through all colors
      colors.sort(() => Math.random() - 0.5);
    }

    const nextColor = colors[nextColorIndex];
    this.items.push({ fillStyle: nextColor }); // Add the next color to the items

    return nextColor;
  }
  reset() {
    this.wheel.reset();
    this.idToLandOn =
      this.slicePrizes[Math.floor(Math.random() * this.seed.length)].number;
    const colors = ['#3CA7C3', '#ffff'];
    this.items = this.slicePrizes.map((value: any) => ({
      fillStyle: colors[value.number % 2],
      text: value.data,
      id: value.number,
      textFillStyle: '#07487C',
      textFontSize: '20',
    }));
  }
  before() {
    console.log('before');
    this.success = {};
    setTimeout(() => {
      this.success = this.slicePrizes.find((ele) => {
        console.log(ele);
        console.log(ele.number == this.idToLandOn ? ele : '');
        return ele.number == this.idToLandOn;
      });
    }, 5000);
  }

  after() {
    console.log('After');
    this.userCanSpin = false;
    // this.wheelMessage = "لا محاولات أخرى متبقية"

    setTimeout(() => {
      this.wheel.reset();
      this.idToLandOn =
        this.slicePrizes[Math.floor(Math.random() * this.seed.length)].number;
      this.idToLandOn = this.weightedRandomNumber(this.probabilities);
    }, 2000);
  }

  spinAction(type: string) {
    this.wheelSpinAudio.load();
    this.clapAudio.load();
    if (type === 'free') {
      this.wheelMessage = '';
      this.userCanSpin = true;
      this.isWheelClicked = false;

      const randomIndex = Math.floor(Math.random() * this.items.length);
      const selectedPrize = this.items[randomIndex];

      // Access id and points from the selected prize
      const prizeId = selectedPrize.id;
      const points = selectedPrize.text;

      // Set the selected prize's ID to land on
      this.idToLandOn = prizeId;

      // Log the points of the selected prize
      console.log('Points of the selected prize:', points);

      this._WheelService.lotteryWheelOperation(prizeId, 'free').subscribe(
        (response: any) => {
          console.log('API Response:', response);
          if (response.success) {
            this.wheelSpinAudio.play();
            console.log(response);
            console.log(response.prize_id);
            this.idToLandOn = parseInt('123', 10);
            this.wheel.spin();
            setTimeout(() => {
              this.clapAudio.play();
              this.wheelMessage = 'لقد ربحت: ' + points + ' نقاط!';
            }, 2000);
          } else {
            // Handle cases where the spin didn't happen or further error handling
            console.error('Failed to spin:', response.message);
            if (response.message === 'Try tomorrow') {
              this.wheelMessage = 'حاول مجددًا غدًا';
              setTimeout(() => {
                window.location.href = '/wheelOfLuck';
              }, 2000);
            } else {
              this.wheelSpinAudio.play();
              setTimeout(() => {
                this.clapAudio.play();
                this.idToLandOn = parseInt('123', 10);
                this.wheel.spin();
                this.wheelMessage = 'ربحت محاولة مجانية!';
              }, 2000);
            }
          }
        },
        (error: any) => {
          console.error('API Error:', error);
          // Handle API errors or network issues
        }
      );
    } else if (type === 'balance') {
      this.wheelMessage = '';

      const randomIndex = Math.floor(Math.random() * this.items.length);
      const selectedPrize = this.items[randomIndex];
      const prizeId = selectedPrize.id;
      const points = selectedPrize.text;
      this.idToLandOn = prizeId;
      this._WheelService.lotteryWheelOperation(prizeId, 'balance').subscribe(
        (response: any) => {
          console.log('Balance Spin API Response:', response);
          if (response.success) {
            this.wheelSpinAudio.play();
            this.idToLandOn = parseInt(response.prize_id, 10);
            this.wheel.spin();
            setTimeout(() => {
              this.clapAudio.play();
              this.wheelMessage = 'مبروك! لقد ربحت: ' + points;
            }, 2000);
          } else {
            console.error('Failed to spin (Balance):', response.message);
            if (response.message === 'The balance is not enough') {
              this.wheelMessage = 'لا تمتلك نقاط كافية';
            } else if ('You cannot try again more than 3 times in 24 hours') {
              this.wheelMessage =
                'لا يمكنك المحاولة أكثر من 3 مرات خلال 24 ساعة';
            } else {
              // Handle cases where the spin didn't happen or further error handling
              console.error('Failed to spin:', response.message);
              this.wheelSpinAudio.play();
              setTimeout(() => {
                this.clapAudio.play();
                this.idToLandOn = parseInt(response.prize_id, 10);
                this.wheel.spin();
                this.wheelMessage = 'ربحت محاولة أخرى (لم يتم خصم النقاط)!';
              }, 2000);
            }
          }
        },
        (error: any) => {}
      );
    }
  }

  checkIfUserCanSpin() {
    console.log(this._AuthServices.userToken);
    if (this._AuthServices.userToken) {
      this.wheelMessage = '';
      this._WheelService.canSpin().subscribe((res) => {
        this.isWheelLoading = false;
        this.canSpin = false;
        console.log(res);
        if (res.message == 'Try tomorrow') {
          this.updateCountdown(res.latest_date.time);
          setInterval(() => this.updateCountdown(res.latest_date.time), 1000);
          setInterval(() => this.updateClockEveryMinute(), 60000);
          setInterval(() => this.checkIfUserCanSpin(), 60000);
          console.log(res.latest_date.time);
          this.wheelMessage = 'حاول مجددًا غدًا';
          this.isClock=true;
        }else{
          this.isClock=false;
        }});
    } else if (!this.isLoggedIn) {
      this.isWheelLoading = false;
      console.log('Please login');
      this.wheelMessage = 'من فضلك قم بتسجيل الدخول أولًا';
    }
  }
  // =====================code of clock===================
  ngAfterViewInit() {
    this.ctx = this.clockCanvas.nativeElement.getContext('2d')!;
    if (!this.ctx) {
      console.error('Could not get 2D context for the canvas');
    } else {
      this.initializeClock();
      this.startClockAnimation();
    }
  }
  // ====================================================

  // =====================code of clock===================
  initializeClock() {
    console.log("initializeClock");

    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.drawClock();
  }

  startClockAnimation() {
    console.log("startClockAnimation");

    this.drawClock();
    //this.updateClockAnimation();
  }
  // ====================================================

  // =====================code of clock => animation of clock===================
  updateClockAnimation() {
    console.log("updateClockAnimation");

    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
  
    this.drawClock();  // Redraw the clock on each animation frame
  
    requestAnimationFrame(() => {
      this.updateClockAnimation();
    });
  }
  
  

  //  draw of clock and its style

  drawClock() {
    console.log("drawClock");

    const canvas = this.clockCanvas?.nativeElement;
    const ctx = this.ctx;
    const radius = canvas.width / 2;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    ctx?.beginPath();
    ctx?.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx?.fill();
    ctx.lineWidth = 11;
    ctx.strokeStyle = '#3BA5C0';
    ctx?.stroke();
    ctx?.closePath();

    // Draw clock numbers
    ctx.font = '19px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / 12;
      const x = radius + (radius - 30) * Math.cos(angle);
      const y = radius + (radius - 30) * Math.sin(angle);

      // Change this line to set the color
      ctx.fillStyle = i % 3 === 0 ? '#3BA5C0' : 'rgb(146, 146, 146)';
      ctx.fillText(i.toString(), x, y);
    }

    // Calculate angles for the clock hands
    const hourAngle = -Math.PI / 2 + (2 * Math.PI * (this.hours % 12)) / 12;
    const minuteAngle = -Math.PI / 2 + (2 * Math.PI * this.minutes) / 60;
    // const secondAngle = -Math.PI / 2 + (2 * Math.PI * this.seconds) / 60;

    // Draw clock hands
    this.drawHand(ctx, hourAngle, radius * 0.5, 5);
    this.drawHand(ctx, minuteAngle, radius * 0.7, 4);
    // this.drawHand(ctx, secondAngle, radius * 0.8, 2);

    // Add this code to draw the center circle in yellow
    ctx?.beginPath();
    ctx?.arc(radius, radius, 7.5, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx?.fill();
    ctx?.closePath();
  }

  drawHand(
    ctx: CanvasRenderingContext2D,
    angle: number,
    length: number,
    width: number
  ) {
    const canvas = this.clockCanvas.nativeElement;
    const radius = canvas.width / 2;
    const x = radius + length * Math.cos(angle);
    const y = radius + length * Math.sin(angle);

    ctx?.beginPath();
    ctx.moveTo(radius, radius);
    ctx.lineTo(x, y);
    ctx.lineWidth = width;
    ctx.strokeStyle = 'rgb(170, 170, 170)';
    ctx.stroke();
    ctx.closePath();
  }

  updateCountdown(targetTime: string): void {
    const currentTime = new Date();
    const targetDate = new Date();

    // Parse target time from string to Date
    const [hours, minutes, seconds] = targetTime.split(':').map(Number);
    targetDate.setHours(hours, minutes, seconds);

    // Calculate time difference
    const futureTime = new Date(currentTime.getTime() - 22 * 60 * 60 * 1000);
    const timeDifference = futureTime.getTime() - targetDate.getTime();

    // Calculate hours, minutes, and seconds
    const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDiff = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((timeDifference % (1000 * 60)) / 1000);
    console.log(hoursDiff, "aaaa", targetDate.getTime());

    // Format the countdown string
    this.countdown = `${this.formatTime(hoursDiff)} ساعة ${this.formatTime(minutesDiff)}دقيقة ${this.formatTime(secondsDiff)}ثانية`;
  }

  formatTime(time: number): string {
    return time < 10 ? `${time}` : `${time}`;
  }

  

  // ====================================================
}
