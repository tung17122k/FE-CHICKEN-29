'use client'

import { Alert, AlertTitle, Button, CardMedia, Container, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Snackbar, SnackbarCloseReason, TextField } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { sendRequestDefault } from "@/utils/api";
import { useSession } from 'next-auth/react';
import { useCategory } from "@/context/category.context";
import { useToast } from "@/utils/toast";

interface INewProduct {
    name: string,
    description: string,
    quantity: string,
    price: string,
    categoryId: string,
}

interface IProps {
    setFile: (file: File) => void;
    setPreviewUrl: (url: string) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function InputFileUpload(props: IProps) {
    const { setFile, setPreviewUrl } = props
    return (
        <Button
            sx={{
                backgroundColor: 'orange.main',
            }}
            // onClick={(e) => e.preventDefault()}
            onChange={(e) => {
                const event = e.target as HTMLInputElement
                if (event.files) {
                    // console.log("event", event.files[0]);
                    const selectedFile = event.files[0]
                    setFile(selectedFile)
                    setPreviewUrl(URL.createObjectURL(selectedFile))
                }

            }}
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}





const UploadForm = () => {
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    // const [message, setMessage] = useState<string>("")
    // const [open, setOpen] = useState<boolean>(false)
    const toast = useToast()


    const { data: session } = useSession();
    const { categories } = useCategory()!;



    const [infor, setInfor] = useState<INewProduct>({
        name: "",
        description: "",
        quantity: "",
        price: "",
        categoryId: ""

    });


    const handleUpload = async () => {
        if (!file) {
            // alert("chưa upload hình ảnh")
            return
        }
        const formData = new FormData();
        formData.append("image", file);

        Object.entries(infor).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const res = await sendRequestDefault<IBackendRes<IProductCategory[]>>({
            url: `http://localhost:8080/product`,
            method: 'POST',
            headers: { Authorization: `Bearer ${session?.access_token}` },
            body: formData
        })
        // console.log("res", res);
        if (res.data) {
            // setOpen(true)
            // setMessage("Tạo mới sản phẩm thành công!")
            toast.success("Tạo mới sản phẩm thành công!")

        } else {
            // setOpen(true)

            // setMessage(Array.isArray(res?.message)
            //     ? res.message.map((err) => err.message).join('\n')
            //     : res?.message || 'Validate error');
            let message = Array.isArray(res?.message)
                ? res.message.map((err) => err.message).join('\n')
                : res?.message || 'Validate error'
            toast.error(message)
        }

    }

    // const handleClose = (
    //     event?: React.SyntheticEvent | Event,
    //     reason?: SnackbarCloseReason,
    // ) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };


    return (
        <Container>
            <Grid container spacing={2} >
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 150, width: 150, background: "#ccc" }}>
                        {previewUrl ? (
                            <CardMedia
                                component="img"
                                image={previewUrl}
                                alt={file?.name || 'preview'}
                                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            />
                        ) : <></>}

                    </div>
                    <div >
                        <InputFileUpload setFile={setFile} setPreviewUrl={setPreviewUrl} />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        label="Name"
                        variant="standard"
                        fullWidth margin="dense"
                        value={infor?.name}
                        onChange={(e) => { setInfor({ ...infor, name: e.target.value }) }}
                    />
                    <TextField label="Description" variant="standard" fullWidth margin="dense" value={infor?.description} onChange={(e) => { setInfor({ ...infor, description: e.target.value }) }} />
                    <TextField label="Quantity" variant="standard" fullWidth margin="dense" type="number" value={infor?.quantity} onChange={(e) => { setInfor({ ...infor, quantity: e.target.value }) }} />
                    <FormControl fullWidth margin="dense" variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={infor?.price}
                            onChange={(e) => { setInfor({ ...infor, price: e.target.value }) }}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                    <TextField
                        sx={{
                            mt: 3
                        }}

                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                        value={infor.categoryId}
                        onChange={(e) => {
                            setInfor({ ...infor, categoryId: e.target.value })
                        }}
                    >
                        {categories.map((option: ICategory) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        onClick={() => handleUpload()}
                        disabled={file ? false : true}
                        sx={{
                            mt: 5,
                            color: 'orange.main',
                            border: '1px solid',
                            borderColor: 'orange.main'
                        }}>Create</Button>
                </Grid>
                {/* <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert
                        onClose={handleClose}
                        severity={message === "Tạo mới sản phẩm thành công!" ? `success` : `error`}
                    >
                        <AlertTitle>{message}</AlertTitle>
                    </Alert>
                </Snackbar> */}
            </Grid>
        </Container>
    )
}

export default UploadForm