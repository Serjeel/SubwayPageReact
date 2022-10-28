import { menu } from './timelyMenu';
const data = menu;

export const categories = {
    pancakes: "Блины",
    shaurma: "Шаурма",
    sandwiches: "Сэндвичи",
    burgers: "Бургеры",
    chicken: "Курица & Картофель",
    salads: "Тортилья & Салаты",
    drinks: "Напитки & Десерты"
};

export const filteredData = {}

{Object.keys(categories).map(key => (
    filteredData[key] = data.filter(item => item.category === key)
))}