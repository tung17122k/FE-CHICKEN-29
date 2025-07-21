'use client'

import { Box, Button, Card, CardContent, CardMedia, Divider, FormControl, Grid, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { sendRequestDefault } from "@/utils/api";
import { useToast } from "@/utils/toast";

interface INewOrder {
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
}


interface IProps {
    data: ICartDetailItem[]
}

const OrderForm = (props: IProps) => {
    const { data: session } = useSession();
    const { data } = props
    // console.log("session", session?.user);
    const toast = useToast()

    const [infor, setInfor] = useState<INewOrder>({
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
    });

    useEffect(() => {
        if (session?.user) {
            setInfor({
                receiverName: session.user.name || '',
                receiverAddress: session.user.address || '',
                receiverPhone: session.user.phone || '',
            });
        }
    }, [session]);

    const handlePlaceOrder = async (infor: INewOrder) => {
        const res = await sendRequestDefault<IBackendRes<IOrderResponse>>({
            url: `http://localhost:8080/checkout`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
            body: infor
        })
        if (res.data) {
            toast.success("Đặt hàng thành công!")
        } else {
            toast.error("Đã có lỗi xảy ra!")
        }

    }



    const totalPrice = data.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (

        <>
            <Box p={2} maxWidth="lg" mx="auto">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Đơn hàng của bạn
                        </Typography>

                        <Stack spacing={2}>
                            {data.map((item) => (
                                <Card key={item.id} sx={{ display: "flex", alignItems: "center" }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 80, height: 80, objectFit: "cover" }}
                                        image={`http://localhost:3000/api?product=${item?.product.image}`}
                                        alt={item.product.name}
                                    />
                                    <CardContent sx={{ flex: 1, p: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {item.product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.quantity} x {item.price.toLocaleString()}₫
                                        </Typography>
                                        <Typography variant="body2" color="primary">
                                            Thành tiền: {(item.price * item.quantity).toLocaleString()}₫
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Box textAlign="right">
                            <Typography variant="subtitle1" fontWeight={700}>
                                Tổng cộng: {totalPrice.toLocaleString()}₫
                            </Typography>
                        </Box>
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Thông tin người nhận
                        </Typography>

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="name">Tên người nhận</InputLabel>
                            <Input
                                id="name"
                                value={infor.receiverName}
                                onChange={(e) => setInfor(pre => ({ ...pre, receiverName: e.target.value }))}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="address">Địa chỉ</InputLabel>
                            <Input
                                id="address"
                                value={infor.receiverAddress}
                                onChange={(e) => setInfor(pre => ({ ...pre, receiverAddress: e.target.value }))}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <HomeIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
                            <Input
                                id="phone"
                                value={infor.receiverPhone}
                                onChange={(e) => setInfor(pre => ({ ...pre, receiverPhone: e.target.value }))}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LocalPhoneIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: 5,
                                color: 'orange.main',
                                border: '1px solid',
                                borderColor: 'orange.main',
                            }}
                            onClick={() => handlePlaceOrder(infor)}
                        >
                            Xác nhận thanh toán
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default OrderForm