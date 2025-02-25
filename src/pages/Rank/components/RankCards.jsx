import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePicture from '../../../utils/ProfilePicture';
import { getRank } from '../../../store/Rank';
import Pagination from '../../../components/Pagination';
import ExperienceBar from './ExperienceBar';

function RankCards({ user }) {
  const rank = useSelector((state) => state.rank);

  // TODO:test run this code
  const dispatch = useDispatch();
  const [currentItems] = useState(1);
  useEffect(() => {
    dispatch(getRank(currentItems));
  }, [currentItems, dispatch]);

  const handlePageClick = (event) => {
    const newItems = event.selected + 1;
    dispatch(getRank(newItems));
  };
  return (
    <div>
      <ExperienceBar />
      <div className="community_card_container row m-0 p-0">
        {rank &&
          rank?.data?.ranking?.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 my-3 ">
              {/* {console.log(item)} */}
              <div className="comunity_cards shadow-sm mx-auto  ">
                <div className="headText d-block ">
                  <h6>
                    Rank Position
                    <span className="float-right">{item.position}</span>
                  </h6>
                </div>
                <div className="body_content z-2 px-3">
                  <img
                    src={ProfilePicture({
                      gender: item?.user?.gender,
                      photo: item?.user?.photo,
                    })}
                    alt=""
                    className="profile miniavatar shadow "
                  />
                  <span className="ml-2  ">
                    <b>
                      {item?.user?.username?.slice(0, 13)}
                      {'.. '}

                      {/* {item?.user?.lastname?.slice(0, 5) ?? ""}
                      {item?.user?.lastname?.length >= 5 ? "..." : ""} */}
                    </b>
                  </span>
                </div>
                <div className="footer_content px-2 mt-3">
                  <img src="/images/single_star.png" alt="" className="star" />
                  <span className="rank_text z-2">AdStar</span>

                  <span className="rank_text2 z-2">
                    {(item?.rankName && item?.rankName?.slice(6)) ?? 'bronze'}
                  </span>

                  <img
                    src={`/rank/${
                      (item?.rankName?.slice(7) || "").charAt(0).toUpperCase() +
                      (item?.rankName?.slice(8) || "").toLowerCase() || "Bronze"
                    }.png`}
                    alt="Rank Badge"
                    className="ranking_Community_badges"
                  />
                  <div className="total_point float-right ">{item.total_points}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="text-center mt-4">
        {rank && (
          <Pagination
            pageCount={rank?.data?.totalPages}
            onPageChange={handlePageClick}
            pageRangeDisplayed={24}
            justify="center"
          />
        )}
      </div>
    </div>
  );
}

export default RankCards;
