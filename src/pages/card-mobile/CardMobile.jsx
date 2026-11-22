import React, { useState } from 'react'
import { HiOutlineArrowLeft } from "react-icons/hi";
import "./CardMobile.scss"
import { RiDeleteBinLine } from "react-icons/ri";

const CardMobile = () => {

    const [cards, setCards] = useState([
        { id: 1, bank: "Axis Bank Credit Card", last4: "9584" },
        { id: 2, bank: "HDFC Debit Card", last4: "6211" },
    ]);

    const handleDelete = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <div>
            <div className="top-section">
                <span><HiOutlineArrowLeft /></span>
                <h3>Saved Cards</h3>
            </div>

            <div className="card-list">
                {cards.map((card) => (
                    <div key={card.id} className="card-item">
                        <div className="card-header">
                            <span className="bank-name">{card.bank}</span>
                            <button
                                className="icon-btn delete"
                                onClick={() => handleDelete(card.id)}
                            >
                                <RiDeleteBinLine />
                            </button>
                        </div>
                        <div className="card-number">
                            <span className="masked">•••• •••• ••••</span>{" "}
                            <span className="last4">{card.last4}</span>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default CardMobile
