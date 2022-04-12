import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(({notification}) => notification)

  console.log('notification', notification);
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(!notification) return <span></span>

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification