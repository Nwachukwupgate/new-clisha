import React from 'react'
import FirstNavbar from '../../components/Nav/FirstNavbar'
import MainNavbar from '../../components/Nav/MainNavbar'
import HeadBox from './components/HeadBox'
import FlexiblePlan from "../LandingPage/components/FlexiblePlan"
import HowToBecomePartner from '../BecomeAPartner/components/HowToBecomePartner'
import Footer from '../LandingPage/layouts/Footer'
import ScrollTop from '../../components/ScrollTop/ScrollTop'


function Membership() {
    return (
        <div className="membership">
            <FirstNavbar bg={"bg-purple"} />
            <MainNavbar bg={"nav-white-bg"} />
            <div className='become_a_partner container'>
                <HeadBox />
                <div className="mt-5">
                    <FlexiblePlan />
                </div>
                <HowToBecomePartner />
            </div>
            {/* scrollTop Start */}
            <ScrollTop />
            {/* SrollTop end */}
            <Footer />

        </div>
    )
}

export default Membership
