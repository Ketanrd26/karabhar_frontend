import React, { useState } from 'react'
import "./ManageAddressMobile.scss"
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";


const ManageAddressMobile = () => {

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            name: "Vivek Anil Sakhargade",
            phone: "9595567684",
            address:
                "Ambe nagar, near vidya Vijay school, pardi bus top, Pardi, nagpur, Pardi, Nagpur, Maharashtra - 440008",
        },
        {
            id: 2,
            type: "Work",
            name: "Vivek Anil Sakhargade",
            phone: "9595567684",
            address:
                "Plot No.25, figment global solution, Behind Equitas Small Finance Bank, Shankar Nagar, East Shankar Nagar, Nagpur, Maharashtra - 440010",
        },
    ]);

    const handleDelete = (id) => {
        setAddresses(addresses.filter((item) => item.id !== id));
    };

    const handleEdit = (id) => {
        alert(`Edit Address with id: ${id}`);
    };

    const handleAdd = () => {
        alert("Add New Address");
    };


    return (
        <>

            <div className="top-section">
                <span><HiOutlineArrowLeft /></span>
                <h3>Manage Address</h3>
            </div>
            <div className="address-list">
                {addresses.map((item) => (
                    <div className="address-card" key={item.id}>
                        <div className="address-header">
                            <span className="badge">{item.type}</span>
                            <div className="actions">
                                <button onClick={() => handleEdit(item.id)} className="icon-btn">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="icon-btn delete">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="address-body">
                            <h4>{item.name}</h4>
                            <p className="phone">{item.phone}</p>
                            <p className="full-address">{item.address}</p>
                        </div>
                    </div>
                ))}

                <button className="add-btn" onClick={handleAdd}>
                    + Add New Address
                </button>
            </div>
        </>
    )
}

export default ManageAddressMobile
