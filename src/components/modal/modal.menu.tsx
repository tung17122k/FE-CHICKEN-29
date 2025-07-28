import { Box, Button, Modal, Slide, Typography } from "@mui/material"

interface IProps {
    modalOpen: boolean,
    handleCloseModal: () => void,
    item?: IProductCategory,
    handleSubmitInputValue: (quantity: number) => Promise<void>
}


const ModalMenu = (props: IProps) => {
    const { item, modalOpen, handleCloseModal, handleSubmitInputValue } = props

    return (
        <div>
            <Modal open={modalOpen} >
                <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            position: {
                                xs: 'fixed',
                                md: 'absolute',
                            },
                            bottom: {
                                xs: 0,
                                md: '50%',
                            },
                            left: {
                                xs: 0,
                                md: '25%',
                            },
                            width: {
                                xs: '100%',
                                md: '50%',
                            },
                            maxHeight: '90%',
                            bgcolor: 'background.paper',
                            borderRadius: {
                                xs: '16px 16px 0 0',
                                md: 2,
                            },
                            p: 2,
                            overflowY: 'auto',
                        }}
                    >
                        <Box
                            component="img"
                            src={`http://localhost:3000/api?product=${item?.image}`}
                            alt="food"
                            sx={{
                                width: '100%',
                                borderRadius: 2,
                                mb: 2,
                                objectFit: 'cover',
                                height: 180,
                            }}
                        />
                        <Typography variant="h6">{item?.name}</Typography>
                        <Typography color="error" fontWeight="bold">{item?.price.toLocaleString('vi-VN') + 'đ'}</Typography>
                        <Typography mt={1} variant="body2" color="text.secondary">
                            {item?.description}
                        </Typography>
                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button variant="outlined" onClick={() => handleCloseModal()}>Đóng</Button>
                            <Button variant="contained" color="warning" onClick={() => { handleSubmitInputValue(1); handleCloseModal() }}>Thêm vào giỏ hàng</Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </div>

    )
}
export default ModalMenu
