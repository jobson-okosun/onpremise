import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueOrFalse } from './true-or-false';

describe('TrueOrFalse', () => {
  let component: TrueOrFalse;
  let fixture: ComponentFixture<TrueOrFalse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueOrFalse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueOrFalse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
