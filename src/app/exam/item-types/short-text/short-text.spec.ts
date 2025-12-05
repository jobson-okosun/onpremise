import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortText } from './short-text';

describe('ShortText', () => {
  let component: ShortText;
  let fixture: ComponentFixture<ShortText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
