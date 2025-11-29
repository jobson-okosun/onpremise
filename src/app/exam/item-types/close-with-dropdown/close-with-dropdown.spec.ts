import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseWithDropdown } from './close-with-dropdown';

describe('CloseWithDropdown', () => {
  let component: CloseWithDropdown;
  let fixture: ComponentFixture<CloseWithDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseWithDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseWithDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
