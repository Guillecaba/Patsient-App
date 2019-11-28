import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FichaPage } from './ficha.page';

describe('FichaPage', () => {
  let component: FichaPage;
  let fixture: ComponentFixture<FichaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FichaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
