import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingWhatIsScriptchainComponent } from './landing-what-is-scriptchain.component';

describe('LandingWhatIsScriptchainComponent', () => {
  let component: LandingWhatIsScriptchainComponent;
  let fixture: ComponentFixture<LandingWhatIsScriptchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingWhatIsScriptchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingWhatIsScriptchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
