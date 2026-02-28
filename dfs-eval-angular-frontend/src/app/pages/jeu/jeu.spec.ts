import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuPage } from './jeu.page';

describe('JeuPage', () => {
  let component: JeuPage;
  let fixture: ComponentFixture<JeuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JeuPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
