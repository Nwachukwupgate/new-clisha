import FirstNavbar from '../../components/Nav/FirstNavbar';
import MainNavbar from '../../components/Nav/MainNavbar';
import HeadBox from './components/HeadBox';
import HowPartnerValidate from './components/HowPartnerValidate';
import AcceptedPartners from './components/AcceptedPartners';
import OurExclusivePartner from './components/OurExclusivePartner';
import ClishaPartners from '../LandingPage/components/ClishaPartners';
import card from '../../json/cards.json';
import Footer from '../LandingPage/layouts/Footer';
import HowToBecomePartner from './components/HowToBecomePartner';
import ScrollTop from '../../components/ScrollTop/ScrollTop';

function BecomeAPartner() {
  return (
    <div>
      <FirstNavbar bg="bg-purple" />
      <MainNavbar bg="nav-white-bg" />

      <div className="become_a_partner container">
        <HeadBox />
        <HowPartnerValidate />
        <AcceptedPartners />
        <OurExclusivePartner />
      </div>
      <div className="clishapartner">
        <ClishaPartners card={card} type="partners2" />
      </div>

      <HowToBecomePartner />
      {/* scrollTop Start */}
      <ScrollTop />
      {/* SrollTop end */}
      <Footer />
    </div>
  );
}

export default BecomeAPartner;
