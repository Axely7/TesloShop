import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const AddressPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      city: "",
      country: countries[0].code,
      phone: "",
    },
  });

  const onAddressForm = async (data: FormData) => {
    console.log({ data });
    Cookies.set("firstName", data.firstName);
    Cookies.set("lastName", data.lastName);
    Cookies.set("address", data.address);
    Cookies.set("address2", data.address2 || "");
    Cookies.set("zip", data.zip);
    Cookies.set("city", data.city);
    Cookies.set("country", data.country);
    Cookies.set("phone", data.phone);

    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title="Dirección"
      pageDescription={"Confirmar dirección del destino"}
    >
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>
      <form onSubmit={handleSubmit(onAddressForm)} noValidate>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Este campo es requerido",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register("address2")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Este campo es requerido",
                minLength: { value: 4, message: "Mínimo 4 caracteres" },
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido",
                minLength: { value: 4, message: "Mínimo 4 caracteres" },
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="País"
                defaultValue={countries[0].code}
                {...register("country", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.country}
              >
                {countries.map((country) => (
                  <MenuItem value={country.code} key={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
                minLength: { value: 5, message: "Mínimo 5 digitos" },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from "next";
// import { jwt } from "../../utils";

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;
//   let userId = "";
//   let isValidToken = false;

//   try {
//     userId = await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
