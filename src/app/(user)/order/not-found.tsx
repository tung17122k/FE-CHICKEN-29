import Link from 'next/link'
import { Box, Typography, Button, Container, Stack } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function NotFound() {
    return (
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
            <Box>
                <ShoppingCartIcon color="action" sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    Giỏ hàng trống
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Giỏ hàng hiện tại của bạn đang trống. Hãy quay lại trang chủ để tiếp tục mua sắm.
                </Typography>

                <Stack direction="row" justifyContent="center">
                    <Link href="/" passHref>
                        <Button variant="contained" color="primary">
                            Quay lại trang chủ
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
    )
}
