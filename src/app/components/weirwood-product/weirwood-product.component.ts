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
  @Input() installCommand: string = '';

  constructor(private router: Router) {}

  click(event: MouseEvent) {
    event.stopPropagation();
    if (!this.link) return;
    if (this.isCodeClicked(event)) return;

    if (/https/.test(this.link)) return window.open(this.link);
    this.router.navigate([this.link]);
  }

  private isCodeClicked(event: MouseEvent): boolean {
    const target = event.target as Element;
    return target.classList.contains('library');
  }
}
