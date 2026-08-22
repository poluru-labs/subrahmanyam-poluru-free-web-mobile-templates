import { useToast } from '../context/ToastContext';

export function ToastHost() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast-item toast-item--${toast.variant}`}
          onClick={() => dismiss(toast.id)}
        >
          <strong>{toast.title}</strong>
          {toast.message ? <span>{toast.message}</span> : null}
        </button>
      ))}
    </div>
  );
}
