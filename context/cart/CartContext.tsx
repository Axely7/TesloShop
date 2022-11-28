import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  // Methods:
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (produduct: ICartProduct) => void;
  removeCartProduct: (produduct: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{hasError: boolean; message: string;}>;
}

export const CartContext = createContext({} as ContextProps);
