import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingListComponent } from './filing-list.component';

describe('FilingListComponent', () => {
  let component: FilingListComponent;
  let fixture: ComponentFixture<FilingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilingListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
