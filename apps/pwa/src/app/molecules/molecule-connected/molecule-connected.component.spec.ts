import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeConnectedComponent } from './molecule-connected.component';

describe('MoleculeConnectedComponent', () => {
  let component: MoleculeConnectedComponent;
  let fixture: ComponentFixture<MoleculeConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
