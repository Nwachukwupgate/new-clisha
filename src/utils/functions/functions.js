export const shortenWalletID = (wallet) => {
  if (wallet) {
    const firstThree = wallet.slice(0, 3);
    const lastThree = wallet.slice(wallet.length - 3, wallet.length);

    return `${firstThree}...${lastThree}`;
  }
  return '';
};

export const pointsToDollar = (points) => {
  const ratePerPoint = 0.4; // change later to actual rate
  const pointValue = points ? parseFloat(points) : 0;

  return (ratePerPoint * parseFloat(pointValue)).toFixed(2);
};

export const formatDuration = (seconds) => {
  if (Number.isNaN(seconds) || seconds == null) return "30 secs";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const result = [];
  if (hrs > 0) result.push(`${hrs} hr${hrs > 1 ? "s" : ""}`);
  if (mins > 0) result.push(`${mins} min${mins > 1 ? "s" : ""}`);
  if (secs > 0) result.push(`${secs} sec${secs > 1 ? "s" : ""}`);

  return result.length > 0 ? result.join(", ") : "0 secs";
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};
