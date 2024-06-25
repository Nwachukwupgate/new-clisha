import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../../components/Alerts/Loading';
import ProfilePicture from '../../../utils/ProfilePicture';

function ProfilePhoto({ user }) {
  const token = window.localStorage.getItem('token');
  const [loading, setIsLoading] = useState(false);
  const api = process.env.REACT_APP_API;
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      ContentType: 'multipart/form-data',
    },
  };
  const upload = (e) => {
    e.preventDefault();
    const photo = e.target.files[0];
    const form = new FormData();
    form.append('photo', photo);
    setIsLoading(true);
    axios
      .post(`${api}/user/profile/photo`, form, config)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error('Can`t Upload!');
      });
  };
  return (
    <div>
      {loading && <Loading />}
      <div
        className="modal fade"
        id="uploadProfile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog image_upload_container p-0 fixed-left" role="document">
          <div className="modal-content p-0">
            <div className="modal-body select_file p-0 ">
              <div className="form-group m-0">
                <input
                  type="file"
                  className="form-control-file link upload_photo m-0"
                  name=""
                  id=""
                  placeholder=""
                  aria-describedby="fileHelpId"
                  onChange={(e) => upload(e)}
                />
                <span className=" upload_camera" aria-hidden="true">
                  Click and select photo: 1mb
                </span>
                {/* <small id="fileHelpId" className="form-text text-muted text-center p-0 m-0">
                    max file size: 1mb
                  </small> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-2">
        <img
          src={`/images/rank/${user?.rank?.rankName.slice(7).toLowerCase()}.png`}
          className="logo-rank"
          alt=""
        />
        <button
          className="btn fa bg-light shadow fa-camera text-muted rounded-circle uploadCamera"
          data-toggle="modal"
          data-target="#uploadProfile"
        />

        {/* <div
            className="user_avatar_big link  "
            data-toggle="modal"
            data-target="#uploadProfile"
            title="Change profile picture"
          >
            {username.slice(0, 1)}
          </div> */}

        <img
          data-toggle="modal"
          data-target="#uploadProfile"
          src={ProfilePicture({
            gender: user?.user?.gender,
            photo: user?.user?.photo,
          })}
          title="Change profile picture"
          className="logo profileImageAdvata"
          alt=""
        />

        <img
          src="/images/Ellipse 408.png"
          data-toggle="modal"
          data-target="#uploadProfile"
          title="Change profile picture"
          className="dimg link "
          alt=""
        />
      </div>
    </div>
  );
}

export default ProfilePhoto;
