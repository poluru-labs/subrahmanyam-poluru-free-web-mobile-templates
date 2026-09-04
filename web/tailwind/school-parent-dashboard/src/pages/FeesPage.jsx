import { useState } from 'react';
import { feeAccount } from '../data';
import { useApp } from '../context';
import { Badge, Button, Card, Icon, Modal } from '../components/ui';

export default function FeesPage() {
  const { outstanding, paid, setPaid } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Fees & payments</h1>
          <p className="mt-1 text-sm text-muted">Family account · {feeAccount.method}</p>
        </div>
        <Button disabled={paid} onClick={() => setOpen(true)}>
          <Icon name="lock" />
          Make Payment
        </Button>
      </header>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Outstanding balance</p>
        <p className="mt-1 font-display text-4xl font-semibold text-brand">{paid ? '$0' : `$${outstanding.toLocaleString()}`}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={paid ? 'success' : 'warning'}>{paid ? 'Paid in full' : feeAccount.status}</Badge>
          <span className="text-sm text-muted">Next due {feeAccount.nextDue}</span>
        </div>
      </Card>

      <Card title="Recent activity" bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {feeAccount.lineItems.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-muted">
                  {item.child} · Due {item.due}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">${item.amount.toLocaleString()}</span>
                <Badge tone={item.status === 'Paid' || (paid && item.status === 'Due') ? 'success' : 'warning'}>
                  {paid && item.status === 'Due' ? 'Paid' : item.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Pay fall installment">
        <p className="text-sm text-muted">Secure checkout for the September tuition installment.</p>
        <p className="my-4 font-display text-3xl font-semibold text-brand">$1,850.00</p>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              setPaid(true);
              setOpen(false);
            }}
          >
            Confirm payment
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
