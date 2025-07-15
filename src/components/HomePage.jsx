import React from 'react'
import HeroSection from './Home/HeroSection'
import iphoneImage from '../assets/iphone-14-pro.webp'
import mac from '../assets/mac-system-cut.jfif'
import FeaturedProduct from './Home/FeaturedProduct'

const HomePage = () => {
  return (
    <>
      <HeroSection title="Iphone 14 Pro" subtitle="Experience the power of iphone 14 Pro." link="/product/68767ec34aa1fc88bcb3c282" image={iphoneImage} />
      < FeaturedProduct />
      <HeroSection title="Macbook Pro 14" subtitle="Experience the power of Apple silicon." link="/product/68767ec34aa1fc88bcb3c28a" image={mac} />
    </>
  )
}

export default HomePage