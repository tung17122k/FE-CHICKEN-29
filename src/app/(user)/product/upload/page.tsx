import UploadTab from "@/components/product/upload.tab"
import { CategoryProvider } from "@/context/category.context"
import { sendRequest } from "@/utils/api"
import { Container } from "@mui/material"


const UploadPage = async () => {

    const res = await sendRequest<IBackendRes<ICategory[]>>({
        url: `http://localhost:8080/category`,
        method: 'GET',
    })
    // console.log("res", res);


    return (
        <Container>
            <CategoryProvider categories={res.data!}>
                <UploadTab />
            </CategoryProvider>
        </Container>
    )
}

export default UploadPage