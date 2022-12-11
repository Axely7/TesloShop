import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import { ShopLayout } from "../../components/layouts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información si está pagada la orden o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: "orden",
    headerName: "Ver Orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">Ver Orden</Link>
        </NextLink>
      );
    },
  },
];

// const rows = [
//   { id: 1, paid: true, fullname: "Axel Jimenez" },
//   { id: 2, paid: false, fullname: "Karla Gomez" },
//   { id: 3, paid: true, fullname: "Pablo Granciano" },
//   { id: 4, paid: false, fullname: "Pinto Hernandez" },
//   { id: 5, paid: true, fullname: "Enrique Jimenez" },
//   { id: 6, paid: true, fullname: "Elon Musk" },
// ];

interface Props{
  orders: IOrder[];
}



const HistoryPage: NextPage<Props> = ({orders}) => {

  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id
  }))

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del clientes"
    >
      <Typography variant="h1" component="h1">
        Historial de Ordenes
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

export const getServerSideProps: GetServerSideProps = async ({req}) => {
 
  const session: any = await getSession({req});

  if(!session){
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false
      }
    }
  }

  const orders = await dbOrders.getOrderByUser(session.user._id)

  return {
    props: {
      orders
    }
  }
}




export default HistoryPage;
