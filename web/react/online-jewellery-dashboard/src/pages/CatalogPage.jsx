import { products } from '../data';
import { Badge, Button, Card, Icon } from '../components/ui';

export default function CatalogPage() {
  return <section className="space-y-6"><PageHeading eyebrow="Merchandising" title="Product catalogue" action="Add product" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <Card key={product.id} className="overflow-hidden" bodyClassName="p-0"><div className={`ojd-product-art ${product.art}`}><Icon name={product.icon} className="text-5xl" /></div><div className="space-y-3 p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-lg font-semibold">{product.name}</h2><p className="text-sm text-muted">{product.category}</p></div><Badge tone={product.stock < 10 ? 'warning' : 'success'}>{product.stock} in stock</Badge></div><div className="flex items-center justify-between"><span className="text-lg font-semibold">${product.price}</span><Button variant="secondary" className="px-3 py-2" aria-label={`Edit ${product.name}`}><Icon name="pencil" /></Button></div></div></Card>)}</div></section>;
}

function PageHeading({ eyebrow, title, action }) { return <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p><h1 className="mt-1 font-display text-4xl font-semibold tracking-tight">{title}</h1></div><Button><Icon name="plus-lg" />{action}</Button></header>; }
