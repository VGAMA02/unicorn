import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalisisIncOutSchPage } from './analisis-inc-out-sch.page';

describe('AnalisisIncOutSchPage', () => {
  let component: AnalisisIncOutSchPage;
  let fixture: ComponentFixture<AnalisisIncOutSchPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisIncOutSchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalisisIncOutSchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
