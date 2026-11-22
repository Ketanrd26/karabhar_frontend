import React, { useState } from 'react'
import { HiOutlineArrowLeft } from "react-icons/hi";
import "./UpiMobile.scss"
import { RiDeleteBinLine } from "react-icons/ri";
import phonepe from "../../assets/phone_pay.png"


const UpiMobile = () => {

    const [upiList, setUpiList] = useState([
        { id: 1, app: "Phone Pay", upiId: "9595567684@ybl", logo: "https://seeklogo.com/images/P/phonepe-logo-78C46D41E9-seeklogo.com.png" },
        { id: 2, app: "Google Pay", upiId: "vivek123@okicici", logo: "https://seeklogo.com/images/G/google-pay-logo-62004C6B7F-seeklogo.com.png" },
    ]);

    const handleDelete = (id) => {
        setUpiList(upiList.filter((upi) => upi.id !== id));
    };

    return (
        <div>
            <div className="top-section">
                <span><HiOutlineArrowLeft /></span>
                <h3>Saved UPI</h3>
            </div>
            <div className="upi-list">
                {upiList.map((upi) => (
                    <div key={upi.id} className="upi-item">
                        <div className="upi-header">
                            <span className="app-name">{upi.app}</span>
                            <button className="icon-btn delete" onClick={() => handleDelete(upi.id)}>
                                <RiDeleteBinLine />
                            </button>
                        </div>

                        <div className="upi-details">
                            <img src={phonepe} alt={upi.app} className="upi-logo" />
                            <span className="upi-id">{upi.upiId}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default UpiMobile
