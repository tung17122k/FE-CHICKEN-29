

import MainSlider from '@/components/main/main.slider';
import * as React from 'react';
import { Container } from "@mui/material";
import { sendRequest } from '@/utils/api';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { switchCategory } from '@/utils/switch-case/category.switchCase';





export default async function HomePage() {
  const session = await getServerSession(authOptions)



  const friedChicken = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    queryParams: { category: "FRIED_CHICKEN" }
  })
  console.log("friedChicken", friedChicken);



  const lightFood = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    queryParams: {
      category: 'LIGHT_FOOD'
    }

  })
  const drinks = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    queryParams: {
      category: 'DRINKS'
    }
  })
  const burger = await sendRequest<IBackendRes<IProductCategory[]>>({
    url: `http://localhost:8080/product`,
    method: 'GET',
    queryParams: {
      category: 'BURGER'
    }
  })

  const categoryList = await sendRequest<IBackendRes<ICategory[]>>({
    url: `http://localhost:8080/category`,
    method: 'GET',
  })
  // console.log("drink", drinks.data![0].categoryId);






  const handleMapCategory = (data: IProductCategory[]) => {
    const categoryId = data[0].categoryId
    for (let i = 0; i < categoryList.data?.length!; i++) {
      if (categoryId === categoryList.data![i].id) {
        return switchCategory(categoryList.data![i].name)
      }
    }
    return "Không xác định"
  }

  // console.log(">>>check function", handleMapCategory(drinks.data!));



  return (
    <div>
      <Container sx={{ paddingBottom: '70px' }}>
        <MainSlider data={friedChicken?.data ? friedChicken?.data : []}
          title={handleMapCategory(friedChicken.data!)}
        />
        <MainSlider data={lightFood?.data ? lightFood?.data : []} title={handleMapCategory(lightFood.data!)} />
        <MainSlider data={drinks?.data ? drinks?.data : []} title={handleMapCategory(drinks.data!)} />
        <MainSlider data={burger?.data ? burger?.data : []} title={handleMapCategory(burger.data!)} />
      </Container>

    </div>
  );
}
