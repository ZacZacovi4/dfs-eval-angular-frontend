import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementPage } from './classement.page';

describe('ClassementPage', () => {
  let component: ClassementPage;
  let fixture: ComponentFixture<ClassementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassementPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
