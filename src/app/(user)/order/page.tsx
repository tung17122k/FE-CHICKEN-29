import OrderForm from "@/components/order/order.form";
import { sendRequestDefault } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound } from "next/navigation";

const OrderPage = async () => {
    const session = await getServerSession(authOptions);
    const res = await sendRequestDefault<IBackendRes<ICartResponse>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}cart`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
    })


    if (res.data?.cartDetails.length === 0) {
        notFound();
    }


    return (
        <Container sx={{
            mt: 2
        }}>
            <OrderForm data={res.data?.cartDetails!} />
        </Container>
    )
}

export default OrderPage;