import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarvisComponent } from './jarvis.component';

describe('JarvisComponent', () => {
  let component: JarvisComponent;
  let fixture: ComponentFixture<JarvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JarvisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JarvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
