import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AthenaProfileComponent } from './athena-profile.component';
import { PatientNavbarComponent } from '../patient-profile/patient-navbar/patient-navbar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIcon } from '@angular/material/icon';
import {  MatChipList, MatChipsModule, MatChipInput } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { ObserversModule } from '@angular/cdk/observers';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AthenaProfileComponent', () => {
  let component: AthenaProfileComponent;
  let fixture: ComponentFixture<AthenaProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule, FormsModule, MatRippleModule, ObserversModule, RouterTestingModule, HttpClientModule, MatChipsModule, BrowserAnimationsModule],
      declarations: [AthenaProfileComponent, PatientNavbarComponent, SearchBarComponent, MatIcon, MatRadioButton, MatFormField, MatRadioGroup]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthenaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
