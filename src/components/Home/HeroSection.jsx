import React from 'react'
import './HeroSection.css';
import iphoneImage from '../../assets/iphone-14-pro.webp';
import { Link } from 'react-router-dom';

const HeroSection = ({title, subtitle, link, image}) => {
  return (
    <section className="hero-section">
        <div className="align-center">
            <h2 className='hero-title'>{title}</h2>
            <p className='hero-subtitle'>{subtitle}</p>
            <Link to={link} className="hero-link">Shop Now</Link>
        </div>
        <div className="align-center">
           {image ? (
          <img className='hero-image' src={image} alt="Hero Image" />
        ) : null}

        </div>
    </section>
  )
}

export default HeroSection