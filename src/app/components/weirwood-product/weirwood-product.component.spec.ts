import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeirwoodProductComponent } from './weirwood-product.component';

describe('WeirwoodProductComponent', () => {
  let component: WeirwoodProductComponent;
  let fixture: ComponentFixture<WeirwoodProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeirwoodProductComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeirwoodProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
