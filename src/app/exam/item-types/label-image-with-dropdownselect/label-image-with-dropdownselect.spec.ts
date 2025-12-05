import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelImageWithDropdownselect } from './label-image-with-dropdownselect';

describe('LabelImageWithDropdownselect', () => {
  let component: LabelImageWithDropdownselect;
  let fixture: ComponentFixture<LabelImageWithDropdownselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelImageWithDropdownselect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelImageWithDropdownselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
