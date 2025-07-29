'use client'
// https://next-auth.js.org/configuration/pages

import { Alert, AlertTitle, Avatar, Box, Button, Grid, IconButton, InputAdornment, Paper, Snackbar, SnackbarCloseReason, TextField } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getProviders, signIn } from "next-auth/react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendRequestDefault } from "@/utils/api";




const AuthSignUp = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState<boolean>(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("")
    const router = useRouter()

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = async () => {
        setIsErrorEmail(false);
        setIsErrorPassword(false);
        setErrorEmail("");
        setErrorPassword("");
        setIsErrorConfirmPassword(false)
        setErrorConfirmPassword("")

        if (!email) {
            setIsErrorEmail(true);
            setErrorEmail("Email is not empty.")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty.")
            return;
        }
        if (!confirmPassword) {
            setIsErrorConfirmPassword(true)
            setErrorConfirmPassword("Confirm password is not empty.")
            return;
        }
        if (password !== confirmPassword) {
            setIsErrorConfirmPassword(true)
            setErrorConfirmPassword("Passwords do not match.")
            return;
        }

        // const res = await signIn("credentials", {
        //     email: email,
        //     password: password,
        //     redirect: false
        // })

        const res = await sendRequestDefault<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        })
        // console.log("res", res);
        if (!res?.error) {
            router.push("/auth/verify")
        } else {
            setOpen(true)
            setErrorMessage(res?.error as string)
        }
    }

    return (
        <Box
        >
            <Grid container sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <Grid boxShadow={1} item
                    xs={9}
                    sm={8}
                    md={5}
                    lg={4}>

                    <div style={{ margin: "0px 20px" }}>
                        <Link href={"/"}>
                            <ArrowBackIcon style={{ marginTop: "10px" }}></ArrowBackIcon>
                        </Link>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            rowGap: "20px",
                        }}>
                            <Avatar sx={{ bgcolor: "#fb9555", marginTop: "20px" }} >
                                <LockIcon />
                            </Avatar>
                            <h2 style={{
                                color: "#fb9555", margin: 0
                            }}>SignUp</h2>
                            <TextField label="Email" variant="outlined" fullWidth name="email" onChange={(e) => setEmail(e.target.value)} type="email" required error={isErrorEmail} helperText={errorEmail} />

                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                required
                                onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit() } }}
                                error={isErrorPassword}
                                helperText={errorPassword}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" sx={{ bgcolor: "transparent" }}>
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                sx={{
                                                    bgcolor: "transparent"
                                                }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>

                                }} />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                onKeyDown={(e) => { if (e.key === 'Enter') { handleSubmit() } }}
                                error={isErrorConfirmPassword}
                                helperText={errorConfirmPassword}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" sx={{ bgcolor: "transparent" }}>
                                            <IconButton
                                                aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                                                onClick={handleClickShowConfirmPassword}
                                                sx={{ bgcolor: "transparent" }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                            <Button type="submit" fullWidth variant="contained" onClick={() => handleSubmit()} sx={{
                                bgcolor: "orange.main",
                                marginBottom: "20px",
                            }}>
                                Signup
                            </Button>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                >
                    <AlertTitle>{errorMessage}</AlertTitle>

                </Alert>
            </Snackbar>
        </Box>

    )
}

export default AuthSignUp