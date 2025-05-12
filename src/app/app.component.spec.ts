import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing'; // Importa ComponentFixture

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>; // Usa la importación directa
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule.withRoutes([
        { path: 'customers', component: {} as any },
        { path: 'inventory', component: {} as any }
      ])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'seminario_front' title`, () => {
    expect(component.title).toEqual('seminario_front');
  });

  it('should navigate to the specified route when redirect is called', fakeAsync(() => {
    const route = 'customers';
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.redirect(route);

    expect(router.navigate).toHaveBeenCalledWith([route]);
    tick();
  }));

  it('should navigate to a different route when redirect is called', fakeAsync(() => {
    const route = 'inventory';
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.redirect(route);

    expect(router.navigate).toHaveBeenCalledWith([route]);
    tick();
  }));
});