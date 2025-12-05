import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayPlainText } from './essay-plain-text';

describe('EssayPlainText', () => {
  let component: EssayPlainText;
  let fixture: ComponentFixture<EssayPlainText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssayPlainText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssayPlainText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
