import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeirwoodLogoComponent } from './weirwood-logo.component';

describe('WeirwoodLogoComponent', () => {
  let component: WeirwoodLogoComponent;
  let fixture: ComponentFixture<WeirwoodLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeirwoodLogoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeirwoodLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
