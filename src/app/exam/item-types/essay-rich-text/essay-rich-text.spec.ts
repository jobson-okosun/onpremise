import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayRichText } from './essay-rich-text';

describe('EssayRichText', () => {
  let component: EssayRichText;
  let fixture: ComponentFixture<EssayRichText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssayRichText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssayRichText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
