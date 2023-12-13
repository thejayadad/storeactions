import React from 'react'
import Logo from '../Logo/Logo'
import AuthLinks from './AuthLink'

const Navbar = () => {
  return (
    <header className='px-4 py-12'>
        <nav className='flex justify-between max-w-screen-xl mx-auto'>
        <Logo />
        <AuthLinks />
        </nav>
    </header>
  )
}

export default Navbar