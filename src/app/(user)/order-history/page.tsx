import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderHistory from "@/components/order/order.history";
import { sendRequestDefault } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";


const OrderHistoryPage = async () => {

    const session = await getServerSession(authOptions);

    const order = await sendRequestDefault<IBackendRes<IOrderHistory>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}order-history`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    })


    return (
        <Container sx={{ mt: 2 }}>
            <OrderHistory data={order.data} />
        </Container>
    )
}

export default OrderHistoryPage;