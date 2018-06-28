import { Component, OnInit, HostListener } from '@angular/core';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public laptopVisible: boolean;

  constructor() {
  }

  @HostListener("window:scroll", [])

  public isVisible(): void {
    let el = document.getElementById("laptop");

    let top = el.offsetTop;
    let height = el.offsetHeight;

    const visible = top < (window.pageYOffset + window.innerHeight ) && (top + height - 100) > window.pageYOffset;

    if (visible) {
      el.classList.add('opened');
    } else {
      el.classList.remove('opened');
    }
  }

  private laptopSetup(): void {
    let el = document.getElementById("laptop");

    el.classList.add('loaded');

    function setup() {
      el.classList.add('opened')
    }

    setTimeout(setup, 500);
  }

  ngOnInit() {
    this.laptopSetup();
  }

}
