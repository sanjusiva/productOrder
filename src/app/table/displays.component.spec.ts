import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysComponent } from './dsiplays.component';

describe('TableComponent', () => {
  let component: DisplaysComponent;
  let fixture: ComponentFixture<DisplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
