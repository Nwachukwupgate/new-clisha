import React from 'react'
import FirstNavbar from '../../components/Nav/FirstNavbar'
import MainNavbar from '../../components/Nav/MainNavbar'
import HeadBox from './components/HeadBox'
import ClickMore from './components/ClickMore'
import GetStartedToday from './components/GetStartedToday'
import TestimonialsCards from './components/TestimonialsCards'
import ClishaPartners from "../LandingPage/components/ClishaPartners"
import FrequentlyAskedQuestion from "../LandingPage/components/FrequentlyAskedQuestion"
import card from "../../json/cards.json"
import Footer from '../LandingPage/layouts/Footer'
function ClishaUsers() {
    return (
        <div>
            <FirstNavbar bg={"bg-purple"} />
            <MainNavbar bg={"nav-white-bg"} />
            <div className='become_a_partner container'>
                <HeadBox />
                <ClickMore />
                <GetStartedToday />
                <TestimonialsCards />
                <ClishaPartners card={card} />
                <FrequentlyAskedQuestion />
            </div>
            <Footer />

        </div>
    )
}

export default ClishaUsers
