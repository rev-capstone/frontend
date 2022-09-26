import React from 'react'
import { angularsolo } from '../../assets'

const HeroBanner = () => {
  return (
    <div data-aos="fade-zoom-in"
    data-aos-delay="300"
    data-aos-offset="0" className="hero-banner-container">
        <p className="angular-solo">HEADPHONES</p>
        <h3>Now On Sale</h3>
        <h1>Angular</h1>
        <h1>Beats Solo</h1>
        <img src={angularsolo} alt="headphones" className="hero-banner-image"/>
        <div className="desc">
          <h5>Description</h5>
          <p>With surround sound, the New Angular headphones offer up to a 360-degree soundscape, with multiple speakers covering each ear. Made so if something is coming from behind you in any direction, you'll hear it from that direction. Definitely a Coder's Closet luxury feature</p>
          
      </div>
    </div>
  )
}

export default HeroBanner