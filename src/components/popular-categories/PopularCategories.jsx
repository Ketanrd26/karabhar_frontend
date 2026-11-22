import React from 'react'
import "./PopularCategories.scss"
import { FaArrowRightLong } from "react-icons/fa6";
import fruit from "../../assets/poupular-categories/fresh_fruit.png"
import vegetable from "../../assets/poupular-categories/vegis.png"
import meat from "../../assets/poupular-categories/meat_fish.png"
import snack from "../../assets/poupular-categories/snacks.png"
import beverage from "../../assets/poupular-categories/beverage.png"
import beauty from "../../assets/poupular-categories/beauty.png"
import bread from "../../assets/poupular-categories/bread.png"
import baking from "../../assets/poupular-categories/baking.png"
import cook from "../../assets/poupular-categories/cooking.png"
import d_food from "../../assets/poupular-categories/diabetic.png"
import dish from "../../assets/poupular-categories/detergents.png"
import oil from "../../assets/poupular-categories/oil.png"


function PopularCategories() {


    const data = [
        {
            name: "Fresh Fruit",
            img: fruit
        },
        {
            name: "Fresh Vegetables",
            img: vegetable
        },
        {
            name: "Meat & Fish",
            img: meat
        },
        {
            name: "Snacks",
            img: snack
        },

        {
            name: "Beverages",
            img: beverage
        },
        {
            name: "Beauty & Health",
            img: beauty
        },
        {
            name: "Bread & Bakery",
            img: bread
        },
        {
            name: "Baking Needs",
            img: baking
        },
        {
            name: "Cooking",
            img: cook
        },
        {
            name: "Diabetic Food",
            img: d_food
        },
        {
            name: "Dish Detergents",
            img: dish
        },
        {
            name: "Oil",
            img: oil
        },


    ]
    return (
        <>
            <div className="parent popular-cat-parent">
                <div className="cont popular-cat-cont">
                    <div className="top-head-popular">
                        <h2>Popular Categories</h2>
                        <div className="top-head-view">
                            <span>View All</span>
                            <span>
                                <FaArrowRightLong />
                            </span>
                        </div>
                    </div>

                    <div className="bottom-popular">
                        {
                            data.map((item, index) => (
                                <div className="popular-card">
                                    <img src={item.img} alt="" />
                                    <h4>{item.name}</h4>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularCategories
