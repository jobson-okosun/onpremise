import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificCalculator } from './scientific-calculator';

describe('ScientificCalculator', () => {
  let component: ScientificCalculator;
  let fixture: ComponentFixture<ScientificCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScientificCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScientificCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
