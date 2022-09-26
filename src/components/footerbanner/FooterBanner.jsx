import React from 'react'
import { ram } from '../../assets'

const FooterBanner = () => {
  return (
  <>
     <div className="footer-banner-container">
     <div className="banner-desc">
      <div className="left">
        <h3>50% OFF</h3><br></br>
        <h1>Kev123</h1>
        <h1>200GB (2 x 100GB) DDR2</h1>
        <h1>DRAM 10000MHZ Memory Kit - Black</h1>
        <img src={ram} alt="headphones" className="footer-banner-image"/>
      </div>
      <div className="right">
        <h4>While Supplies Last!</h4>
      </div>
     </div>
     </div>
 
  </>
     
  )
}

export default FooterBanner