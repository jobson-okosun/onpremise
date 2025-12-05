import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelImageWithText } from './label-image-with-text';

describe('LabelImageWithText', () => {
  let component: LabelImageWithText;
  let fixture: ComponentFixture<LabelImageWithText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelImageWithText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelImageWithText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
