import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weirwood-product',
  templateUrl: './weirwood-product.component.html',
  styleUrls: ['./weirwood-product.component.scss']
})
export class WeirwoodProductComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() link: string = '';
  constructor(private router: Router) {}

  click() {
    /https/.test(this.link)
      ? window.open(this.link)
      : this.router.navigate([this.link]);
  }
}
