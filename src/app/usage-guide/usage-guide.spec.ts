import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageGuide } from './usage-guide';

describe('UsageGuide', () => {
  let component: UsageGuide;
  let fixture: ComponentFixture<UsageGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
