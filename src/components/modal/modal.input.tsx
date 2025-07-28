import { Box, Button, Modal, Slide, TextField, Typography } from "@mui/material"
import { orange } from "@mui/material/colors"
import { useState } from "react"

interface IProps {
    modalOpen: boolean,

    setModalInputOpen: () => void,

    onSubmit: (value: number) => void
}


const ModalInput = (props: any) => {
    const { modalInputOpen, setModalInputOpen, onSubmit } = props

    const [quantity, setQuantity] = useState<number>(1);

    const handleSubmitQuantity = () => {
        onSubmit(quantity);
        setModalInputOpen(false);
        setQuantity(1);
    }

    return (
        <div>
            <Modal open={modalInputOpen} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Slide direction="up" in={modalInputOpen} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            // position: 'fixed', 
                            bottom: 0,
                            width: { xs: '60%', md: '20%' },
                            maxHeight: '90%',
                            bgcolor: 'background.paper',
                            borderRadius: '16px ',
                            p: 2,
                            overflowY: 'auto',
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}
                        >Thêm sản phầm vào giỏ hàng</Typography>
                        <TextField sx={{
                            display: 'flex',
                        }} label="Số lượng" variant="standard" placeholder="Nhập số lượng muốn mua" type="number" name="quantity" defaultValue={1} onChange={(e) => setQuantity(Number(e.target.value))} />
                        <Box mt={2} display="flex" justifyContent="space-between" >
                            <Button variant="outlined" onClick={() => setModalInputOpen()} sx={{
                                width: {
                                    xs: '20%',
                                    md: '100px',
                                },
                                height: {
                                    xs: '20%',
                                    sm: '50%',
                                }
                            }}>Đóng</Button>
                            <Button variant="outlined" color="warning" sx={{
                                width: {
                                    xs: '20%',
                                    md: '100px',
                                },
                                height: {
                                    xs: '20%',
                                    md: '50%',
                                }

                            }}
                                onClick={() => handleSubmitQuantity()}
                            >Thêm</Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </div>

    )
}
export default ModalInput
