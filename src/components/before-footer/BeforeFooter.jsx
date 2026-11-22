import React from 'react'
import "./BeforeFooter.scss"
import { TbMailOpened } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";

function BeforeFooter() {
    return (
        <>
            <div className="parent bf-footer-parent">
                <div className="cont bf-footer-cont">
                    <div className="bf-left">
                        <span><TbMailOpened /></span>
                        <div className="wrap">
                            <h4>Subscribe our Newsletter</h4>
                            <p>Pellentesque eu nibh eget mauris congue mattis matti.</p>
                        </div>
                    </div>
                    <div className="bf-right">
                        <div className="search-component">
                            <p>Your email address</p>
                            <span>Subscribe</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default BeforeFooter
