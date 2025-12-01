import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingAndWritingRoughMode } from './drawing-and-writing-rough-mode';

describe('DrawingAndWritingRoughMode', () => {
  let component: DrawingAndWritingRoughMode;
  let fixture: ComponentFixture<DrawingAndWritingRoughMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingAndWritingRoughMode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingAndWritingRoughMode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
