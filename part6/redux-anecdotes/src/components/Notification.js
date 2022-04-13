import { connect } from "react-redux";

const Notification = ({notification}) => {
  // const notification = props.notification;

  console.log("notification", notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (!notification) return <span></span>;

  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
