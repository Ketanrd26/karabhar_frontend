import React, { useState } from 'react'
import "./FiltersMobile.scss"
import { HiOutlineArrowLeft } from "react-icons/hi";


const FiltersMobile = () => {
    const [status, setStatus] = useState("outForDelivery");
    const [time, setTime] = useState("last30");
    return (
        <>
            <div className="top-section-filter">
                <span><HiOutlineArrowLeft /></span>
                <h3>Filters</h3>
            </div>

            <div className="filter-wrap">
                {/* Order Status */}
                <div className="filter-group">
                    <h4>Order Status</h4>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="outForDelivery"
                            checked={status === "outForDelivery"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Out for Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="ordered"
                            checked={status === "ordered"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Ordered
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="inTransit"
                            checked={status === "inTransit"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        In Transit
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="delivered"
                            checked={status === "delivered"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Delivered
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="cancelled"
                            checked={status === "cancelled"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Cancelled
                    </label>
                </div>

                {/* Order Time */}
                <div className="filter-group">
                    <h4>Order Time</h4>
                    <label>
                        <input
                            type="radio"
                            name="time"
                            value="last30"
                            checked={time === "last30"}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        Last 30 Days
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="time"
                            value="last3"
                            checked={time === "last3"}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        Last 3 Months
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="time"
                            value="last6"
                            checked={time === "last6"}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        Last 6 Months
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="time"
                            value="2025"
                            checked={time === "2025"}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        2025
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="time"
                            value="2024"
                            checked={time === "2024"}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        2024
                    </label>
                </div>
            </div>
        </>
    )
}

export default FiltersMobile
