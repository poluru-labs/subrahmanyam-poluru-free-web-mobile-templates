import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
describe('App', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] }).compileComponents(); });
  it('creates', () => expect(TestBed.createComponent(App).componentInstance).toBeTruthy());
  it('footer', async () => { const f = TestBed.createComponent(App); await f.whenStable(); expect(f.nativeElement.querySelector('.site-footer a[href="https://polurus.com"]')?.textContent).toContain('Subrahmanyam Poluru'); });
});
