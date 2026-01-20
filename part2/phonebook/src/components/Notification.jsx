const Notification = ({ message, styleMessage }) => {
  if (!message) {
    return null
  }

  return <div className={`notification ${styleMessage}`}>{message}</div>
}

export default Notification 