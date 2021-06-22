import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeHomeComponent } from './molecule-home.component';

describe('MoleculeHomeComponent', () => {
  let component: MoleculeHomeComponent;
  let fixture: ComponentFixture<MoleculeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoleculeHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
