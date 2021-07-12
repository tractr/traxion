import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeNotConnectedComponent } from './molecule-not-connected.component';

describe('MoleculeNotConnectedComponent', () => {
  let component: MoleculeNotConnectedComponent;
  let fixture: ComponentFixture<MoleculeNotConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeNotConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeNotConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
