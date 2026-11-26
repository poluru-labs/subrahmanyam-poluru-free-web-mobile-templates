import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should include polurus.com footer link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const footerLink = (fixture.nativeElement as HTMLElement).querySelector(
      '.site-footer a[href="https://polurus.com"]',
    );
    expect(footerLink?.textContent).toContain('Subrahmanyam Poluru');
  });
});