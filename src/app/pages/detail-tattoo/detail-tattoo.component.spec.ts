import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTattooComponent } from './detail-tattoo.component';

describe('DetailTattooComponent', () => {
  let component: DetailTattooComponent;
  let fixture: ComponentFixture<DetailTattooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTattooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTattooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
