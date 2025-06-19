import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  card: {
    info: {
      id: string;
      name: string;
      price: number;
      imageId?: string;
      category?: string;
      description?: string;
    };
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem['card']>) => {
      const existingItem = state.items.find(
        item => item.card.info.id === action.payload.info.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ card: action.payload, quantity: 1 });
      }
      
      state.totalItems += 1;
      state.totalAmount += action.payload.info.price / 100;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        item => item.card.info.id === action.payload
      );
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= (item.card.info.price / 100) * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(
        item => item.card.info.id === action.payload.id
      );
      
      if (item) {
        const quantityDiff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalItems += quantityDiff;
        state.totalAmount += (item.card.info.price / 100) * quantityDiff;
        
        if (item.quantity <= 0) {
          const itemIndex = state.items.findIndex(
            i => i.card.info.id === action.payload.id
          );
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;