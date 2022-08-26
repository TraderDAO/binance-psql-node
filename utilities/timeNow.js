import date from "date-and-time"

const receiveTime = () => {
  return date.format(new Date(), "YYYY/MM/DD HH:mm:SSS", true)
}

const receiveTimestamp = () => {
  return new Date().getTime()
}

const timestampToDate = (timestampForTx) => {
  const timestamp = timestampForTx
  const time = new Date(timestamp)
  // const timeForDate = ;
  return (
    time.getUTCFullYear() +
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
  )
}

export { receiveTimestamp, receiveTime, timestampToDate }
