import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialAuthentication } from './facial-authentication';

describe('FacialAuthentication', () => {
  let component: FacialAuthentication;
  let fixture: ComponentFixture<FacialAuthentication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacialAuthentication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacialAuthentication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
