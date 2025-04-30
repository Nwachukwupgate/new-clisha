function HeadBox() {
  return (
    <div className="headBox">
      <div className="row m-0">
        <div className="col-md-6 order-md-last p-0">
          <img src="/images/partner/headbox.png" className="w-100" alt="social media rewards clisha" />
        </div>
        <div className="col-md-6 order-md-first p-0">
          <h3 className="headText">Free Accounts For Test</h3>
          <p className="bodyText2">Clisha Is Your Ultimate Marketing Partner with best Strategy</p>

          <a
            rel="noreferrer"
            href={`${process.env.REACT_APP_COMPANY}/signup`}
            target="_blank"
            className="btn"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Become A Publisher
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeadBox;
