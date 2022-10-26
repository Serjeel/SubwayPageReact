import React, { useState } from 'react';
import './MenuCategories.scss';

function MenuCategories({selectedTab, setSelectedTab}) {
    const categories = {
        pancakes: "Блины",
        shaurma: "Шаурма",
        sandwiches: "Сэндвичи",
        burgers: "Бургеры",
        chicken: "Курица & Картофель",
        salads: "Тортилья & Салаты",
        drinks: "Напитки & Десерты"
    };
    // Возможно здесь не нужен id в принципе, а только key для галочки
    
    return (
        <div className="menu-categories">
            {Object.keys(categories).map(key => (
                <p className={selectedTab === key ? "category-active" : "category"}
                id={key} key={key} onClick={() => setSelectedTab(key)}>{categories[key]}</p>
            ))}
        </div>
    );
}

export default MenuCategories;
