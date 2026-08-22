import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  lead?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, lead, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {lead ? <p className="page-lead">{lead}</p> : null}
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}
