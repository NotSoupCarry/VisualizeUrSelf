import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentedatiComponent } from './utentedati.component';

describe('UtentedatiComponent', () => {
  let component: UtentedatiComponent;
  let fixture: ComponentFixture<UtentedatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtentedatiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtentedatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
