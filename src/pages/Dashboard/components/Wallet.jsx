function Wallet({ user, vendoPackage }) {
  // console.log(vendoPackage);
  return (
    <div className="wallet shadow">
      <h1>{user?.rank?.balance?.toFixed(2) ?? 0} Points</h1>
      {vendoPackage?.status === true &&
        user?.user?.vendoConnectStatus &&
        vendoPackage.data.package_level === 'No package' && (
          <h6>(Kindly purchase a Package on Vendo)</h6>
        )}
      {vendoPackage?.status === true &&
        user?.user?.vendoConnectStatus &&
        vendoPackage.data.package_level !== 'No package' && (
          <h6>
            {user?.rank?.bonus_points?.toFixed(2) ?? 0} VQs (
            <b>{vendoPackage.data.package_level}</b> plan with {vendoPackage.data.vqRatio}%
            kickback)
            {/* {"Pro plan"}, {"50%"}) */}
          </h6>
        )}

      {/* <div className="transactionBox">
                <button className="btn btn-primary  btn-sm mr-4 shadow">Widthdraw</button> 
                <button className="btn  btn-light btn-sm shadow">Transfer</button>
            </div> */}
    </div>
  );
}

export default Wallet;
