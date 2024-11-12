import { useSelector } from 'react-redux';
import cards from '../../json/cards.json';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import HowItWorks from './components/HowItWorks';
import NumberTasks from './components/NumberTasks';
import NewOnlineTask from './components/NewOnlineTask';
import TopUser from './components/TopUser';
import WeLoveAffiliates from './components/WeLoveAffiliates';
import WhatinClisha from './components/WhatinClisha';
import ScrollTop from '../../components/ScrollTop/ScrollTop';

function Landingpage() {
  const card = cards;
  const rank = useSelector((state) => state.rank);
  return (
    <div>
      <Header />

      {/* how it works start */}
      <HowItWorks />
      {/* how it works ends */}

      {/* numbering tasks  start */}
      <NumberTasks />
      {/* numbering tasks  end */}

      {/* We Loves Our Affiliates start */}
      <WeLoveAffiliates card={card} />
      {/* We Loves Our Affiliates end */}

      {/* Speedy Marketing With Community start */}
      {/* <SpeedyMarketing /> */}
      {/* Speedy Marketing With Community end */}

      {/* New Online Daily Task start */}
      <NewOnlineTask />
      {/* New Online Daily Task end */}

      {/* What’s in Clisha start */}
      {/* <WhatinClisha /> */}
      {/* What’s in Clisha start */}

      {/* Powerful Tools start */}
      {/* <PowerfulTools card={card} /> */}
      {/* Powerful Tools end */}

      {/* TODO: align the top company and the top user below to be inline and scrollable , so it will fit but mobile and PC UI */}
      {/* Top 10 Companies start */}
      {/* <TopCompany card={card} /> */}
      {/* Top 10 Companies end */}

      {/* Top 10 users start */}
      <TopUser card={card} rank={rank} />
      {/* Top 10 users end */}

      {/* Select our flexible plan start */}
      {/* <FlexiblePlan /> */}
      {/* Select our flexible plan end */}

      {/* Our Happy Client start */}
      {/* <OurHappyClient /> */}
      {/* Our Happy Client end */}

      {/* Clisha Partners start */}
      {/* <ClishaPartners card={card} /> */}
      {/* Clisha Partners end */}

      {/* Frequintly Asked Questions start */}
      {/* <FrequentlyAskedQuestion /> */}
      {/* Frequintly Asked Questions end */}

      {/* Ready to start become our partner start */}
      {/* <ReadyToStart /> */}
      {/* Ready to start become our partner end */}

      {/* Resources start */}
      {/* <ResourcesStart card={card} /> */}
      {/* Resources end */}

      {/* scrollTop Start */}
      <ScrollTop />
      {/* SrollTop end */}

      {/* Scroll to Top Button */}
      {/* <ScrollToTopButton /> */}

      {/* Footer Start */}
      <Footer />
      {/* footer end */}
    </div>
  );
}

export default Landingpage;
