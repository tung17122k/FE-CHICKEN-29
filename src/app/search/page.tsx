import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import SearchWrapper from "./component/search.wrapper";


const SearchPage = async () => {

    return (
        <Container sx={{
            mt: 2
        }}>
            <SearchWrapper />



        </Container>
    )
}

export default SearchPage;