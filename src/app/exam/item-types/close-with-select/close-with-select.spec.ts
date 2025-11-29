import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWithSelect } from './close-with-select';

describe('CloseWithSelect', () => {
  let component: CloseWithSelect;
  let fixture: ComponentFixture<CloseWithSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseWithSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseWithSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
