import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Icon({ name, className = '' }) {
  return <i className={`bi bi-${name} ${className}`} aria-hidden="true" />;
}

export function Avatar({ initials, className = 'from-brand to-brand-dark text-white', size = 'md' }) {
  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Badge({ children, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-soft text-brand',
    success: 'bg-emerald-50 text-success',
    warning: 'bg-amber-50 text-warning',
    muted: 'bg-[#f3eee7] text-muted',
    white: 'bg-white/15 text-white',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Button({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const variants = {
    primary:
      'bg-brand text-white hover:bg-brand-dark shadow-sm',
    secondary:
      'bg-white text-ink border border-line hover:bg-canvas',
    ghost:
      'bg-transparent text-brand hover:bg-brand-soft',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline underline-offset-4 ${className}`}
    >
      {children}
    </Link>
  );
}

export function Card({ title, kicker, action, children, className = '', bodyClassName = 'p-5' }) {
  return (
    <section className={`rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(28,25,23,0.05)] ${className}`}>
      {(title || action) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            {kicker && <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{kicker}</p>}
            {title && <h2 className="text-sm font-semibold text-ink">{title}</h2>}
          </div>
          {action}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function EmptyState({ icon, title, body }) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-brand">
        <Icon name={icon} className="text-lg" />
      </span>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-muted">{body}</p>
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-[#efe8de] ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading dashboard</span>
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

export function Modal({ open, title, onClose, children, labelledBy = 'modal-title' }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id={labelledBy} className="text-lg font-semibold text-ink">
            {title}
          </h2>
          <button type="button" className="rounded-lg p-1 text-muted hover:bg-canvas hover:text-ink" aria-label="Close" onClick={onClose}>
            <Icon name="x-lg" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function StatusDot({ tone }) {
  const colors = {
    'in-school': 'bg-success',
    trip: 'bg-brand',
    absent: 'bg-warning',
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[tone] ?? 'bg-muted'}`} />;
}
