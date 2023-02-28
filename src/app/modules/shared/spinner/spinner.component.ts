import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="lds-hourglass"></div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
