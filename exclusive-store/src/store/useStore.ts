import { create } from 'zustand';
import type { CartItem, Product, User } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  isLoggedIn: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
  login: (user: User) => void;
  logout: () => void;
  cartCount: () => number;
  wishlistCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  user: null,
  isLoggedIn: false,

  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id);
    if (existing) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      set((state) => ({ cart: [...state.cart, { ...product, quantity: 1 }] }));
    }
  },

  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
  },

  toggleWishlist: (product) => {
    const inWishlist = get().wishlist.some((p) => p.id === product.id);
    if (inWishlist) {
      set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== product.id) }));
    } else {
      set((state) => ({ wishlist: [...state.wishlist, product] }));
    }
  },

  isInWishlist: (id) => get().wishlist.some((p) => p.id === id),

  login: (user) => set({ user, isLoggedIn: true }),

  logout: () => set({ user: null, isLoggedIn: false }),

  cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

  wishlistCount: () => get().wishlist.length,
}));
