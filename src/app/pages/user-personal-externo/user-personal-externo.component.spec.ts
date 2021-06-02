import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalExternoComponent } from './user-personal-externo.component';

describe('UserPersonalExternoComponent', () => {
  let component: UserPersonalExternoComponent;
  let fixture: ComponentFixture<UserPersonalExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPersonalExternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
