export type MenuCategory =
  | 'All'
  | 'South Indian'
  | 'Breakfast'
  | 'North Indian'
  | 'Biryani'
  | 'Rice'
  | 'Starter'
  | 'Beverage';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
  isFeatured?: boolean;
  spicyLevel?: 1 | 2 | 3;
  rating?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderType = 'Delivery' | 'Takeaway' | 'Dine-in';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  orderType: OrderType;
  address?: string;
  tableNumber?: string;
  specialInstructions?: string;
  paymentMethod: 'Cash' | 'UPI' | 'Card';
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'Confirmed' | 'Preparing' | 'Out for delivery' | 'Delivered';
  createdAt: string;
}

export interface TableBooking {
  bookingId: string;
  customerName: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingPreference: 'Indoor AC' | 'Traditional Family' | 'Window View';
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date?: string;
}
