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

export { receiveTimestamp, receiveTime, timestampToDate }
