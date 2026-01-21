import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGuidelines } from './exam-guidelines';

describe('ExamGuidelines', () => {
  let component: ExamGuidelines;
  let fixture: ComponentFixture<ExamGuidelines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamGuidelines]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamGuidelines);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
