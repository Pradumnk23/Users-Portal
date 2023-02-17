import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import signimg from "../Assets/4957136.jpg";
import synopsys from "../Assets/synopsys.png";
import login from "../Assets/login.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { bake_cookie } from "sfcookies";

const Login = () => {
  const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const s = [...Array(5)].map((_) => c[~~(Math.random() * c.length)]).join("");

  const cookie_key = "namedOFCookie";
  const history = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hi");
      console.log(formData);
      localStorage.setItem("user_login", JSON.stringify(formData.email));
      const response = await axios.post(
        "http://localhost:4001/create/login",
        formData
      );

      bake_cookie(cookie_key, s);
      console.log(response);
      history("/home");
    } catch (error) {
      alert("Invlaid Credentials");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <section className="d-flex justify-content-between">
          <div className="left mt-5 p-3" style={{ width: "100%" }}>
            <img
              src={synopsys}
              className="mb-3"
              style={{ maxWidth: 220, margin: "0 10px 0 90px" }}
              alt="synopsys"
            />
            <h2 className="text-center col-lg-6 mb-4" style={{ color: "red" }}>
              Sign In
            </h2>
            <Form style={{ textDecorationColor: "white" }}>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={onChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={onChange}
                  placeholder="Enter Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Keep me loged in" />
              </Form.Group>

              <Button
                variant="contained"
                className="col-lg-6"
                onClick={handleSubmit}
                style={{ background: "rgb(67,185,127)", color: "#fff" }}
                type="submit"
              >
                Login
              </Button>
              <p className="mt-3">
                Not Signed Up Yet ⛔{" "}
                <span>
                  <NavLink to="/">SigUp</NavLink>{" "}
                </span>
              </p>
            </Form>

            <img
              src={login}
              style={{ width: 400, margin: "25px 0 0 -13px" }}
              alt=""
            />
          </div>

          <div className="right">
            <div className="sign_img">
              <img
                src={signimg}
                style={{ width: 500, margin: "20px 5px 0 0" }}
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
