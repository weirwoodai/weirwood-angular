import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-video-background',
  templateUrl: './video-background.component.html',
  styleUrls: ['./video-background.component.scss']
})
export class VideoBackgroundComponent {
  @Input() source: string;
  @Input() height: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  get poster() {
    return this.source.substring(0, this.source.lastIndexOf('.')) + '.png';
  }
}
