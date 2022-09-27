import { FC, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

interface Props {
  children: any;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const addProductToCart = (product: ICartProduct) => {
    console.log(product);
    dispatch({ type: "[Cart] - Add Product", payload: product });
  };
  return (
    <CartContext.Provider
      value={{
        ...state,

        //Methods:
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
