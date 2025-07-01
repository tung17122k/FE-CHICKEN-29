'use client'

import { Badge, Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


interface IProps {
    data: IProductCategory[],
    title: String
}

const MainSlider = (props: IProps) => {
    console.log("check data", props.data);
    const data = props?.data
    const title = props?.title
    return (
        <div>
            <h2 >{title}</h2>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }} >
                {data.map(item => {
                    return (
                        <Grid item xs={6} md={4} >
                            <Card sx={{ position: 'relative', borderRadius: 2 }}>
                                <Badge
                                    badgeContent={1}
                                    color="primary"
                                    sx={{ position: 'absolute', top: 12, right: 12 }}
                                />
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/product/${item?.image}`}
                                    alt={item.name}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" fontWeight="bold" noWrap>
                                        {item?.name}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                                        <Typography variant="body2" color="error">
                                            {item?.price.toLocaleString('vi-VN') + 'đ'}
                                        </Typography>
                                        <IconButton size="small" sx={{ backgroundColor: '#ff6600', color: 'white' }}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    )
                })}
            </Grid>
        </div>
    )
}

export default MainSlider;