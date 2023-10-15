import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
@Component({
  selector: 'app-wheel-of-luck',
  templateUrl: './wheel-of-luck.component.html',
  styleUrls: ['./wheel-of-luck.component.scss']
})
export class WheelOfLuckComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;
  success!: any
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

  ngOnInit() {

    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');

    // Create a linear gradient for the fillStyle
    const gradient = ctx.createLinearGradient(0, 0, 0, 200); // Adjust the gradient direction and size

    // Define gradient colors and positions
    gradient.addColorStop(0, '#216bff'); // Starting color at the top
    gradient.addColorStop(1, '#5760d7');

    this.idToLandOn = this.slicePrizes[
      Math.floor(Math.random() * this.seed.length)
    ].number;
    console.log(this.idToLandOn);

    const colors = [gradient, "#ffff"];
    const colors2 = ["#fff", "#07487C"]
    this.items = this.slicePrizes.map((value: any) => ({
      fillStyle: colors[value.number % 2],
      text: `${value.data}`,
      id: value.number,
      textFillStyle: colors2[value.number % 2],
      textFontSize: "14"
    }));
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
    console.log(this.idToLandOn);
    this.success = this.slicePrizes.find((ele) => {


      return ele.number == this.idToLandOn
    })


  }

  async spin(prize: any) {

    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  after() {

    setTimeout(() => {
      // this.wheel.reset();
      this.idToLandOn = this.slicePrizes[
        Math.floor(Math.random() * this.seed.length)
      ].number;
    }, 2000);
  }
  spinAction() {
    this.wheel.reset();
    // Call the spin method with the desired prize or any other logic
    this.wheel.spin();
  }


}
