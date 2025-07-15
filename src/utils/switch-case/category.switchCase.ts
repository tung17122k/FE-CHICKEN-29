export function switchCategory(category: string): string {
    switch (category) {
        case "FRIED_CHICKEN":
            return "Gà rán";
        case "LIGHT_FOOD":
            return "Đồ ăn nhẹ";
        case "DRINKS":
            return "Đồ uống";
        case "BURGER":
            return "Burger";
        default:
            return "Category not found";
    }
}