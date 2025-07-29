'use client'
// https://next-auth.js.org/configuration/pages

import { Alert, AlertTitle, Avatar, Box, Button, Grid, IconButton, InputAdornment, Paper, Snackbar, SnackbarCloseReason, TextField } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendRequestDefault } from "@/utils/api";




const AuthVerify = () => {
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')

    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [isErrorCode, setIsErrorCode] = useState(false)

    const [errorEmail, setErrorEmail] = useState('')
    const [errorCode, setErrorCode] = useState('')

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const router = useRouter()

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    const handleVerify = async () => {
        setIsErrorEmail(false)
        setIsErrorCode(false)
        setErrorEmail('')
        setErrorCode('')
        setSuccessMessage('')
        setErrorMessage('')

        if (!email) {
            setIsErrorEmail(true)
            setErrorEmail('Email is required.')
            return
        }

        if (!code) {
            setIsErrorCode(true)
            setErrorCode('Verification code is required.')
            return
        }

        const res = await sendRequestDefault<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}verify`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { email, code },
        })

        if (res && !res.error) {
            setSuccessMessage('Email verified successfully!')
            setOpen(true)
            setTimeout(() => router.push('/auth/signin'), 2000)
        } else {
            setErrorMessage(res?.error as string)
            setOpen(true)
        }
    }


    return (
        <Box>
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Grid item xs={10} sm={8} md={4} boxShadow={1} p={3}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        rowGap={2}
                    >
                        <Avatar sx={{ bgcolor: '#fb9555' }}>
                            <LockIcon />
                        </Avatar>
                        <h2 style={{ margin: 0, color: '#fb9555' }}>Verify Your Email</h2>

                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={isErrorEmail}
                            helperText={errorEmail}
                        />

                        <TextField
                            label="Verification Code"
                            fullWidth
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            error={isErrorCode}
                            helperText={errorCode}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleVerify()
                            }}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ bgcolor: 'orange.main' }}
                            onClick={handleVerify}
                        >
                            Verify
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={successMessage ? 'success' : 'error'}
                >
                    <AlertTitle>
                        {successMessage || errorMessage || 'Đã xảy ra lỗi'}
                    </AlertTitle>
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AuthVerify