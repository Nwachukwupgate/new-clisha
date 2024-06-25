import { useDispatch } from 'react-redux';
import data from '../json/dashboardSidebar.json';
import { logoutAction } from '../store/Auth/auth';

function MobileSidebar() {
  const dispatch = useDispatch();
  const list = data.data;
  const logout = () => {
    dispatch(logoutAction());
  };
  const current_route = window.location.pathname;

  return (
    <div className="modal-dialog " role="document">
      <div className="modal-content mobile_sidebar">
        <div className="modal-header border-0">
          <h5 className="modal-title">
            <a className="navbar-brand" href="/dashboard">
              <img src="/logo2.png" alt="" />
            </a>
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" className="text-white">
              &times;
            </span>
          </button>
        </div>
        <div className="modal-body pt-0">
          <ul className="mobile_list pt-0">
            {list &&
              list.map((item, index) => (
                <li
                  key={index}
                  className={`onlist ${item.url === current_route ? ' onlisthover ' : ''}`}
                >
                  <a href={item.url}>
                    <i className={`fa fa-${item.icon}`} aria-hidden="true" />
                    {item.name}
                    {item.new === true && (
                      <small className={`new ${current_route === item.url && 'newHover'}`}>
                        New
                      </small>
                    )}
                  </a>
                </li>
              ))}

            <li className={`onlist `}>
              <a onClick={logout} href="/signin">
                <i className="fa fa-sign-out" aria-hidden="true" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
