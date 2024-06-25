import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfilePicture from '../../../utils/ProfilePicture/index';

function TeamTable() {
  const teams = useSelector((state) => state.general.teams);
  const [isCopy, setIsCopy] = useState(null);
  const [search, setSearch] = useState();

  const copyFunc = (item, key) => {
    navigator.clipboard.writeText(item?.email).then(() => {
      setIsCopy(key);
      setTimeout(() => {
        setIsCopy(null);
      }, 1000);
    });
  };

  const searchFunc = () =>
    teams?.filter((e) => {
      if (
        e?.username?.match(search) ||
        e?.firstname?.toLowerCase()?.match(search.toLowerCase()) ||
        e?.email?.toLowerCase()?.match(search.toLowerCase()) ||
        e?.lastname?.toLowerCase()?.match(search.toLowerCase()) ||
        moment(e?.createdAt).format('DD/MM/YYYY')?.match(search)
      ) {
        return e;
      }
      return false;
    });

  // const data = "bronze"
  return (
    <div>
      <div className="inputBoxSearch">
        <h6 className="p-2">
          All Referred Members <i className="fa fa-users" aria-hidden="true" />
        </h6>
        <input
          className="form-control"
          type="search"
          placeholder="Search for members"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table text-left table-hover table-striped ">
          <thead>
            <tr>
              <th>Members</th>
              <th>Email</th>
              <th>Rank</th>
              <th>Points/VQs</th>
              <th>Date Entry</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {teams &&
              searchFunc()?.map((item, key) => (
                <tr key={key}>
                  <td className="p-1 m-0">
                    <img
                      src={ProfilePicture({
                        gender: 'male',
                        photo: item?.photo,
                      })}
                      alt=""
                      className="profileImage shadow  rounded-circle d-md-inline  d-none"
                    />
                    <span className="nameSet">
                      {!item?.firstname ? item?.username : `${item.firstname + item.lastname}`}
                    </span>
                  </td>
                  <td>
                    <span className={`badge `}>{item?.email}</span>
                  </td>
                  <td>
                    <img
                      src={`/images/rank/${item?.rank?.rankName?.slice(7)}.png`}
                      className="rankImage "
                      alt=""
                    />
                    <small className={`badge ${item?.rank?.rankName?.slice(7)}`}>
                      {item?.rank?.rankName.slice(7)}
                    </small>
                  </td>

                  <td>
                    <span className="badge badge-danger">{item?.rank?.balance}</span> /{' '}
                    <span className="badge btn-primary">{item?.rank?.bonus_points}</span>
                  </td>
                  <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                  <td>
                    {isCopy !== key ? (
                      <i
                        className="fa fa-clipboard text-muted link"
                        onClick={() => copyFunc(item, key)}
                        title="Copy Email"
                        aria-hidden="true"
                      />
                    ) : (
                      <i className="fa fa-check text-success" aria-hidden="true" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {teams && !searchFunc().length && (
          <div className="text-center  font-weight-bold">
            <div>
              <h4>User Not Found</h4>
              <img src="/images/usernotfound.png" className="w-75 m-auto" alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamTable;
