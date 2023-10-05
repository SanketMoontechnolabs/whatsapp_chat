import { IconButton, Menu, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { useCallback } from "react";
import { Notifications } from "../../redux/actions/AuthAction";

const Notification = ({ showNotification, setShowNotification }) => {
  const [notificationData, setNotificationData] = useState([]);
  const dispatch = useDispatch();
  const notificationdata = useSelector(
    (state) => state?.ChatUserListReducer?.notification
  );

  const handleOpenMenu = async () => {
    setShowNotification(true);
  };

  const handleCloseMenu = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    if (notificationdata !== null) {
      const uniqueNotificationData = new Set([...notificationData]);
      const isDuplicate = [...uniqueNotificationData].some(
        (item) =>
          item?.from?._id === notificationdata?.from?._id &&
          item?.message === notificationdata?.message
      );
      if (!isDuplicate) {
        uniqueNotificationData.add(notificationdata);
        setNotificationData([...uniqueNotificationData]);
      }
    }
  }, [notificationdata,notificationData]);

  const markasNotificationRead = useCallback(
    (notifications) => {
      const mNotifications = notifications.map((n) => {
        return {
          ...n,
          isRead: true,
        };
      });
    
      setNotificationData(mNotifications);
      dispatch(Notifications(mNotifications));
    },
    [dispatch]
  );

  return (
    <>
      <div>
        <IconButton
          style={{ color: "black" }}
          id="fade-button"
          onClick={handleOpenMenu}
          aria-controls={showNotification ? "fade" : undefined}
          aria-haspopup="true"
          aria-expanded={showNotification ? "true" : undefined}
        >
          <Badge badgeContent={notificationData?.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          id="fade"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          className="notification_menu"
          anchorEl={showNotification}
          open={Boolean(showNotification)}
          onClose={handleCloseMenu}
        >
          <div onClick={handleCloseMenu}>
            <div className="z-20  w-full max-w-sm  divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700">
              <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700 p-2 m-2">
                {notificationData && notificationData.length != [] ? (
                  notificationData
                    ?.slice()
                    .reverse()
                    ?.map((item, index) => (
                      <>
                        <a
                          key={index}
                          href="#"
                          className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                          // onClick={}
                        >
                          <div className="flex-shrink-0">
                            <img
                              className="rounded-full w-11 h-11"
                              src={`http://localhost:5000/${item?.from?.profile_image}`}
                              alt="Jese image"
                            />
                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                              <svg
                                className="w-2 h-2 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                              >
                                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                              </svg>
                            </div>
                          </div>
                          <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                              New message from{" "}
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {item?.from?.name}
                              </span>
                              {`: Hey, what's up? All set for the presentation?`}
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-500">
                              Today {moment(item?.time).format("h:mm a")}{" "}
                            </div>
                          </div>
                        </a>
                      </>
                    ))
                ) : (
                  <div className="flex w-full justify-center">
                    no data found
                  </div>
                )}
                {notificationData.length !== 0 && (
                  <div className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                    <div
                      className="inline-flex items-center "
                      onClick={() => markasNotificationRead(notificationData)}
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      View all
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
};

Notification.propTypes = {
  showNotification: PropTypes.node.isRequired,
  setShowNotification: PropTypes.node.isRequired,
};

export default Notification;
