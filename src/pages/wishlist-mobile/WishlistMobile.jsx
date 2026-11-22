import React from 'react'
import "./WishlistMobile.scss"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import rice from "../../assets/rice.png"



const WishlistMobile = () => {


    const products = [
        {
            id: 1,
            image: rice,
            title: "Natural Honey",
            subtitle: "Nutritious Rice Variety",
            price: 196,
            originalPrice: 240,
            discount: 8,
            status: "Coming Soon",
            rating: 4,
        },
        {
            id: 2,
            image: rice,
            title: "Natural Honey",
            subtitle: "Nutritious Rice Variety",
            price: 196,
            originalPrice: 240,
            discount: 8,
            status: "In Stock",
            rating: 3,
        },
        {
            id: 3,
            image: rice,
            title: "Natural Honey",
            subtitle: "Nutritious Rice Variety",
            price: 196,
            originalPrice: 240,
            discount: 8,
            status: "In Stock",
            rating: 5,
        },
        {
            id: 4,
            image: rice,
            title: "Natural Honey",
            subtitle: "Nutritious Rice Variety",
            price: 196,
            originalPrice: 240,
            discount: 8,
            status: "In Stock",
            rating: 4,
        },
    ];

    const star_data = [
        <FaStar />, <FaStar />, <FaStar />, <FaStar />
    ]







    return (
        <>
            <div className="top-section-wishlist">
                <span><HiOutlineArrowLeft /></span>
                <h3>Wishlist</h3>
            </div>



            <div className="product-grid">
                {products.map((item) => (
                    <div className="product-card" key={item.id}>
                        <div className="image-wrap">
                            <img src={item.image} alt={item.title} />
                            <span className={item.status === "In Stock" ? "badge green" : "badge orange"}>
                                {item.status}
                            </span>
                            <button className="delete-btn"><span><RiDeleteBin6Line /></span></button>
                        </div>

                        <div className="info">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                            <div className="price">
                                <span className="discount">{item.discount}% ↓</span>
                                <span className="old">₹{item.originalPrice}</span>
                                <span className="new">₹{item.price}</span>
                            </div>
                            <div className="star-wrap">
                                {
                                    star_data.map((item) => (
                                        <div className="rating"><span>{item}</span></div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}

export default WishlistMobile
