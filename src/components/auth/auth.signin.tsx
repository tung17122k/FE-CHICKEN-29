'use client'
// https://next-auth.js.org/configuration/pages

import { Alert, AlertTitle, Avatar, Box, Button, Grid, IconButton, InputAdornment, Paper, Snackbar, SnackbarCloseReason, TextField } from "@mui/material"
import Divider from '@mui/material/Divider';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { getProviders, signIn } from "next-auth/react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import { useRouter } from "next/navigation";




const AuthSignIn = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
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

        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })
        // console.log("res", res);
        if (!res?.error) {
            router.push("/")
        } else {
            setOpen(true)
            setErrorMessage(res?.error)
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
                            }}>SignIn</h2>
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
                            <Button type="submit" fullWidth variant="contained" onClick={() => handleSubmit()} sx={{
                                bgcolor: "orange.main"
                            }}>
                                Signin
                            </Button>
                            <Divider>Or using</Divider>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                marginBottom: "20px"
                            }}>
                                <Avatar onClick={() => { signIn("github") }} sx={{ bgcolor: "#fb9555", cursor: "pointer" }} >
                                    <GitHubIcon />
                                </Avatar>
                                <Avatar sx={{ bgcolor: "orange.main", cursor: "pointer" }} onClick={() => { signIn("google") }}>
                                    <GoogleIcon />
                                </Avatar>
                            </Box>
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

export default AuthSignIn