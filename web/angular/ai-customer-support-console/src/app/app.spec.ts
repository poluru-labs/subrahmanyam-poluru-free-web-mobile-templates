import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] }).compileComponents();
  });

  it('should create the shell', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('should include polurus.com footer link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const link = fixture.nativeElement.querySelector('.site-footer a[href="https://polurus.com"]');
    expect(link?.textContent).toContain('Subrahmanyam Poluru');
  });
});