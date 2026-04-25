export interface AdminOrder {
  no: number;
  orderId: string;
  product: string;
  productImage: string;
  date: string;
  price: number;
  payment: 'Paid' | 'Unpaid';
  status: 'Delivered' | 'Pending' | 'Shipped' | 'Cancelled';
}

export interface AdminCustomer {
  customerId: string;
  name: string;
  phone: string;
  orderCount: number;
  totalSpend: number;
  status: 'Active' | 'Inactive' | 'VIP';
  email: string;
  address: string;
  avatar: string;
  registrationDate: string;
  lastPurchase: string;
  totalOrders: number;
  completedOrders: number;
  canceledOrders: number;
}

export interface AdminCategoryItem {
  id: number;
  name: string;
  image: string;
}

export interface AdminProduct {
  no: number;
  name: string;
  image: string;
  createdDate: string;
  orders: number;
}

export interface AdminTransaction {
  no: number;
  customerId: string;
  customerName: string;
  orderDate: string;
  status: 'Paid' | 'Pending' | 'Failed';
  amount: number;
}

export const adminOrders: AdminOrder[] = [
  { no: 1, orderId: '#ORD0001', product: 'Wireless Bluetooth Headphones', productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered' },
  { no: 2, orderId: '#ORD0002', product: "Men's T-Shirt", productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop', date: '01-01-2025', price: 14.99, payment: 'Unpaid', status: 'Pending' },
  { no: 3, orderId: '#ORD0003', product: "Men's Leather Wallet", productImage: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=40&h=40&fit=crop', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered' },
  { no: 4, orderId: '#ORD0004', product: 'Memory Foam Pillow', productImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=40&h=40&fit=crop', date: '01-01-2025', price: 39.99, payment: 'Paid', status: 'Shipped' },
  { no: 5, orderId: '#ORD0005', product: 'Adjustable Dumbbells', productImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=40&h=40&fit=crop', date: '01-01-2025', price: 14.99, payment: 'Unpaid', status: 'Pending' },
  { no: 6, orderId: '#ORD0006', product: 'Coffee Maker', productImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=40&h=40&fit=crop', date: '01-01-2025', price: 79.99, payment: 'Unpaid', status: 'Cancelled' },
  { no: 7, orderId: '#ORD0007', product: 'Casual Baseball Cap', productImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=40&h=40&fit=crop', date: '01-01-2025', price: 49.99, payment: 'Paid', status: 'Delivered' },
  { no: 8, orderId: '#ORD0008', product: 'Full HD Webcam', productImage: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=40&h=40&fit=crop', date: '01-01-2025', price: 39.99, payment: 'Paid', status: 'Delivered' },
  { no: 9, orderId: '#ORD0009', product: 'Smart LED Color Bulb', productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop', date: '01-01-2025', price: 79.99, payment: 'Unpaid', status: 'Delivered' },
  { no: 10, orderId: '#ORD0010', product: "Men's T-Shirt", productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop', date: '01-01-2025', price: 14.99, payment: 'Unpaid', status: 'Delivered' },
];

export const adminCustomers: AdminCustomer[] = [
  { customerId: '#CUST001', name: 'John Doe', phone: '+1234567890', orderCount: 25, totalSpend: 3450.00, status: 'Active', email: 'john.doe@example.com', address: '123 Main St, NY', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', registrationDate: '15.01.2025', lastPurchase: '10.01.2025', totalOrders: 150, completedOrders: 140, canceledOrders: 10 },
  { customerId: '#CUST002', name: 'John Doe', phone: '+1234567890', orderCount: 25, totalSpend: 3450.00, status: 'Active', email: 'john2.doe@example.com', address: '456 Oak Ave, CA', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', registrationDate: '15.01.2025', lastPurchase: '10.01.2025', totalOrders: 150, completedOrders: 140, canceledOrders: 10 },
  { customerId: '#CUST003', name: 'John Doe', phone: '+1234567890', orderCount: 25, totalSpend: 3450.00, status: 'Active', email: 'john3.doe@example.com', address: '789 Pine Rd, TX', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop', registrationDate: '15.01.2025', lastPurchase: '10.01.2025', totalOrders: 150, completedOrders: 140, canceledOrders: 10 },
  { customerId: '#CUST004', name: 'John Doe', phone: '+1234567890', orderCount: 25, totalSpend: 3450.00, status: 'Active', email: 'john4.doe@example.com', address: '321 Elm St, FL', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', registrationDate: '15.01.2025', lastPurchase: '10.01.2025', totalOrders: 150, completedOrders: 140, canceledOrders: 10 },
  { customerId: '#CUST005', name: 'Jane Smith', phone: '+1234567890', orderCount: 5, totalSpend: 250.00, status: 'Inactive', email: 'jane.smith@example.com', address: '654 Maple Dr, WA', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', registrationDate: '20.01.2025', lastPurchase: '05.01.2025', totalOrders: 10, completedOrders: 8, canceledOrders: 2 },
  { customerId: '#CUST006', name: 'Emily Davis', phone: '+1234567890', orderCount: 30, totalSpend: 4600.00, status: 'VIP', email: 'emily.davis@example.com', address: '987 Cedar Ln, IL', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', registrationDate: '10.01.2025', lastPurchase: '12.01.2025', totalOrders: 200, completedOrders: 185, canceledOrders: 15 },
  { customerId: '#CUST007', name: 'Jane Smith', phone: '+1234567890', orderCount: 5, totalSpend: 250.00, status: 'Inactive', email: 'jane2.smith@example.com', address: '147 Birch Ave, OH', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', registrationDate: '20.01.2025', lastPurchase: '05.01.2025', totalOrders: 10, completedOrders: 8, canceledOrders: 2 },
  { customerId: '#CUST008', name: 'John Doe', phone: '+1234567890', orderCount: 25, totalSpend: 3450.00, status: 'Active', email: 'john8.doe@example.com', address: '258 Walnut St, GA', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', registrationDate: '15.01.2025', lastPurchase: '10.01.2025', totalOrders: 150, completedOrders: 140, canceledOrders: 10 },
  { customerId: '#CUST009', name: 'Emily Davis', phone: '+1234567890', orderCount: 30, totalSpend: 4600.00, status: 'VIP', email: 'emily2.davis@example.com', address: '369 Spruce Rd, CO', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', registrationDate: '10.01.2025', lastPurchase: '12.01.2025', totalOrders: 200, completedOrders: 185, canceledOrders: 15 },
  { customerId: '#CUST010', name: 'Jane Smith', phone: '+1234567890', orderCount: 5, totalSpend: 250.00, status: 'Inactive', email: 'jane10.smith@example.com', address: '741 Willow Way, AZ', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', registrationDate: '20.01.2025', lastPurchase: '05.01.2025', totalOrders: 10, completedOrders: 8, canceledOrders: 2 },
];

export const adminCategories: AdminCategoryItem[] = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop' },
  { id: 2, name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop' },
  { id: 3, name: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop' },
  { id: 4, name: 'Home & Lifestyle', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=80&h=80&fit=crop' },
  { id: 5, name: 'Sports & Outdoors', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=80&h=80&fit=crop' },
  { id: 6, name: "Baby's & Toys", image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop' },
  { id: 7, name: 'Health & Fitness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop' },
  { id: 8, name: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop' },
];

export const adminProducts: AdminProduct[] = [
  { no: 1, name: 'Wireless Bluetooth Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 25 },
  { no: 2, name: "Men's T-Shirt", image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 20 },
  { no: 3, name: "Men's Leather Wallet", image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 35 },
  { no: 4, name: 'Memory Foam Pillow', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 40 },
  { no: 5, name: 'Coffee Maker', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 45 },
  { no: 6, name: 'Casual Baseball Cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 55 },
  { no: 7, name: 'Full HD Webcam', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 20 },
  { no: 8, name: 'Smart LED Color Bulb', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 16 },
  { no: 9, name: "Men's T-Shirt", image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 10 },
  { no: 10, name: "Men's Leather Wallet", image: 'https://images.unsplash.com/photo-1627123424574-724758594785?w=40&h=40&fit=crop', createdDate: '01-01-2025', orders: 35 },
];

export const adminTransactions: AdminTransaction[] = [
  { no: 1, customerId: '#6545', customerName: 'John Doe', orderDate: '01 Oct | 11:29 am', status: 'Paid', amount: 64 },
  { no: 2, customerId: '#5412', customerName: 'Jane Smith', orderDate: '01 Oct | 11:29 am', status: 'Pending', amount: 557 },
  { no: 3, customerId: '#6622', customerName: 'Emily Davis', orderDate: '01 Oct | 11:29 am', status: 'Paid', amount: 156 },
  { no: 4, customerId: '#6462', customerName: 'John Doe', orderDate: '01 Oct | 11:29 am', status: 'Paid', amount: 265 },
  { no: 5, customerId: '#6462', customerName: 'Emily Davis', orderDate: '01 Oct | 11:29 am', status: 'Paid', amount: 265 },
  { no: 6, customerId: '#7891', customerName: 'Robert Lee', orderDate: '02 Oct | 09:15 am', status: 'Paid', amount: 120 },
  { no: 7, customerId: '#3456', customerName: 'Sarah Wilson', orderDate: '02 Oct | 10:45 am', status: 'Pending', amount: 380 },
  { no: 8, customerId: '#9012', customerName: 'Mike Johnson', orderDate: '02 Oct | 14:22 pm', status: 'Paid', amount: 95 },
  { no: 9, customerId: '#2345', customerName: 'Lisa Brown', orderDate: '03 Oct | 08:30 am', status: 'Failed', amount: 210 },
  { no: 10, customerId: '#7890', customerName: 'Chris Martin', orderDate: '03 Oct | 11:00 am', status: 'Paid', amount: 445 },
];
