'use client'

import { Box, Button, Card, CardContent, CardMedia, Divider, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material"
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
    paymentMethod: 'BANKING' | 'COD',
    bankCode: string
}


interface IProps {
    data: ICartDetailItem[]
}

const paymentMethod = [
    { value: 'BANKING', label: 'Chuyển khoản ngân hàng (VNPay)' },
    { value: 'COD', label: 'Thanh toán khi nhận hàng (COD)' }
]

const OrderForm = (props: IProps) => {
    const { data: session } = useSession();
    const { data } = props
    // console.log("session", session?.user);
    const toast = useToast()

    const [infor, setInfor] = useState<INewOrder>({
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
        paymentMethod: 'BANKING',
        bankCode: ''
    });

    useEffect(() => {
        if (session?.user) {
            setInfor({
                receiverName: session.user.name || '',
                receiverAddress: session.user.address || '',
                receiverPhone: session.user.phone || '',
                paymentMethod: 'BANKING',
                bankCode: ''
            });
        }
    }, [session]);
    console.log("infor", infor);

    const handlePlaceOrder = async (infor: INewOrder) => {
        console.log("infor", infor);

        const res = await sendRequestDefault<IBackendRes<IOrderResponse>>({
            url: `http://localhost:8080/checkout`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
            body: infor
        })
        // console.log("res", res);

        if (res.data) {
            toast.success("Đặt hàng thành công!");
            if (res.data.vnpUrl !== null) {
                setTimeout(() => {
                    window.location.href = res.data!.vnpUrl as string;
                }, 1000)
            }
        } else {
            toast.error("Đã có lỗi xảy ra!")
        }
    }





    const totalPrice = Array.isArray(data)
        ? data.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    return (

        <>
            <Box p={2} maxWidth="lg" mx="auto">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Đơn hàng của bạn
                        </Typography>

                        <Stack spacing={2}>
                            {(data ?? []).map((item) => (
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

                        <TextField
                            sx={{
                                mt: 3
                            }}
                            select
                            label="Phương thức thanh toán"
                            fullWidth
                            variant="standard"
                            value={infor.paymentMethod}
                            onChange={(e) => {
                                setInfor({ ...infor, paymentMethod: e.target.value as 'BANKING' | 'COD' })
                            }}
                        >
                            {paymentMethod.map((option: any) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>


                        {infor.paymentMethod === 'BANKING' && (
                            <FormControl sx={{ m: 1 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Chọn Phương thức thanh toán:
                                </Typography>
                                <RadioGroup
                                    defaultValue="VNPAYQR"
                                    name="bankCode"
                                    onChange={(e) => {
                                        setInfor({ ...infor, bankCode: e.target.value });
                                    }}
                                >
                                    <FormControlLabel value="" control={<Radio />} label="Cổng thanh toán VNPAYQR" />
                                    <FormControlLabel value="VNPAYQR" control={<Radio />} label="Thanh toán qua ứng dụng hỗ trợ VNPAYQR" />
                                    <FormControlLabel value="VNBANK" control={<Radio />} label="Thanh toán qua ATM - Tài khoản ngân hàng nội địa" />
                                    <FormControlLabel value="INTCARD" control={<Radio />} label="Thanh toán qua thẻ quốc tế" />
                                </RadioGroup>
                            </FormControl>
                        )}
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: {
                                    xs: 1,
                                    md: 5,
                                },
                                mb: 10,
                                color: 'orange.main',
                                border: '1px solid',
                                borderColor: 'orange.main',
                            }}
                            onClick={() => {
                                handlePlaceOrder(infor);
                            }
                            }
                        >
                            Xác nhận đặt hàng
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default OrderForm