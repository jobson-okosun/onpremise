import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceMatrix } from './choice-matrix';

describe('ChoiceMatrix', () => {
  let component: ChoiceMatrix;
  let fixture: ComponentFixture<ChoiceMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceMatrix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceMatrix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
