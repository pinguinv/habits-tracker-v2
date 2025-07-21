import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallFrequencyDisplay } from './small-frequency-display';

describe('SmallFrequencyDisplay', () => {
  let component: SmallFrequencyDisplay;
  let fixture: ComponentFixture<SmallFrequencyDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallFrequencyDisplay]
    }).compileComponents();

    fixture = TestBed.createComponent(SmallFrequencyDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
