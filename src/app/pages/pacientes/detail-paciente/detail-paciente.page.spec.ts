import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPacientePage } from './detail-paciente.page';

describe('DetailPacientePage', () => {
  let component: DetailPacientePage;
  let fixture: ComponentFixture<DetailPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPacientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
