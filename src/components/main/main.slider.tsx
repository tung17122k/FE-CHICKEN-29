'use client'

import { Badge, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Slide, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ModalMenu from "../modal/modal.menu";


interface IProps {
    data: IProductCategory[],
    title: string
}

const MainSlider = (props: IProps) => {
    // console.log("check data", props.data);
    const { data, title } = props
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [item, setItem] = useState<IProductCategory | undefined>()

    const handleOpenModal = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const handleClickItem = (item: IProductCategory) => {
        setItem(item);
        handleOpenModal();
    };

    return (
        <div>
            <h2 >{title}</h2>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }} >
                {data.map(item => {
                    return (
                        <Grid item xs={6} md={4} key={item.id}>
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
                                    onClick={() => handleClickItem(item)}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" fontWeight="bold" noWrap>
                                        {item?.name}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                                        <Typography variant="body2" color="error">
                                            {item?.price.toLocaleString('vi-VN') + 'đ'}
                                        </Typography>
                                        <IconButton size="small" sx={{ backgroundColor: '#ff6600', color: 'white' }} >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            {
                modalOpen && <ModalMenu item={item} modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
            }
        </div>
    )
}

export default MainSlider;