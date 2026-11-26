import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
describe('App', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] }).compileComponents(); });
  it('footer link', async () => { const f = TestBed.createComponent(App); await f.whenStable(); expect(f.nativeElement.querySelector('.site-footer a[href="https://polurus.com"]')).toBeTruthy(); });
});
