import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  // Methods:
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (produduct: ICartProduct) => void;
  removeCartProduct: (produduct: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
