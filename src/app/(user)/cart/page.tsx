import { Badge, Box, Container, Typography } from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartSlider from "@/components/cart/cart.slider";
import { sendRequestDefault } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';




const CartPage = async () => {

    const session = await getServerSession(authOptions);
    // console.log("session", session);


    const cart = await sendRequestDefault<IBackendRes<ICartResponse>>({
        url: `http://localhost:8080/cart`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    })


    // console.log("cart", cart.data?.cartDetails);




    return (
        <Container>
            <Box mt={2} display="flex" alignItems={"center"} gap={2}>
                <h2 style={{
                }}>Giỏ hàng</h2>
                <Badge badgeContent={cart.data?.sum} sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: 'orange.main',
                        color: "white"
                    }
                }
                }>
                    <ShoppingCartIcon />
                </Badge>


            </Box>
            <CartSlider cart={cart.data!} />
        </Container>
    )
}

export default CartPage;