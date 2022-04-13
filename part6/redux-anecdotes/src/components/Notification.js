import { connect } from "react-redux";

const Notification = ({notification}) => {
  const notificationText = notification.notificationText;

  console.log("notification", notificationText);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notificationText) return <span></span>;

  return <div style={style}>{notificationText}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
