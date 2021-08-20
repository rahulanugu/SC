import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalProgressBarComponent } from './portal-progress-bar.component';

describe('PortalProgressBarComponent', () => {
  let component: PortalProgressBarComponent;
  let fixture: ComponentFixture<PortalProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
