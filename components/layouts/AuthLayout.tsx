import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";

interface Props {
  title: string;
  children: any;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>

      <main>
        <Box display="flex" justifyContent="center" alignItems="center"></Box>
      </main>
    </>
  );
};
