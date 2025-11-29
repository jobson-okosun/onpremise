import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTools } from './question-tools';

describe('QuestionTools', () => {
  let component: QuestionTools;
  let fixture: ComponentFixture<QuestionTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
