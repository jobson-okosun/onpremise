import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewModeLayout } from './preview-mode-layout';

describe('PreviewModeLayout', () => {
  let component: PreviewModeLayout;
  let fixture: ComponentFixture<PreviewModeLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewModeLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewModeLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
