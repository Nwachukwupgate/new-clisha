import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import sideBarList from '../json/dashboardSidebar.json';

function Sidebar() {
  const user = useSelector((state) => state.user.data);
  const [isCopyUserRef, setisCopyUserRef] = useState(false);
  const copyRefFunc = (msg) => {
    const data = `${window.location.origin}/signup?code=${msg}`;
    navigator.clipboard.writeText(data).then(() => {
      setisCopyUserRef(true);
      setTimeout(() => {
        setisCopyUserRef(false);
      }, 1000);
    });
  };
  const linkList = window.location.origin === "https://clisha.me"
    ? sideBarList.data.filter(item => item.name !== "Token")
    : sideBarList.data;

  const route = window.location.pathname;

  return (
    <div className="d-none d-md-block">
      <aside className="p-0 m-0 sideNav ">
        <nav className="p-0  m-0 DasboardSidebar">
          {linkList &&
            linkList.map((item, index) => (
              <React.Fragment key={index}>
                {(index === 4 || index === 6) && <hr />}
                <NavLink
                  to={item.url}
                  id={`sidebar-${item.name.toLowerCase()}`}
                  className={` nav-link ${route === item.url ? 'selectedLink' : ' '} `}
                >
                  <i className={`fa fa-${item.icon}`} aria-hidden="true" />
                  <span>{item.name}</span>

                  {item.new === true && (
                    <small className={`new ${route === item.url && 'newHover'}`}>New</small>
                  )}
                </NavLink>
                {/* {( index === 5 || index === 6) && (
                  <img src="/images/soon.png" className="soonSidebar" alt="" />
                )} */}
              </React.Fragment>
            ))}
          <button
            onClick={(e) => copyRefFunc(user?.user?.clishaId)}
            className="btn rounded-pill text-white btn-sm  mt-4 shadow btn-invite btn-blue"
          >
            {' '}
            {!isCopyUserRef ? 'Invite a friend' : 'Copied'}
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
