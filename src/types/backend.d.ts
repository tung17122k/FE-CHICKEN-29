export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IProductCategory {
        "id": number,
        "name": string,
        "price": number,
        "image": string,
        "description": string,
        "quantity": number,
        "sold": number,
        "categoryId": number
    }
    interface ICart {
        "id": number,
        "userId": number,
        "sum": number
    }

    interface ICartDetailItem {
        "id": number,
        "cartId": number,
        "productId": number,
        "quantity": number,
        "price": number,
        "product": IProductCategory
    }

    interface ICartResponse extends ICart {
        cartDetails: ICartDetailItem[]
    }




    interface IOrderData {
        id: number,
        paymentMethod: string,
        paymentRef: null,
        paymentStatus: string,
        receiverAddress: string,
        receiverName: string,
        receiverPhone: string,
        status: string,
        totalPrice: number,
        userId: number
    }

    interface IOrderResponse {
        orderDetails: IOrderData,
        vnpUrl: string | null
    }

    interface IOrderDetail {
        id: number,
        price: number,
        quantity: number,
        productId: number,
        orderId: number,
        product: IProductCategory
    }
    interface IPaymentMethod {
        id: number,
        name: string,
    }

    interface IOrderHistory extends IOrderData {
        orderDetails: IOrderDetail[],
        paymentMethod: IPaymentMethod
    }




    interface ICategory {
        "id": number,
        "name": string,
        "description": string
    }


    interface IRequest {
        url: string;
        method: string;
        body?: Record<string, any>;
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            // current: number;
            // pageSize: number;
            // pages: number;
            // total: number;
        },
        result: T[]
    }



}
