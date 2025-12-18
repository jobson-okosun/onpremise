import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesOrNo } from './yes-or-no';

describe('YesOrNo', () => {
  let component: YesOrNo;
  let fixture: ComponentFixture<YesOrNo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesOrNo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesOrNo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
