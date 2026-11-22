import React from 'react'
import "./OrderDetailMobile.scss"
import { FaCheckCircle, FaTruck, FaBox, FaHome } from "react-icons/fa";
import rice from "../../assets/rice.png"
import { HiOutlineArrowLeft } from "react-icons/hi";



const OrderDetailMobile = () => {
    return (
        <>
            <div className="order-details">
                {/* Header */}
                <div className="top-section">
                    <span><HiOutlineArrowLeft /></span>
                    <h3>Order Details</h3>
                </div>
                <div className="header">

                    <div>
                        <h3>Order ID - #987454</h3>
                        <p>Oct 29, 2024 • ₹5400</p>
                    </div>
                    <span className="status paid">Paid</span>
                </div>

                {/* Order Summary */}
                <div className="section">
                    <h4>Order Summary</h4>
                    <div className="product">
                        <img src={rice} alt="product" />
                        <div>
                            <h5>Ramji Patil Shree Ram Wheat</h5>
                            <p>Maker: Ramji Patil (Nashik)</p>
                        </div>
                    </div>

                    <div className="price-list">
                        <div><span>List price:</span><span>₹6500</span></div>
                        <div><span>Selling price:</span><span>₹6000</span></div>
                        <div><span>Discount:</span><span>₹600 (10%)</span></div>
                        <div><span>Special price:</span><span>₹5400</span></div>
                        <div><span>Delivery charges:</span><span>₹40 Free</span></div>
                        <div className="total"><span>Total amount</span><span>₹5400</span></div>
                    </div>
                </div>

                {/* Delivery Status */}
                <div className="section">
                    <h4>Delivery Status</h4>
                    <ul className="status-list">
                        <li className="active">
                            <FaCheckCircle className="icon" />
                            <div>
                                <h5>Ordered confirmed</h5>
                                <p>Order received and confirmed</p>
                                <span>1 May 2025, 05:16</span>
                            </div>
                        </li>
                        <li>
                            <FaTruck className="icon" />
                            <div>
                                <h5>In Transit</h5>
                                <p>Package received in nearby delivery hub</p>
                            </div>
                        </li>
                        <li>
                            <FaBox className="icon" />
                            <div>
                                <h5>Out For Delivery</h5>
                                <p>Will be delivered by 8 May 2025</p>
                            </div>
                        </li>
                        <li>
                            <FaHome className="icon" />
                            <div>
                                <h5>Order Delivered</h5>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Shipping Details */}
                <div className="section">
                    <h4>Shipping Details</h4>
                    <p><b>Vivek Sakhargade</b></p>
                    <p>Tilak house near gillur hospital umred road reshimbag</p>
                    <p>Nagpur, Maharashtra - 440024</p>
                    <p>Phone number: <b>9595657684</b></p>
                </div>

                {/* Vendor Details */}
                <div className="section vendor">
                    <h4>Maker Details</h4>
                    <div className="vendor-card">
                        <img src={rice} alt="vendor" />
                        <div>
                            <h5>Ramji Patil (Nashik)</h5>
                            <p>Cras sit amet maximus, accumsan sapien et, sollicitudin velit.</p>
                            <button className="profile-btn">Visit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailMobile
