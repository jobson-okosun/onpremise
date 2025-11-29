import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerTools } from './answer-tools';

describe('AnswerTools', () => {
  let component: AnswerTools;
  let fixture: ComponentFixture<AnswerTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
