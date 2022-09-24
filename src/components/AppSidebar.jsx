import React, { useEffect } from "react";
import { Menu, Divider, Skeleton } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import { pgRoutes } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import types from "../redux/types";
import { CustomIcon } from ".";

import {
  getProfileAction,
  getUserApplicationMenuAction,
  getUserApplicationRoleAction,
  getSelectedApplicationByRoute,
} from "../redux/actions";

export const AppSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const userMenuLoading = useSelector(
    (state) => state.userApplicationMenu.loading
  );
  const selectedUserApplicationLoading = useSelector(
    (state) => state.selectedUserApplication.loading
  );
  const selectedUserApplication = useSelector(
    (state) => state.selectedUserApplication.data
  );
  const userMenuList = useSelector((state) => state.userApplicationMenu.list);
  const userApplicationRole = useSelector(
    (state) => state.userApplicationRole.data
  );

  useEffect(() => {
    if (!profile) {
      dispatch(getProfileAction(history));
    }
  }, [profile]);

  useEffect(() => {
    const routes = location.pathname.split("/");
    if (routes[1]) {
      dispatch(getSelectedApplicationByRoute(history, routes[1]));
    }
  }, [location]);

  useEffect(() => {
    const routes = location.pathname.split("/");
    if (
      routes[1] &&
      routes[1] !== "users" &&
      routes[1] !== "locations" &&
      !userMenuList.length &&
      !userApplicationRole
    ) {
      dispatch(getUserApplicationMenuAction(history, routes[1]));
      dispatch(getUserApplicationRoleAction(history, routes[1]));
    } else if (!routes[1] && userMenuList.length && userApplicationRole) {
      //Reset Menu State
      dispatch({
        type: types.USER_APPLICATION_MENU_RESET,
      });
      dispatch({
        type: types.USER_APPLICATION_ROLE_RESET,
      });
      dispatch({
        type: types.SELECTED_USER_APPLICATIONS_RESET,
      });
    } else if (
      routes[1] === "users" &&
      routes[1] === "locations" &&
      userMenuList.length &&
      userApplicationRole
    ) {
      //Reset Menu State
      dispatch({
        type: types.USER_APPLICATION_MENU_RESET,
      });
      dispatch({
        type: types.USER_APPLICATION_ROLE_RESET,
      });
      dispatch({
        type: types.SELECTED_USER_APPLICATIONS_RESET,
      });
    }
  }, [location, userMenuList, userApplicationRole]);

  const renderNavItems = () => (data, index) => {
    return (
      <React.Fragment>
        <Menu.Item key={data.path} icon={data.icon}>
          <Link to={data.path}>{data.name}</Link>
        </Menu.Item>
      </React.Fragment>
    );
  };
  const renderApplicationNav = () => {
    return userMenuList.map((userMenu) => {
      return (
        <React.Fragment>
          <Menu.Item
            key={`/${userMenu.applicationMenu.route}`}
            icon={<CustomIcon type={userMenu.applicationMenu.antd_icon_name} />}
          >
            <Link to={`/${userMenu.applicationMenu.route}`}>
              {userMenu.applicationMenu.title}
            </Link>
          </Menu.Item>
        </React.Fragment>
      );
    });
  };

  const renderMenuLoading = () => {
    return (
      <>
        <Menu.Item>
          <Skeleton active={true} />
        </Menu.Item>
        <Menu.Item>
          <Skeleton active={true} />
        </Menu.Item>
        <Menu.Item>
          <Skeleton active={true} />
        </Menu.Item>
        <Menu.Item>
          <Skeleton active={true} />
        </Menu.Item>
      </>
    );
  };
  return (
    <>
      <Menu
        className="sidebar-menu"
        mode="inline"
        defaultSelectedKeys={[`${location.pathname}`]}
      >
        {profileLoading
          ? renderMenuLoading()
          : pgRoutes(profile && profile.role_id === 1).map(renderNavItems())}
        <Divider style={{ margin: "16px 0px" }} />
        {userMenuLoading ? renderMenuLoading() : renderApplicationNav()}
      </Menu>
    </>
  );
};
