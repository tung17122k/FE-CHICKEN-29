'use client'

import { useState } from "react"
import CartHeader from "./cart.header"
import CartSlider from "./cart.slider"


interface IProps {
    data: ICartResponse
}

const CartWrapper = (props: IProps) => {
    const { data } = props
    const [cartDetails, setCartDetails] = useState<ICartDetailItem[]>(data.cartDetails);

    return (
        <>
            <CartHeader sum={data.sum || 0} cartDetails={cartDetails} />
            <CartSlider cart={data!} setCartDetails={setCartDetails} cartDetails={cartDetails} />
        </>
    )
}
export default CartWrapper