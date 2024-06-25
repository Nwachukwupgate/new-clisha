import moment from 'moment';
import { useSelector } from 'react-redux';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';
import HeaderWelcome from './components/HeaderWelcome';
import HeaderWelcomeMobile from './components/HeaderWelcomeMobile';
import RankCards from './components/RankCards';

function Rank() {
  const user = useSelector((state) => state.user.data);

  const date = () => moment(Date.now()).format('MMMM DD, YYYY');

  return (
    <div className="body-content rank">
      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0 p-md-2">
            <div className="p-0 p-lg-3">
              <HeaderWelcome date={date()} user={user} />
              <HeaderWelcomeMobile date={date()} user={user} />
              <RankCards user={user} />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rank;
