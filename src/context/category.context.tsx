'use client'

import { createContext, useContext } from "react"


interface CategoryContextType {
    categories: ICategory[]
}

const CategoryContext = createContext<CategoryContextType | null>(null)

export const useCategory = () => {
    const context = useContext(CategoryContext)
    return context
}

export const CategoryProvider = ({
    categories,
    children,
}: {
    categories: ICategory[]
    children: React.ReactNode
}) => {
    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    )
}