import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyByOrdering } from './classify-by-ordering';

describe('ClassifyByOrdering', () => {
  let component: ClassifyByOrdering;
  let fixture: ComponentFixture<ClassifyByOrdering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifyByOrdering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifyByOrdering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
