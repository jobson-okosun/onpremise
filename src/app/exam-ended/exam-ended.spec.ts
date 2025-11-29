import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEnded } from './exam-ended';

describe('ExamEnded', () => {
  let component: ExamEnded;
  let fixture: ComponentFixture<ExamEnded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamEnded]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamEnded);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
