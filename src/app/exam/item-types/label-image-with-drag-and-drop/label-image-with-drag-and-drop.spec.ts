import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelImageWithDragAndDrop } from './label-image-with-drag-and-drop';

describe('LabelImageWithDragAndDrop', () => {
  let component: LabelImageWithDragAndDrop;
  let fixture: ComponentFixture<LabelImageWithDragAndDrop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelImageWithDragAndDrop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelImageWithDragAndDrop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
