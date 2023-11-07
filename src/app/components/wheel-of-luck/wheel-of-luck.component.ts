import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { AuthServices } from 'src/app/auth/services/auth-services.service';
import { WheelService } from 'src/app/core/services/wheel.service';


@Component({
  selector: 'app-wheel-of-luck',
  templateUrl: './wheel-of-luck.component.html',
  styleUrls: ['./wheel-of-luck.component.scss']
})
export class WheelOfLuckComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  success: any = {}
  slicePrizes: any[] = [];
  wheelSpinAudio!: HTMLAudioElement;
  clapAudio!: HTMLAudioElement;
  seed = [...this.slicePrizes.keys()];
  idToLandOn: any;
  items: any[] = [];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  userCanSpin: boolean = false
  wheelMessage: string = ""
  isWheelClicked: boolean = false
  isWheelLoading: boolean = true
  isUserLoggedIn: boolean = false

  constructor(private _AuthServices: AuthServices, private _WheelService: WheelService) {    
    this.wheelSpinAudio = new Audio('../../../assets/sounds/wheel-spin.wav');
    this.clapAudio = new Audio('../../../assets/sounds/claps.mp3');
    _AuthServices.isUserLoggedIn.subscribe((res) => {
      this.isUserLoggedIn = res
    })
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
    return
  }

  ngOnInit() {
    this.before()
    this.checkIfUserCanSpin()
    this._WheelService.getAllPrizes().subscribe((prizes: any) => {
      console.log('Received Prizes: ', prizes);
    this.slicePrizes = prizes;
    this.probabilities = prizes.map((prize: any) => parseInt(prize.probability, 10));

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
        gradient.addColorStop(.3, '#47C7FF'); 
        gradient.addColorStop(.8, '#3267F5');
        gradient.addColorStop(1, '#E45493');
        return gradient
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);

        // Define gradient colors and positions
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#fff');
        return gradient
      }
    })

    this.idToLandOn = this.weightedRandomNumber(this.probabilities);
    console.log(this.idToLandOn);

    const colors = [gradient, "#ffff"];
    const colors2 = ["#07487C", "#fff"]
    console.log(this.slicePrizes);
    this.items = this.slicePrizes.map((value: any) => ({
      fillStyle: gradientColors[value.id % 2],
      text: value.points,
      id: value.id,
      textFillStyle: colors2[value.id % 2],
      textFontSize: "14",
      textFontFamily: 'Bahij Regular'
    }));
    console.log('Items: ', this.items);

  });;
  }

   reset() {
     this.wheel.reset();
     this.idToLandOn = this.slicePrizes[
       Math.floor(Math.random() * this.seed.length)
     ].number;
     const colors = ["#3CA7C3", "#ffff"];
     this.items = this.slicePrizes.map((value: any) => ({
       fillStyle: colors[value.number % 2],
       text: value.data,
       id: value.number,
       textFillStyle: "#07487C",
       textFontSize: "20"
     }));
   }
  before() {
    console.log("before");
    this.success = {}
    setTimeout(() => {
      this.success = this.slicePrizes.find((ele) => {
        console.log(ele);
        console.log(ele.number == this.idToLandOn? ele : ''); 
        return ele.number == this.idToLandOn
      })
    }, 5000);
  }

  after() {
    console.log("After");
    this.userCanSpin = false
    this.wheelMessage = "لا محاولات أخرى متبقية"

    setTimeout(() => {
       this.wheel.reset();
       this.idToLandOn = this.slicePrizes[
         Math.floor(Math.random() * this.seed.length)
       ].number;
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
            console.log(response.prize_id)
            this.idToLandOn = parseInt(response.prize_id, 10);;
            this.wheel.spin();
            setTimeout(() => {
              this.clapAudio.play();
              this.wheelMessage = "لقد ربحت: "+points+ " نقاط!";
            }, 2000);
          } else {
            // Handle cases where the spin didn't happen or further error handling
            console.error('Failed to spin:', response.message);
            if (response.message === 'Try tomorrow') {
              this.wheelMessage = 'حاول مجددًا غدًا';
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
              this.wheelMessage = "مبروك! لقد ربحت: "+points;
            }, 2000);          } else {
            console.error('Failed to spin (Balance):', response.message);
            if (response.message === 'The balance is not enough') {
              this.wheelMessage = 'لا تمتلك نقاط كافية';
            } else if ("You cannot try again more than 3 times in 24 hours") {
              this.wheelMessage = 'لا يمكنك المحاولة أكثر من 3 مرات خلال 24 ساعة';
            } else {
              this.wheelMessage = 'فشلت العملية، يُرجى المحاولة مجددًا';
            }
          }
        },
        (error: any) => {
          console.error('Balance Spin API Error:', error);
        }
      );}
  }
  
  
  checkIfUserCanSpin() {
    console.log(this._AuthServices.userToken);
    if (this._AuthServices.userToken) {
      this.wheelMessage = "";
      this._WheelService.canSpin().subscribe((res) => {
        this.isWheelLoading = false
        console.log(res);
        if (res.message == "Try tomorrow"){
          this.wheelMessage = "حاول مجددًا غدًا"
        }
        this.userCanSpin = res.success
        console.log(this.userCanSpin);

      })
    } else {
      this.isWheelLoading = false
      console.log("Please login");
      this.wheelMessage = "من فضلك قم بتسجيل الدخول أولًا"
    }
  }
}
