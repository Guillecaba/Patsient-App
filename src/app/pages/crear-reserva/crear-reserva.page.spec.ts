import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearReservaPage } from './crear-reserva.page';

describe('CrearReservaPage', () => {
  let component: CrearReservaPage;
  let fixture: ComponentFixture<CrearReservaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearReservaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
