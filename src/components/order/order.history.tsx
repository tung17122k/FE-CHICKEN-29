'use client'

import { Avatar, Box, Card, CardContent, CardMedia, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
interface IProps {
    data: any
}

const formatCurrency = (amount: any) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const OrderHistory = (props: IProps) => {
    const { data } = props;
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Lịch Sử Đơn Hàng
            </Typography>

            {data.map((order: any) => (
                <Card key={order.id} sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Mã đơn hàng: #{order.id}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Chip
                                label={`Trạng thái: ${order.status}`}
                                color="warning"
                                icon={<HourglassEmptyIcon />}
                                sx={{
                                    mr: 1,
                                    mb: {
                                        xs: 1,
                                        md: 0
                                    }
                                }}
                            />
                            <Chip
                                label={`Thanh toán: ${order.paymentStatus === 'PAYMENT_UNPAID' ? 'Chưa thanh toán' : 'Đã thanh toán'
                                    }`}
                                color={order.paymentStatus === 'PAYMENT_UNPAID' ? 'error' : 'success'}
                                icon={
                                    order.paymentStatus === 'PAYMENT_UNPAID' ? <CreditCardIcon /> : <PaidIcon />
                                }
                            />
                        </Box>

                        <Typography variant="body1">
                            <strong>Người nhận:</strong> {order.receiverName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>SĐT:</strong> {order.receiverPhone}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Địa chỉ:</strong> {order.receiverAddress}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Phương thức thanh toán: {order.paymentMethod?.name}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" gutterBottom>
                            Sản phẩm:
                        </Typography>

                        <Grid container spacing={2}>
                            {order.orderDetails.map((item: any) => (
                                <Grid item xs={12} sm={6} key={item.id}>
                                    <Card variant="outlined" sx={{ display: 'flex' }}>
                                        <Avatar
                                            src={`http://localhost:3000/api?product=${item.product.image}`}
                                            variant="rounded"
                                            sx={{ width: 80, height: 80, m: 1 }}
                                        />
                                        <Box sx={{ p: 1, flex: 1 }}>
                                            <Typography variant="subtitle1">{item.product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.product.description}
                                            </Typography>
                                            <Typography variant="body2">
                                                SL: {item.quantity} × {formatCurrency(item.price)}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" align="right">
                            Tổng tiền: {formatCurrency(order.totalPrice)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default OrderHistory;