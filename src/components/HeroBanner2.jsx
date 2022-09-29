import React from 'react'
import { handwarmer } from '../assets'

const HeroBanner2 = () => {
  return (
    <div data-aos="fade-zoom-in"
    data-aos-delay="300"
    data-aos-offset="0" className="hero-banner-container">
        <p className="angular-solo">ACCESSORIES</p>
        <h3>Winter Is Coming</h3>
        <h1>Revature</h1>
        <h1>Hand Massager</h1>
        <img src={handwarmer} alt="headphones" className="hero-banner-image"/>
        <div className="desc">
          <h5>Description</h5>
          <p>You deserve a hand! You want to get rid of finger numbness, joint pain, relieve arthritis or carpal tunnel pain, and relax your hand after a long day at work. The Revature Hand Massager is designed  to be the most efficient finger and palm massager with heat for your needs. No matter  what you do, online gaming, cat petting, or play fat-gingering keyboards, you'll feel its wonders on your tired hands and enjoy a relaxing mood with this hand massager</p>
          
      </div>
    </div>
  )
}

export default HeroBanner2