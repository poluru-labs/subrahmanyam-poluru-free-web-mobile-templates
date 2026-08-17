import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Switch,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import './pages.scss';

export function SettingsPage() {
  const { show } = useToast();
  const [lowStockEmail, setLowStockEmail] = useState(true);
  const [orderPush, setOrderPush] = useState(true);
  const [autoFulfill, setAutoFulfill] = useState(false);

  return (
    <div className="page">
      <p className="page-lead">
        Storefront preferences, tax region defaults, and ops notifications.
      </p>

      <div className="settings-grid stagger">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Store</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Input label="Store name" defaultValue="Enterprise Commerce" />
            <Select
              label="Primary market"
              defaultValue="us"
              options={[
                { label: 'United States', value: 'us' },
                { label: 'European Union', value: 'eu' },
                { label: 'Asia Pacific', value: 'apac' },
              ]}
            />
            <Input
              label="Support email"
              type="email"
              defaultValue="mail.polurus@gmail.com"
            />
          </div>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Notifications</h2>
            </div>
          }
        >
          <div className="form-stack">
            <Switch
              label="Email low-stock alerts"
              checked={lowStockEmail}
              onChange={(_e, checked) => setLowStockEmail(checked)}
            />
            <Switch
              label="Push for new paid orders"
              checked={orderPush}
              onChange={(_e, checked) => setOrderPush(checked)}
            />
            <Switch
              label="Auto-fulfill digital SKUs"
              checked={autoFulfill}
              onChange={(_e, checked) => setAutoFulfill(checked)}
            />
          </div>
        </Card>
      </div>

      <div className="settings-actions">
        <Button
          variant="primary"
          onClick={() => show({ title: 'Settings saved', variant: 'success' })}
        >
          Save changes
        </Button>
        <Button variant="tertiary">Cancel</Button>
      </div>
    </div>
  );
}
