import { Badge, Container } from "@mui/material";
import CartSlider from "@/components/cart/cart.slider";
import { sendRequestDefault } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CartHeader from "@/components/cart/cart.header";
import { useState } from "react";
import CartWrapper from "@/components/cart/cart.wrapper";





const CartPage = async () => {

    const session = await getServerSession(authOptions);
    // console.log("session", session);
    const cart = await sendRequestDefault<IBackendRes<ICartResponse>>({
        url: `http://localhost:8080/cart`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    })


    return (
        <Container>
            <CartWrapper data={cart.data!} />
        </Container>
    )
}

export default CartPage;