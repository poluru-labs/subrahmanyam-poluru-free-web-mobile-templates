import { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Combobox,
  DatePicker,
  Divider,
  DropdownMenu,
  Input,
  Kbd,
  List,
  MenuItem,
  Modal,
  NumberInput,
  Popover,
  Search,
  Select,
  SideNav,
  Slider,
  Stepper,
  Textarea,
  ThemeProvider,
  TimePicker,
  ToastProvider,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  commands,
  currentUser,
  deptOptions,
  employerOptions,
  navItems,
  notifications,
  ownerOptions,
  postSteps,
} from './data';
import Overview from './pages/Overview.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Candidates from './pages/Candidates.jsx';
import Pipeline from './pages/Pipeline.jsx';
import Employers from './pages/Employers.jsx';
import Settings from './pages/Settings.jsx';

function parseHash(hash) {
  const path = (hash || '#/overview').replace(/^#/, '') || '/overview';
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'overview', id: parts[1] || '' };
}

const pages = {
  overview: Overview,
  jobs: Jobs,
  job: JobDetail,
  candidates: Candidates,
  pipeline: Pipeline,
  employers: Employers,
  settings: Settings,
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <RajaApp />
      </ToastProvider>
    </ThemeProvider>
  );
}

function RajaApp() {
  const [hash, setHash] = useState(() => window.location.hash || '#/overview');
  const route = parseHash(hash);
  const Page = pages[route.name] || Overview;
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [postStep, setPostStep] = useState(0);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('Kavya Poluru');
  const [employer, setEmployer] = useState('e1');
  const [dept, setDept] = useState('Engineering');
  const [headcount, setHeadcount] = useState(1);
  const [priority, setPriority] = useState(70);
  const [startDate, setStartDate] = useState('2026-09-08');
  const [startTime, setStartTime] = useState('09:30');
  const [notes, setNotes] = useState('');

  const sideItems = useMemo(
    () => navItems.map((item) => ({
      ...item,
      active: route.name === item.id || (item.id === 'jobs' && route.name === 'job'),
    })),
    [route.name],
  );

  const filteredCommands = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#/overview';
    const sync = () => {
      setHash(window.location.hash || '#/overview');
      setMobileOpen(false);
    };
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  function go(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }

  function postJob() {
    if (!title.trim()) {
      showToast({ title: 'Title required', description: 'Name the role first.', variant: 'warning' });
      setPostStep(0);
      return;
    }
    setPostOpen(false);
    setPostStep(0);
    showToast({
      title: 'Job queued',
      description: `${title} will publish under ${employerOptions.find((item) => item.value === employer)?.label}.`,
      variant: 'success',
    });
    setTitle('');
    go('#/jobs');
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <button
        type="button"
        className={`backdrop ${mobileOpen ? 'is-on' : ''}`}
        aria-label="Close navigation"
        hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      <div className="shell">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="topbar-start">
              <Button className="menu-btn" variant="secondary" size="sm" icon="menu" iconOnly accessibleLabel="Toggle sidebar" onClick={() => setMobileOpen((open) => !open)} />
              <a className="brand" href="#/overview">
                <span className="brand-mark" aria-hidden="true">J</span>
                <span className="brand-copy">
                  <small>Poluru Cloud</small>
                  <strong>Jobs Raja</strong>
                </span>
              </a>
              <span className="live-pill"><span className="live-dot" />Live</span>
            </div>
            <div className="search-wrap">
              <Search
                value={query}
                placeholder="Search jobs, candidates, owners…"
                onChange={(_, value) => setQuery(value)}
                onFocus={() => setCommandOpen(true)}
              />
            </div>
            <div className="topbar-end">
              <Tooltip content="Command palette">
                <button type="button" className="ghost-chip" onClick={() => setCommandOpen(true)}>
                  <Kbd>⌘K</Kbd>
                </button>
              </Tooltip>
              <span className="topbar-icon">
                <Popover open={inboxOpen} onOpenChange={setInboxOpen} heading="Inbox" placement="bottom" trigger={<Button variant="secondary" size="sm" icon="bell" iconOnly accessibleLabel="Notifications" />}>
                  <List items={notifications} divided />
                </Popover>
              </span>
              <span className="topbar-cta">
                <Button size="sm" icon="plus" onClick={() => { setPostStep(0); setPostOpen(true); }}>Post job</Button>
              </span>
              <DropdownMenu
                open={menuOpen}
                onOpenChange={setMenuOpen}
                trigger={(
                  <button className="account" type="button" aria-label="Account">
                    <Avatar name={currentUser.name} size="sm" />
                    <span>
                      <strong>{currentUser.name}</strong>
                      <small>{currentUser.role}</small>
                    </span>
                  </button>
                )}
              >
                <MenuItem value="settings" label="Preferences" onSelect={() => go('#/settings')} />
                <MenuItem value="signout" label="Sign out" danger onSelect={() => showToast({ title: 'Signed out', description: 'Kavya Poluru ended the Jobs Raja session.', variant: 'info' })} />
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="body">
          <aside className={`sidebar ${mobileOpen ? 'is-mobile-open' : ''}`}>
            <SideNav className="sidebar-nav" items={sideItems} onNavigate={(_, href) => href && go(href)} />
            <div>
              <p className="quick-label">Quick links</p>
              <Button size="sm" icon="plus" onClick={() => { setPostStep(0); setPostOpen(true); }}>Post job</Button>
            </div>
            <div className="profile" style={{ cursor: 'default' }}>
              <Avatar name={currentUser.name} size="md" />
              <span>
                <strong>{currentUser.name}</strong>
                <small>{currentUser.role}</small>
              </span>
            </div>
          </aside>

          <main id="main" className="content">
            <Page routeId={route.id} query={query} onPost={() => { setPostStep(0); setPostOpen(true); }} />
          </main>
        </div>
      </div>

      <Modal open={commandOpen} onOpenChange={setCommandOpen} heading="Jump to anything">
        <Search value={query} placeholder="Type a role, owner, or page" onChange={(_, value) => setQuery(value)} />
        {filteredCommands.length ? (
          <div className="cmd-list">
            {filteredCommands.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  setCommandOpen(false);
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="note">Nothing matches. Try Frontend or Kavya Poluru.</p>
        )}
      </Modal>

      <Modal
        open={postOpen}
        onOpenChange={(open) => { setPostOpen(open); if (!open) setPostStep(0); }}
        heading="Post a job"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (postStep === 0 ? setPostOpen(false) : setPostStep((step) => step - 1))}>{postStep === 0 ? 'Cancel' : 'Back'}</Button>
            {postStep < 2
              ? <Button onClick={() => setPostStep((step) => step + 1)}>Next</Button>
              : <Button onClick={postJob}>Queue job</Button>}
          </>
        )}
      >
        <div className="stack" style={{ paddingTop: '0.4rem' }}>
          <Stepper steps={postSteps} current={postStep} onStepClick={(index) => { if (index <= postStep) setPostStep(index); }} />
          {postStep === 0 ? (
            <div className="form-grid">
              <Input className="full" label="Role title" value={title} placeholder="Staff Frontend Engineer" onChange={(event) => setTitle(event.target.value)} />
              <Select className="full" label="Department" value={dept} onChange={(event) => setDept(event.target.value)} options={deptOptions} />
            </div>
          ) : null}
          {postStep === 1 ? (
            <div className="form-grid">
              <Combobox label="Employer" value={employer} options={employerOptions} onChange={setEmployer} />
              <NumberInput label="Headcount" value={headcount} min={1} max={12} onChange={(_, value) => setHeadcount(value)} />
              <Slider className="full" label="Priority" min={0} max={100} value={priority} showValue onChange={(_, value) => setPriority(value)} />
            </div>
          ) : null}
          {postStep === 2 ? (
            <div className="form-grid">
              <Autocomplete label="Owner" value={owner} suggestions={ownerOptions.map((item) => item.label)} onChange={setOwner} />
              <DatePicker label="Go-live date" value={startDate} onChange={setStartDate} />
              <TimePicker label="Go-live time" value={startTime} onChange={(_, value) => setStartTime(value)} />
              <Textarea className="full" label="Notes" value={notes} placeholder="What is Kavya Poluru hiring for?" onChange={(event) => setNotes(event.target.value)} />
              <Divider className="full" />
              <p className="note full">{title || 'Untitled role'} · {employerOptions.find((item) => item.value === employer)?.label} · {dept} · {owner}</p>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
