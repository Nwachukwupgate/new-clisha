export const shortenWalletID = (wallet) => {
  if (wallet) {
    const firstThree = wallet.slice(0, 3);
    const lastThree = wallet.slice(wallet.length - 3, wallet.length);

    return `${firstThree}...${lastThree}`;
  } else {
    return "";
  }
};

export const pointsToDollar = (points) => {
  const ratePerPoint = 0.4; // change later to actual rate
  const pointValue = points ? parseFloat(points) : 0;

  return (ratePerPoint * parseFloat(pointValue)).toFixed(2);
};
