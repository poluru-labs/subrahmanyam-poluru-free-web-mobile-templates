export const brand = { name: 'Aurelia', tagline: 'Fine pieces, thoughtfully made.', initials: 'A', owner: 'Maya Chen', email: 'maya@aurelia.store' };

export const navItems = [
  { to: '/', label: 'Overview', icon: 'grid-1x2', end: true },
  { to: '/catalog', label: 'Catalogue', icon: 'gem' },
  { to: '/orders', label: 'Orders', icon: 'bag' },
  { to: '/customers', label: 'Customers', icon: 'people' },
  { to: '/settings', label: 'Settings', icon: 'gear' },
];

export const breadcrumbs = { '/': ['Workspace', 'Overview'], '/catalog': ['Workspace', 'Catalogue'], '/orders': ['Workspace', 'Orders'], '/customers': ['Workspace', 'Customers'], '/settings': ['Workspace', 'Settings'] };
export const products = [
  { id: 'p1', name: 'Solara Pendant', category: 'Necklaces', price: '285', stock: 18, icon: 'brightness-high', art: 'ojd-art-sun' },
  { id: 'p2', name: 'Serein Hoops', category: 'Earrings', price: '160', stock: 7, icon: 'circle', art: 'ojd-art-rose' },
  { id: 'p3', name: 'Luna Signet', category: 'Rings', price: '220', stock: 24, icon: 'moon', art: 'ojd-art-night' },
  { id: 'p4', name: 'Citrine Line', category: 'Bracelets', price: '195', stock: 12, icon: 'stars', art: 'ojd-art-citrine' },
  { id: 'p5', name: 'Arc Drop', category: 'Earrings', price: '240', stock: 4, icon: 'diamond', art: 'ojd-art-arc' },
  { id: 'p6', name: 'Mira Chain', category: 'Necklaces', price: '310', stock: 15, icon: 'link-45deg', art: 'ojd-art-mira' },
];
export const orders = [
  { id: '#AU-1048', customer: 'Olivia Martin', date: 'Sep 03, 2026', total: '285.00', status: 'Processing' },
  { id: '#AU-1047', customer: 'Noah Williams', date: 'Sep 03, 2026', total: '460.00', status: 'Shipped' },
  { id: '#AU-1046', customer: 'Amelia Garcia', date: 'Sep 02, 2026', total: '160.00', status: 'Delivered' },
  { id: '#AU-1045', customer: 'Ethan Brown', date: 'Sep 02, 2026', total: '530.00', status: 'Processing' },
  { id: '#AU-1044', customer: 'Sophia Lee', date: 'Sep 01, 2026', total: '220.00', status: 'Delivered' },
];
export const customers = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', initials: 'OM', orders: 8, spent: '1,240', tier: 'VIP', avatar: 'from-[#ffb36b] to-[#d95d39]' },
  { name: 'Noah Williams', email: 'noah.williams@email.com', initials: 'NW', orders: 4, spent: '680', tier: 'Regular', avatar: 'from-[#f3c969] to-[#b56b2a]' },
  { name: 'Amelia Garcia', email: 'amelia.garcia@email.com', initials: 'AG', orders: 12, spent: '2,150', tier: 'VIP', avatar: 'from-[#e891a5] to-[#a83f67]' },
  { name: 'Ethan Brown', email: 'ethan.brown@email.com', initials: 'EB', orders: 2, spent: '530', tier: 'New', avatar: 'from-[#8ec5b1] to-[#347c68]' },
];
export const notifications = [
  { id: 'n1', title: 'Low stock alert', body: 'Arc Drop has only 4 pieces left.', time: '12 min ago', read: false, icon: 'exclamation-circle' },
  { id: 'n2', title: 'New order received', body: 'Order #AU-1048 is ready to process.', time: '34 min ago', read: false, icon: 'bag-check' },
  { id: 'n3', title: 'Weekly report ready', body: 'August sales report is ready to view.', time: 'Yesterday', read: true, icon: 'graph-up' },
];
