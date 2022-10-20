import React, { Fragment } from "react";
import Metadata from "../layout/Metadata";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import "./Profile.css"

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      history("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        isAuthenticated && (
          <div>
            <Metadata title={`Welcome`}></Metadata>
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt="User Profile" />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>

                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>

                <div>
                  <h4>Joined on</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>

                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default Profile;
