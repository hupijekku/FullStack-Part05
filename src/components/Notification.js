import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    paddingLeft: 5,
    color: notification.success ? 'green' : 'red',
    fontSize: 25
  }
  if(notification.message) {
    return(<div style={style}><p>{notification.message}</p></div>)
  }
  else {return (<></>)}
}

export default Notification