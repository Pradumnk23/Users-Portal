import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import homee from "../Assets/welcome.jpg";
import signimg from "../Assets/4957136.jpg";
import {  NavLink, useNavigate } from "react-router-dom";
import { bake_cookie, delete_cookie } from "sfcookies";
import axios from "axios";

const Homee = () => {

  const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const s = [...Array(5)].map((_) => c[~~(Math.random() * c.length)]).join("");

  const cookie_key = "namedOFCookie";
  const history = useNavigate();

  const logout = () => {
    delete_cookie(cookie_key);
    localStorage.removeItem("user_login");
    history("/");
  };

  const edit = async () => {
    history("/edit");
  }

  const account = async () => {
    
    history("/account");
  };

  const [logindata, setlogindata] = useState([]);
  
  console.log(logindata);

  const user = () => {
    const getuser = localStorage.getItem("user_login");

    if (getuser && getuser.length) {
      const user = JSON.parse(getuser);
      bake_cookie(cookie_key, s);
      setlogindata(user);
      
    }
  };

  useEffect(() => {
    user();
  }, []);

  return (
    <>
      {logindata.length === 0 ? (
        <>
          <div className="sign_img">
            <img
              src={signimg}
              style={{ width: 450, margin: "0px 5px 0 550px" }}
              alt=""
            />
          </div>
          <p
            className="mt-3"
            style={{
              fontSize: "50px",
              color: "black",
              margin: "0px 0px 0 650px",
            }}
          >
            Please{" "}
            <span>
              <NavLink to="/login">SigIn</NavLink>{" "}
            </span>
          </p>
        </>
      ) : (
        <>
        <p>
          <Button
            variant="contained"
            className="col-lg-1"
            onClick={logout}
            style={{
              margin: "10px 0px 0 1300px",
              background: "#DC143C",
              color: "#fff",
            }}
          >
            Log Out{" "}
          </Button>

          <Button
            variant="contained"
            className="col-lg-1"
            onClick={edit}
            style={{
              margin: "-58px 5px 0 755px",
              
              background: "#800080",
              color: "#fff",
            }}
          >
            Edit User
          </Button>

          <Button
            variant="contained"
            className="col-lg-1"
            onClick={account}
            style={{
              margin: "-58px 20px 0 -250px",
              background: "rgb(67,100,127)",
              color: "#fff",
            }}
          >
            Search User
          </Button>
          </p>
          <p
            className="mt-3"
            style={{
              textAlign: "center",
              fontSize: "50px",
              color: "darkorange",
            }}
          >
            Hi!👋{logindata}
        
          </p>

          <img
            src={homee}
            style={{ width: "55%", margin: "0 0 0 350px" }}
            alt="Welcome to Home Page"
          />
        </>
      )}
    </>
  );
};

export default Homee;
