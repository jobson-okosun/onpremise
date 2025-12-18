import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleResponse } from './multiple-response';

describe('MultipleResponse', () => {
  let component: MultipleResponse;
  let fixture: ComponentFixture<MultipleResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleResponse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
