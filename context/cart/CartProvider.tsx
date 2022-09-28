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
    // dispatch({ type: "[Cart] - Add Product", payload: product });
    // const productsInCart = state.cart.filter(
    //   (p) => p._id !== product._id && p.sizes !== product.sizes
    // );
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.sizes === product.sizes
    );

    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.sizes !== product.sizes) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
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
