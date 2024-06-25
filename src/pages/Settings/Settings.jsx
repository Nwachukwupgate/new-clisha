import Toggle from 'react-toggle';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChanceUsername';
import 'react-toggle/style.css';
import { taskStatusFun } from '../../store/General';

function Settings() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const task_status = localStorage.getItem('task_status');

  const toggleAdd = () => {
    if (task_status === 'false') {
      localStorage.setItem('task_status', true);
      dispatch(taskStatusFun(true));
    } else {
      localStorage.setItem('task_status', false);
      dispatch(taskStatusFun(false));
    }
    window.location.reload();
  };
  return (
    <div className="body-content">
      <div className="bg-muted ">
        <Header />
        <div className="row m-0 ">
          <div className="col-md-4 col-lg-2 p-0 bg-white m-0">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-10 py-3 scroll-bg bg-white p-0">
            <div className="container text-center p-0 p-md-3 pt-4">
              <div className="row m-0">
                <div className="col-md-6">
                  <ChangeUsername />
                  <ChangePassword />
                </div>
                {user?.user?.developer === true && (
                  <div className="col-md-6 text-left mt-4">
                    <div>Preview Unpublish Task</div>
                    <label>
                      <Toggle
                        defaultChecked={task_status === 'true'}
                        className="custom-classname mt-2 "
                        onChange={() => toggleAdd()}
                      />
                      <label className="unplishedtask">
                        {task_status === 'true' ? 'On' : 'Off'}
                      </label>
                    </label>

                    {/* <ChanceEmail /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
