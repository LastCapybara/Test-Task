import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';


const initialState: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:31',
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:32',
  }, 
  {
    id: 3,
    serialNumber: 12345,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 3',
    type: 'Laptops',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:34',
  },
  {
    id: 4,
    serialNumber: 12341,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 4',
    type: 'Printers',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:35',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 3,
    date: '2017-06-29 12:09:33',
  },
];



const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state = state.filter((product) => product.id !== productId);
    },
   
  },
});

export const { deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
