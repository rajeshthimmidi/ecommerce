    import React, { useContext,useState } from 'react'
    import './Navbar.css'
    import rocket from '../assets/rocket.png' 
    import star from '../assets/glowing-star.png' 
    import idbutton from '../assets/id-button.png' 
    import memo from '../assets/memo.png' 
    import order from '../assets/package.png' 
    import lock from '../assets/locked.png' 
    import NavLinkWithIcon from './NavLinkWithIcon'
    import { NavLink, useNavigate } from 'react-router-dom'
    import UserContext from '../contexts/userContext'
    import CartContext from '../contexts/CartContext'


    const Navbar = () => {
        const user = useContext(UserContext);
        const {cart} = useContext(CartContext);
        const [search, setSearch] = useState('');
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
            if (search.trim() !== '') {
                navigate(`/products?search=${encodeURIComponent(search)}`);
            } else {
                navigate('/products');
            }
        }
    return (
        <div className='navbar'>
            <div className='navbar_container'>
                <h1 className='navbar_title'>Store</h1>
                <form className='navbar_form' onSubmit={handleSubmit}>
                    <input className='navbar_search' 
                    type="text" 
                    placeholder="Search..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} />
                    <button 
                    className='navbar_button'
                    type="submit">Search</button>
                </form>
            </div>
            <div className='navbar_links align-center'>
                <NavLinkWithIcon title="Home" link="/" emoji={rocket} />
                <NavLinkWithIcon title="Products" link="/products" emoji={star} />
            {!user && <> <NavLinkWithIcon title="LogIn" link="/login" emoji={idbutton} />
                <NavLinkWithIcon title="SignUp" link="/signup" emoji={memo} /></>}
            {user &&
                <>
                    <NavLinkWithIcon title="My Orders" link="/myorders" emoji={order} />
                    <NavLinkWithIcon title="Logout" link="/logout" emoji={lock} />

                <NavLink to="/cart" className='align-center'>
                    Cart<p className=' align-center cart_count'>{cart.length}</p>
                </NavLink></>}

            </div>
        </div>
    )
    }

    export default Navbar