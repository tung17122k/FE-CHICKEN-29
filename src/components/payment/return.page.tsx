'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VNPayReturnPage = () => {
    const [message, setMessage] = useState('Đang xử lý thanh toán...');

    const fetchVNPayResult = async () => {
        const query = window.location.search;
        console.log("query", query);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}vnpay_return${query}`);
            // console.log("response", response.data.responseCode);

            if (response.data.responseCode === '00') {
                setMessage('Thanh toán thành công!');
            } else {
                setMessage('Thanh toán thất bại hoặc bị huỷ.');
            }
        } catch (error) {
            console.error("Lỗi:", error);
            setMessage('Lỗi khi xử lý kết quả thanh toán.');
        }
    };

    useEffect(() => {
        fetchVNPayResult();
    }, []);

    return (
        <Box display={'flex'} flexDirection='column' alignItems='center' justifyContent='center' sx={{ textAlign: 'center' }}>
            <h1 className="text-3xl font-bold">Kết quả thanh toán</h1>
            {message === 'Thanh toán thành công!' ? (
                <>
                    <CheckCircleIcon sx={{
                        color: 'green',
                        width: 50,
                        height: 50,
                    }}></CheckCircleIcon>
                </>
            ) : (
                <></>
            )}
            <p className="mt-4">{message}</p>
        </Box>
    );
};

export default VNPayReturnPage;
