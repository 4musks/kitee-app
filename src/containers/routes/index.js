import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import SignUpContainer from "../auth/signup";
import SignInContainer from "../auth/signin";
import DashboardContainer from "../dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import PageNotFound from "../../components/PageNotFound";
import NavBar from "../../components/NavBar";
import ProfileSideBar from "../../components/ProfileSideBar";
import Spinner from "../../components/Spinner";
import { KITEE_TOKEN } from "../../utils/constants";
import { getUserInfo } from "../../api";
import "./styles.css";

const shouldRenderNavBar = () => {
  if (
    window.location.pathname.includes("/form/") ||
    window.location.pathname.includes("/signup") ||
    window.location.pathname.includes("/signin")
  ) {
    return false;
  }

  return true;
};

const RootContainer = () => {
  const [user, setUser] = useState({ name: "", avatar: "", isLoggedIn: false });

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [selectedNavSection, setSelectedNavSection] = useState("");

  const [profileSideBarAnchorEl, setProfileSideBarAnchorEl] = useState(null);

  const handleProfileSidebarOpen = () => {
    setProfileSideBarAnchorEl(true);
  };

  const handleProfileSidebarClose = () => {
    setProfileSideBarAnchorEl(null);
  };

  const handleNavigationSectionChange = (section) => {
    setSelectedNavSection(section);
  };

  const handleSettingsSectionChange = () => {
    handleProfileSidebarClose();
  };

  const getUserInfoHandler = async () => {
    const response = await getUserInfo();

    if (response && response.success && response.data) {
      setUser({ ...response.data, isLoggedIn: true });
    } else {
      localStorage.removeItem(KITEE_TOKEN);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(KITEE_TOKEN);
    window.location.href = "/signin";
  };

  const handleBreadcrumbs = (crumbs) => {
    setBreadcrumbs(crumbs);
  };

  useEffect(() => {
    if (
      !window.location.pathname.includes("/form/") &&
      localStorage.getItem(KITEE_TOKEN)
    ) {
      getUserInfoHandler();
    }
  }, []);

  return (
    <Router>
      {user.isLoggedIn && (
        <div>
          {user && user.isLoggedIn && shouldRenderNavBar() && (
            <NavBar
              selectedSection={selectedNavSection}
              setSelectedSection={handleNavigationSectionChange}
              name={user.name}
              breadcrumbs={breadcrumbs}
              handleBreadcrumbs={handleBreadcrumbs}
              handleProfileSidebarOpen={handleProfileSidebarOpen}
            />
          )}
        </div>
      )}

      {localStorage.getItem(KITEE_TOKEN) &&
      !user.isLoggedIn &&
      !window.location.pathname.includes("/form/") ? (
        <div className="root-loader-container">
          <Spinner
            loading={
              localStorage.getItem(KITEE_TOKEN) &&
              !user.isLoggedIn &&
              !window.location.pathname.includes("/form/")
            }
          />
        </div>
      ) : (
        <div>
          <Drawer
            open={Boolean(profileSideBarAnchorEl)}
            anchor="right"
            onClose={handleProfileSidebarClose}
          >
            <ProfileSideBar
              name={user.name}
              avatar={user.avatar}
              handleSettingsSectionChange={handleSettingsSectionChange}
              handleClose={handleProfileSidebarClose}
              handleLogout={handleLogout}
            />
          </Drawer>

          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUpContainer
                  {...props}
                  getUserInfo={getUserInfoHandler}
                  isLoggedIn={user.isLoggedIn}
                />
              )}
            />

            <Route
              exact
              path="/signin"
              render={(props) => (
                <SignInContainer
                  {...props}
                  getUserInfo={getUserInfoHandler}
                  isLoggedIn={user.isLoggedIn}
                />
              )}
            />

            <ProtectedRoute
              exact
              path="/dashboard"
              isLoggedIn={user.isLoggedIn}
              render={(props) => (
                <DashboardContainer
                  {...props}
                  breadcrumbs={breadcrumbs}
                  handleBreadcrumbs={handleBreadcrumbs}
                />
              )}
            />

            <Redirect from="/" exact to="/signin" />

            <Route
              exact
              path="*"
              render={(props) => <PageNotFound {...props} />}
            />
          </Switch>
        </div>
      )}
    </Router>
  );
};

export default RootContainer;
