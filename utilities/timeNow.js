import date from "date-and-time";

const now = new Date();
const receiveTimestamp = now.getTime();
const receiveTime = date.format(now, "YYYY/MM/DD HH:mm:SSS", true);

const timestampToDate = (timestampForTx) => {
  const timestamp = timestampForTx;
  const time = new Date(timestamp);
  // const timeForDate = ;
  return (
    time.getUTCFullYear() +
    "/" +
    time.getUTCMonth() +
    "/" +
    time.getUTCDate() +
    " " +
    time.getUTCHours() +
    ":" +
    time.getUTCMinutes() +
    ":" +
    time.getUTCSeconds()
  );
};

export { receiveTimestamp, receiveTime, timestampToDate };
