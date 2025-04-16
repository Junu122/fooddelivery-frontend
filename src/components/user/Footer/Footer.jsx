import React from 'react'
import "./footer.css"
import { assets } from '../../../assets/assets'
function Footer() {
  return (
    <div className='footer' id='footer'>
     <div className="footer-content">
        <div className="footer-content-left">
           <img src={assets.logo} alt="" />
           <p>Tomato is your go-to destination for an exclusive dining experience, offering our carefully curated menu delivered right to your door</p>
           <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
           </div>
        </div>
        <div className="footer-content-centre">
           <h1>Company</h1>
           <ul>
            <li>home</li>
            <li>about us</li>
            <li>delivery</li>
            <li>privacy policy</li>
           </ul>
        </div>
        <div className="footer-content-right">
          <h1>Get in touch</h1>
          <ul>
            <li>+91-7894561230</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
     </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 tomato.com -All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
