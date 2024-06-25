import { useNavigate } from 'react-router-dom';

function CommingSoon() {
  const navigate = useNavigate();
  return (
    <div className="comming-soon">
      <div className="row">
        <div className="col-12 text-center">Coming soon ...</div>

        <div className="col-12 text-center mt-5">
          <button className="btn back-navigate" onClick={() => navigate(-1)}>
            {' '}
            <i className="fa fa-arrow-left" aria-hidden="true" /> Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommingSoon;
