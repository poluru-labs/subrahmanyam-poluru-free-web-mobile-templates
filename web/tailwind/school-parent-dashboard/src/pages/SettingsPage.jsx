import { parent, school } from '../data';
import { Button, Card } from '../components/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted">How Whitmore Academy contacts you.</p>
      </header>

      <Card title="Profile">
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <label className="block text-sm font-medium">
            Full name
            <input defaultValue={parent.name} className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm" />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input type="email" defaultValue={parent.email} className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm" />
          </label>
          <label className="block text-sm font-medium">
            Phone
            <input defaultValue={parent.phone} className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm" />
          </label>
          <label className="block text-sm font-medium">
            Campus
            <input defaultValue={school.campus} readOnly className="mt-1 w-full rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm text-muted" />
          </label>
          <div className="sm:col-span-2">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </Card>

      <Card title="Notifications">
        <ul className="space-y-3 text-sm">
          {[
            { id: 'email', label: 'Email for grades and attendance alerts', defaultChecked: true },
            { id: 'sms', label: 'SMS for early dismissal and emergency notices', defaultChecked: true },
            { id: 'fees', label: 'Reminders before a tuition installment is due', defaultChecked: true },
            { id: 'digest', label: 'Weekly Sunday digest of messages and events', defaultChecked: false },
          ].map((item) => (
            <li key={item.id}>
              <label className="flex items-start gap-3">
                <input type="checkbox" defaultChecked={item.defaultChecked} className="mt-1 accent-brand" />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
