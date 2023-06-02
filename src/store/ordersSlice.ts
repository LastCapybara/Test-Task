import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, Product } from '../types';



const initialState: Order[] = [
  {
    id: 1,
    title: 'Order 1',
    totalPrice: 100,
    status: 'Pending',
    date: '2017-06-29 12:09:33',
    products: [], 
  },
  {
    id: 2,
    title: 'Order 2',
    totalPrice: 200,
    status: 'Completed',
    date: '2017-06-29 12:09:33',
    products: [], 
  },
  {
    id: 3,
    title: 'Order 3',
    totalPrice: 300,
    status: 'Pending',
    date: '2017-06-29 12:09:33',
    products: [],
  },
];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderProducts(state, action: PayloadAction<{ orderId: number; products: Product[] }>) {
      const { orderId, products } = action.payload;
      const order = state.find((order) => order.id === orderId);
      if (order) {
        order.products = products;
      }
    },
    deleteOrder(state, action: PayloadAction<number>) {
      const orderId = action.payload;
      return state.filter((order) => order.id !== orderId);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      const productId = action.payload;
      return state.map((order) => ({
        ...order,
        products: order.products.filter((product) => product.id !== productId),
      }));
    },
  },
});

export const { setOrderProducts, deleteOrder, deleteProduct } = ordersSlice.actions;

export default ordersSlice.reducer;