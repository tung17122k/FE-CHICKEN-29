// https://nextjs.org/docs/13/app/api-reference/functions/next-response

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {

    const url = new URL(request.url)
    const { searchParams } = new URL(url)
    console.log("searchParams", searchParams);

    const imageName = searchParams.get('image')


    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/product/${imageName}`)
}