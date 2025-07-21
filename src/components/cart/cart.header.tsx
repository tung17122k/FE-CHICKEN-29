'use client'

import { Badge, Box, Button } from "@mui/material"
import { useRouter } from "next/navigation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { sendRequestDefault } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useToast } from "@/utils/toast";


interface IProps {
    sum: number,
    cartDetails: ICartDetailItem[]
}

const CartHeader = (props: IProps) => {
    const { sum, cartDetails } = props
    const router = useRouter()
    const { data: session } = useSession();
    const toast = useToast()

    const handleUpdateCart = async (cartDetail: ICartDetailItem[]) => {
        console.log("cartDetail check", cartDetail);
        const refinedCartDetails = cartDetail.map(item => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity
        }));

        const res = await sendRequestDefault<IBackendRes<ICart>>({
            url: `http://localhost:8080/cart`,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
            body: {
                cartDetails: refinedCartDetails
            }
        })
        if (res.data) {
            router.push('/order');
            toast.success('Cập nhật giỏ hàng thành công!')
        } else {
            toast.error(res.message)
        }


    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Box mt={2} display="flex" alignItems={"center"} gap={2}>
                <h2 style={{
                }}>Giỏ hàng</h2>
                <Badge badgeContent={sum} sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: 'orange.main',
                        color: "white"
                    }
                }
                }>
                    <ShoppingCartIcon />
                </Badge>
            </Box>
            <Button sx={{
                marginTop: 2
            }}
                variant="outlined"
                onClick={() => {
                    handleUpdateCart(cartDetails)
                }}
            >Thanh toán
            </Button>
        </div>
    )
}

export default CartHeader