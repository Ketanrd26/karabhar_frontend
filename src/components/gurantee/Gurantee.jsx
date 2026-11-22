import React from 'react'
import "./Gurantee.scss"
import truck from "../../assets/gurantee/delivery-truck 1.png"
import headphones from "../../assets/gurantee/headphones 1.png"
import shopping from "../../assets/gurantee/shopping-bag.png"
import packagee from "../../assets/gurantee/package.png"

function Gurantee() {

    const data = [
        {
            image: truck,
            heading: "Free Shipping",
            contain: "Free shipping on all your order"
        },
        {
            image: headphones,
            heading: "Customer Support 24/7",
            contain: "Instant access to Support"
        },
        {
            image: shopping,
            heading: "100% Secure Payment",
            contain: "We ensure your money is save"
        },
        {
            image: packagee,
            heading: "Money-Back Guarantee",
            contain: "30 Days Money-Back Guarantee"
        },

    ]


    return (
        <>
            <div className="parent gurantee-parent">
                <div className="cont gurantee-cont">
                    <div className="wrap-main">
                        {
                            data.map((item, index) => (
                                <div className="free-shipping">
                                    <img src={item.image} alt="" />
                                    <div className="shipping">
                                        <h4>{item.heading}</h4>
                                        <p>{item.contain}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Gurantee
