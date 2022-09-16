import date from "date-and-time"

const receiveTime = () => {
  return date.format(new Date(), "YYYY/MM/DD HH:mm:ss", true)
}

const receiveTimestamp = () => {
  return new Date().getTime()
}

const timestampToDate = (timestamp) => {
  const time = new Date(timestamp)
  return time.getUTCFullYear() +
    "/" +
    (time.getUTCMonth() + 1) +
    "/" +
    time.getUTCDate() +
    " " +
    time.getUTCHours().toString().padStart(2, '0') +
    ":" +
    time.getUTCMinutes().toString().padStart(2, '0') +
    ":" +
    time.getUTCSeconds().toString().padStart(2, '0')
}

const utcNow = () => {
  let now = new Date;
  let utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate());
  return utc_timestamp
}



export { receiveTimestamp, receiveTime, timestampToDate, utcNow }
