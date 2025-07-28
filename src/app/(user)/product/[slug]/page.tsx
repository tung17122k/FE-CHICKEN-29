'use client'

import Box from "@mui/material/Box"
import Container from "@mui/material/Container";
import { useSearchParams } from "next/navigation";

const DetailProductPage = (props: any) => {
    const { params } = props
    // console.log("params", params);

    const searchParams = useSearchParams();
    const search = searchParams.get('product')
    // console.log('search', search);




    return (
        <Container sx={{
            marginTop: 2
        }}>
            <Box
                sx={{
                    width: "100%",
                    height: {
                        xs: 300,
                        md: 500
                    }
                }}

            >
                <img
                    src={`http://localhost:3000/api?product=${search}`}
                    alt="Description of the image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>


        </Container>
    )
}

export default DetailProductPage