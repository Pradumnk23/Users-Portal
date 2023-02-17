import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import signimg from "../Assets/Data_security_05.jpg";
import synopsys from "../Assets/synopsys.png";
import social from "../Assets/social.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { bake_cookie } from "sfcookies";

const Home = () => {
  const cookie_key = "namedOFCookie";
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
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
      // console.log(formData);
      if (formData.name === "") {
        alert("Please Enter Name");
      } else if (!formData.email.includes("@")) {
        alert("Enter Valid Email");
      } else if (formData.password.length < 5 || formData.password === "") {
        alert("Enter Valid Password of more than 4 Character");
      } else {
        const response = await axios.post(
          "http://localhost:4001/create/register",
          formData
        );
        console.log(response);
        bake_cookie(cookie_key, "register");
        alert("Registration Successfull");
        history("/login");
      }
    } catch (error) {
      alert("User already Registered");
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <section className="d-flex justify-content-between">
          <div className="left mt-1 ml-5 p-3" style={{ width: "100%" }}>
            <img
              src={synopsys}
              className="mb-3"
              style={{ maxWidth: 220, margin: "0 10px 0 75px" }}
              alt="synopsys"
            />
            <h2 className="text-center col-lg-6 mb-4">Sign Up</h2>
            <Form style={{ textDecorationColor: "white" }}>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={onChange}
                  placeholder="Enter Your Name"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPhone">
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={onChange}
                  placeholder="Your Phone No : "
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicDob">
                <Form.Control
                  type="text"
                  name="dob"
                  onChange={onChange}
                  placeholder="Your DOB : dd-mm-yyyy"
                />
              </Form.Group>

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

              <Button
                variant="contained"
                className="col-lg-6"
                onClick={handleSubmit}
                style={{ background: "rgb(67,185,127)", color: "#fff" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account 😎{" "}
              <span>
                <NavLink to="/login">SigIn</NavLink>{" "}
              </span>
            </p>
            <span>
              <img
                src={social}
                style={{ width: 400, margin: "5px 10px 0 -15px" }}
                alt=""
              />
            </span>
          </div>

          <div className="right">
            <div className="sign_img">
              <img
                src={signimg}
                style={{ width: 530, margin: "50px 5px 0 0" }}
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
