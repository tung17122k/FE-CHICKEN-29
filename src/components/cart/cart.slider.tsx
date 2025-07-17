'use client'
import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import AddIcon from '@mui/icons-material/Add';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';


interface IProps {
    cart: ICartResponse
}

const CartSlider = (props: IProps) => {
    const theme = useTheme();
    const [quantity, setQuantity] = useState<number>(1)
    const cart = props.cart


    return (
        <>
            {
                cart.cartDetails.map(item => {
                    return (
                        <Card sx={{ display: 'flex', marginBottom: '20px' }} key={item.id}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151, height: 151, objectFit: "cover" }}
                                image={`http://localhost:3000/api?product=${item?.product.image}`}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5" sx={{
                                        fontWeight: '500'
                                    }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ color: 'orange.main', fontWeight: '500' }}
                                    >
                                        {item.price}.đ
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton sx={{
                                        color: "orange.main"
                                    }}>
                                        {theme.direction === 'rtl' ? <RemoveIcon /> : <RemoveIcon />}
                                    </IconButton>
                                    <TextField
                                        type="number"
                                        // value={quantity}
                                        // onChange={handleChange}
                                        inputProps={{ min: 1 }}
                                        defaultValue={item.quantity}
                                        size="small"
                                        sx={{
                                            width: 60,
                                            mx: 1,
                                            '& input': {
                                                textAlign: 'center',
                                                p: 0.5,
                                            },
                                        }}
                                    />
                                    <IconButton sx={{
                                        color: "orange.main"
                                    }}>
                                        {theme.direction === 'rtl' ? <AddIcon /> : <AddIcon />}
                                    </IconButton>
                                </Box>
                            </Box>

                        </Card>
                    )
                })
            }

        </>
    )
}

export default CartSlider