import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import SidebarTour from '../../layouts/SidebarTour';
import TeamTable from './components/TeamTable';

function Team() {
  return (
    <div className="body-content team">
      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
            <SidebarTour />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
            <div className="container  p-0 p-md-3 pt-4">
              <TeamTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
