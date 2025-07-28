'use client'
import MainSlider from '@/components/main/main.slider';
import { sendRequest } from '@/utils/api';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
const SearchWrapper = (props: any) => {

    const searchParams = useSearchParams();
    const search = searchParams.get('query')
    console.log("search", search);
    const [product, setProduct] = useState<IProductCategory[]>([]);

    const handleSearch = async () => {
        const res = await sendRequest<IBackendRes<IProductCategory[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}product`,
            method: 'GET',
            queryParams: { query: search }
        })

        console.log("res", res.data);
        setProduct(res.data || []);
    }

    useEffect(() => {
        handleSearch()
    }, [search])



    return (
        <>
            <MainSlider data={product || []} title={`Tìm kiếm: ${search}`} />
        </>
    )
}

export default SearchWrapper;