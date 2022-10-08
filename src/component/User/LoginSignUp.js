import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MailOutlinedIcon from "@mui/icons-material/MailOutline";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceIcon from "@mui/icons-material/Face";
import profile from "../../images/Profile.png";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginTab = useRef(null);
  const switcherTab = useRef(null);
  const registerTab = useRef(null);

  const loginSubmit = () => {
    console.log("Login Form Submited...");
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    console.log("Sign up Form Submitted...");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
console.log("file working")
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
console.log("name working")

      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p onClick={(e) => switchTabs(e, "login")}>Login</p>
            <p onClick={(e) => switchTabs(e, "register")}>Register</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className="loginForm" ref={loginTab} onClick={loginSubmit}>
          <div className="loginEmail">
            <MailOutlinedIcon />
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>

          <div className="loginPassword">
            <LockOpenOutlinedIcon />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link to="/password/forget">Forget Pasword</Link>
          <input type="submit" value="Login" className="loginBtn" />
        </form>

        <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div className="signName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            />
          </div>

          <div className="signEmail">
            <MailOutlinedIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>

          <div className="passwoed">
            <LockOpenOutlinedIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>

          <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" className="avatarPreview"/>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
            />
          </div>

          <input type="submit" value="Submit" className="signUpBtn" />
          {/* disabled={loading ? true : false} */}
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;
