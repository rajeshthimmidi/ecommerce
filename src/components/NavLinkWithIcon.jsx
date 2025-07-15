import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const NavLinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink to={link} className={`align-center ${sidebar ? 'sidebar-link' : ''}`}>
      {title} <img className="link_emoji" src={emoji} alt={title} />
    </NavLink>
  )
}

export default NavLinkWithIcon