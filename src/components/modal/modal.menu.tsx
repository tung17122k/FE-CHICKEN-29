import { Box, Button, Modal, Slide, Typography } from "@mui/material"

interface IProps {
    modalOpen: boolean,
    handleCloseModal: () => void,
    item?: IProductCategory
}


const ModalMenu = (props: IProps) => {
    const { item, modalOpen, handleCloseModal } = props

    return (
        <div>
            <Modal open={modalOpen} >
                <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            width: '100%',
                            maxHeight: '90%',
                            bgcolor: 'background.paper',
                            borderRadius: '16px 16px 0 0',
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
                            <Button variant="contained" color="warning">Thêm vào giỏ hàng</Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </div>

    )
}
export default ModalMenu
