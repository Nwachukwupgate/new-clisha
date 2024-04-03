import React from 'react'
import FirstNavbar from '../../components/Nav/FirstNavbar'
import MainNavbar from '../../components/Nav/MainNavbar'
import Footer from '../LandingPage/layouts/Footer'
import HeadBox from './components/HeadBox'
import Products from './components/Products'
import AboutProducts from './components/AboutProducts'
import HowToBecomePartner from '../BecomeAPartner/components/HowToBecomePartner'

function AllProducts() {
    return (
        <div className='AllProducts'>
            <FirstNavbar bg={"bg-purple"} />
            <MainNavbar bg={"nav-white-bg"} />
            <div className='become_a_partner container'>
                <HeadBox />
                <Products />
            </div>
            <AboutProducts />
            <HowToBecomePartner />
            <Footer />
        </div>
    )
}

export default AllProducts
