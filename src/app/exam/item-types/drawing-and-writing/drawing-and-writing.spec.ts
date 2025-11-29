import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingAndWriting } from './drawing-and-writing';

describe('DrawingAndWriting', () => {
  let component: DrawingAndWriting;
  let fixture: ComponentFixture<DrawingAndWriting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingAndWriting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingAndWriting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
