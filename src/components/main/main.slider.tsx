'use client'

import { Badge, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Slide, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ModalMenu from "../modal/modal.menu";
import Link from "next/link";
import { sendRequestDefault } from "@/utils/api";
import { useSession } from 'next-auth/react';
import { useToast } from "@/utils/toast";
import ModalInput from "../modal/modal.input";


interface IProps {
    data: IProductCategory[],
    title: string,

}

const MainSlider = (props: IProps) => {
    // console.log("check data", props.data);
    const { data, title } = props
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modalInputOpen, setModalInputOpen] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<IProductCategory>()
    // console.log("selected", selectedProduct);



    const [item, setItem] = useState<IProductCategory | undefined>()
    const { data: session } = useSession();
    const toast = useToast()

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

    const handleSelectProduct = async (item: IProductCategory) => {
        setModalInputOpen(true)
        setSelectedProduct(item)
        // console.log("item", item);
    }

    const handleSubmitInputValue = async (quantity: number) => {
        const res = await sendRequestDefault<IBackendRes<ICart>>({
            url: `http://localhost:8080/cart`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
            body: {
                product: [
                    { productId: selectedProduct?.id, quantity: quantity }
                ]
            }
        })
        // console.log("res", res);
        if (res.data) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <h2 >{title}</h2>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }} >
                {data.map(item => {
                    return (
                        <Grid item xs={6} md={4} key={item.id}>
                            <Card sx={{ position: 'relative', borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={`http://localhost:3000/api?product=${item?.image}`}
                                    alt={item.name}
                                    onClick={() => handleClickItem(item)}
                                />
                                <CardContent sx={{ p: 1 }}>
                                    <Typography variant="body2" fontWeight="bold" noWrap>
                                        <Link href={`/product/${item.id}?product=${item.image}`} style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}>{item?.name}</Link>
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                                        <Typography variant="body2" color="error">
                                            {item?.price.toLocaleString('vi-VN') + 'đ'}
                                        </Typography>
                                        <IconButton size="small" sx={{ backgroundColor: '#ff6600', color: 'white' }} onClick={() => handleSelectProduct(item)}>
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
                modalOpen && <ModalMenu item={item} modalOpen={modalOpen} handleCloseModal={handleCloseModal} handleSubmitInputValue={handleSubmitInputValue} />
            }
            {
                modalInputOpen && <ModalInput modalInputOpen={modalInputOpen} setModalInputOpen={setModalInputOpen} onSubmit={handleSubmitInputValue} />
            }
        </div>
    )
}

export default MainSlider;