import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditorPacientePage } from './editor-paciente.page';

describe('EditorPacientePage', () => {
  let component: EditorPacientePage;
  let fixture: ComponentFixture<EditorPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPacientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
