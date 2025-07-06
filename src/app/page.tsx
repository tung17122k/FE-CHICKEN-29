

import MainSlider from '@/components/main/main.slider';
import * as React from 'react';
import { Container } from "@mui/material";
import { sendRequest } from '@/utils/api';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions)



  const friedChicken = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJzYW5raW5nMTcxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJhY2NvdW50VHlwZSI6IlNZU1RFTSIsIm5hbWUiOiIiLCJyb2xlSWQiOjIsInBob25lIjoiIiwiYWRkcmVzcyI6IiIsImlhdCI6MTc1MTM0Nzg1MCwiZXhwIjoxNzUxOTUyNjUwfQ.1BTTXC-Pz4YRPpNNMsPJEJYYUi25hTICtnjkmTJgpUs'
    },
    queryParams: { category: "FRIED_CHICKEN" }
  })


  const lightFood = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJzYW5raW5nMTcxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJhY2NvdW50VHlwZSI6IlNZU1RFTSIsIm5hbWUiOiIiLCJyb2xlSWQiOjIsInBob25lIjoiIiwiYWRkcmVzcyI6IiIsImlhdCI6MTc1MTM0Nzg1MCwiZXhwIjoxNzUxOTUyNjUwfQ.1BTTXC-Pz4YRPpNNMsPJEJYYUi25hTICtnjkmTJgpUs'
    },
    queryParams: {
      category: 'LIGHT_FOOD'
    }

  })
  const drinks = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJzYW5raW5nMTcxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJhY2NvdW50VHlwZSI6IlNZU1RFTSIsIm5hbWUiOiIiLCJyb2xlSWQiOjIsInBob25lIjoiIiwiYWRkcmVzcyI6IiIsImlhdCI6MTc1MTM0Nzg1MCwiZXhwIjoxNzUxOTUyNjUwfQ.1BTTXC-Pz4YRPpNNMsPJEJYYUi25hTICtnjkmTJgpUs'
    },
    queryParams: {
      category: 'DRINKS'
    }
  })
  const burger = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJzYW5raW5nMTcxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJhY2NvdW50VHlwZSI6IlNZU1RFTSIsIm5hbWUiOiIiLCJyb2xlSWQiOjIsInBob25lIjoiIiwiYWRkcmVzcyI6IiIsImlhdCI6MTc1MTM0Nzg1MCwiZXhwIjoxNzUxOTUyNjUwfQ.1BTTXC-Pz4YRPpNNMsPJEJYYUi25hTICtnjkmTJgpUs'
    },
    queryParams: {
      category: 'BURGER'
    }
  })



  return (
    <div>
      <Container sx={{ paddingBottom: '70px' }}>
        <MainSlider data={friedChicken?.data ? friedChicken?.data : []} title={'Gà rán'} />
        <MainSlider data={lightFood?.data ? lightFood?.data : []} title={'Đồ ăn nhẹ'} />
        <MainSlider data={drinks?.data ? drinks?.data : []} title={'Đồ uống'} />
        <MainSlider data={burger?.data ? burger?.data : []} title={'Burger'} />
      </Container>

    </div>
  );
}
