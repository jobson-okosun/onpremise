import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyByMatching } from './classify-by-matching';

describe('ClassifyByMatching', () => {
  let component: ClassifyByMatching;
  let fixture: ComponentFixture<ClassifyByMatching>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassifyByMatching]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassifyByMatching);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
