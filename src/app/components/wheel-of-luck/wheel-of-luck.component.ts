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
  slicePrizes = [
    {
      number: "1",
      data: '40 نقطة'
    },
    {
      number: "2",
      data: 'نقطتين'
    },
    {
      number: "3",
      data: '3 نقاط'
    },
    {
      number: "4",
      data: '10 نقاط'
    },
    {
      number: "5",
      data: 'جرب مرة أخرى'
    },
    {
      number: "6",
      data: '5 نقاط'
    },
    {
      number: "7",
      data: '3 نقاط'
    },
    {
      number: "8",
      data: 'جرب مرة أخرى'
    },
    {
      number: "9",
      data: '30 نقطة'
    },
    {
      number: "10",
      data: '20 نقطة',

    },
    {
      number: "11",
      data: 'نقطة',

    },
    {
      number: "12",
      data: 'جرب مرة أخرى',
    }
  ];

  seed = [...this.slicePrizes.keys()];


  idToLandOn: any;
  items: any[] = [];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
  userCanSpin: boolean = false
  wheelMessage: string = ""
  isWheelClicked: boolean = false
  isWheelLoading: boolean = true
  private audioContext!: AudioContext;

  constructor(private _AuthServices: AuthServices, private _WheelService: WheelService) {
    this.audioContext = new AudioContext();
  }

  probabilities: number[] = [1000, 2000, 1, 3, 1, 1, 1, 1, 1, 1];

  weightedRandomNumber(probabilities: number[]) {
    const totalWeight = probabilities.reduce((acc, prob) => acc + prob, 0);
    const randomNumber = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
      sum += probabilities[i];
      if (randomNumber <= sum) {
        return i + 1; // Add 1 to convert the index to the actual number (1 to 10)
      }
    }
    return
  }

  ngOnInit() {
    this.checkIfUserCanSpin()


    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');

    // Create a linear gradient for the fillStyle
    const gradient = ctx.createLinearGradient(0, 0, 0, 200); // Adjust the gradient direction and size

    // Define gradient colors and positions
    gradient.addColorStop(0, '#47C7FF'); // Starting color at the top
    gradient.addColorStop(1, '#3267F5');

    let gradientColors = this.slicePrizes.map((color, i) => {
      if (i % 2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200); // Adjust the gradient direction and size

        // Define gradient colors and positions
        gradient.addColorStop(0, '#fff'); // Starting color at the top
        gradient.addColorStop(.3, '#47C7FF'); // Starting color at the top
        gradient.addColorStop(.8, '#3267F5');
        gradient.addColorStop(1, '#E45493');
        return gradient
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200); // Adjust the gradient direction and size

        // Define gradient colors and positions
        gradient.addColorStop(0, '#fff'); // Starting color at the top
        gradient.addColorStop(1, '#fff');
        return gradient
      }
    })



    // this.idToLandOn = this.slicePrizes[
    //   Math.floor(Math.random() * this.seed.length)
    // ].number;

    this.idToLandOn = this.weightedRandomNumber(this.probabilities)?.toString();

    const colors = [gradient, "#ffff"];
    const colors2 = ["#07487C", "#fff"]
    this.items = this.slicePrizes.map((value: any) => ({
      fillStyle: gradientColors[value.number % 2],
      text: `${value.data}`,
      id: value.number,
      textFillStyle: colors2[value.number % 2],
      textFontSize: "14",
      textFontFamily: 'Bahij Regular'
    }));
  }



  playAudio() {
    // Load and play the audio
    fetch('assets/sounds/videoplayback.mp3')
      .then((response) => response.arrayBuffer())
      .then((data) => this.audioContext.decodeAudioData(data))
      .then((audioBuffer) => {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      });
  }


  // reset() {

  //   this.wheel.reset();
  //   this.idToLandOn = this.slicePrizes[
  //     Math.floor(Math.random() * this.seed.length)
  //   ].number;
  //   const colors = ["#3CA7C3", "#ffff"];
  //   this.items = this.slicePrizes.map((value: any) => ({
  //     fillStyle: colors[value.number % 2],
  //     text: `${value.data}`,
  //     id: value.number,
  //     textFillStyle: "#07487C",
  //     textFontSize: "20"
  //   }));
  // }
  before() {
    console.log("0");
    this.success = {}
    // const randomNum = this.weightedRandomNumber(this.probabilities);
    // console.log(randomNum);
    // this.playAudio()
    
    setTimeout(() => {
      this.success = this.slicePrizes.find((ele) => {
        console.log(ele.number == this.idToLandOn? ele : '555');
        
        return ele.number == this.idToLandOn
      })
    }, 5000);


  }



  async spin(prize: any) {

    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  after() {
    console.log("1");
    this.userCanSpin = false
    this.wheelMessage = "no more tries"

    setTimeout(() => {
      // this.wheel.reset();
      // this.idToLandOn = this.slicePrizes[
      //   Math.floor(Math.random() * this.seed.length)
      // ].number;
      this.idToLandOn = this.weightedRandomNumber(this.probabilities)?.toString();
    }, 2000);
  }

  spinAction(type: string) {
    console.log("Hi");
    console.log(this.userCanSpin);
    console.log(this.wheelMessage);
    

    if (type == 'balance') {
      this.wheelMessage = ""
      this.userCanSpin = true
      this.isWheelClicked = false
      console.log("Again");
      // this.wheel.reset();
      // this.wheel.spin();
    }

    if (!this.userCanSpin) {
      this.isWheelClicked = true
    }

    // Call the spin method with the desired prize or any other logic
    if (this.userCanSpin) {
      this.wheel.reset();
      this.wheel.spin();
      console.log(this.wheelMessage);

    }

  }

  checkIfUserCanSpin() {
    console.log(this._AuthServices.userToken);
    if (this._AuthServices.userToken) {
      this._WheelService.canSpin().subscribe((res) => {
        this.isWheelLoading = false
        console.log(res);
        this.wheelMessage = res.message
        this.userCanSpin = res.success
        console.log(this.userCanSpin);

      })
    } else {
      this.isWheelLoading = false
      console.log("Please login");
      this.wheelMessage = "Please login first"
    }


  }


}
