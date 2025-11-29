import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTools } from './exam-tools';

describe('ExamTools', () => {
  let component: ExamTools;
  let fixture: ComponentFixture<ExamTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
