import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWithText } from './close-with-text';

describe('CloseWithText', () => {
  let component: CloseWithText;
  let fixture: ComponentFixture<CloseWithText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseWithText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseWithText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
