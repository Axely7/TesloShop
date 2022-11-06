import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useReducer } from "react";
import { tesloApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface Props {
  children: any;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log(data.user);
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  // we use promise because we are using async await
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");
    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
