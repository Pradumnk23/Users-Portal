import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Edit = ({ email }) => {
  const history = useNavigate();
  const getuser = localStorage.getItem("user_login");
  // console.log(getuser);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    email: email
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/create/user", {
        params: { email: email }
      });
      console.log(response.data);
      let cnt;
      for (let i = 0; i < response.data.length; i++) {
        const nemail = response.data[i].email;
        let newEmail = String(nemail); 
        let oldEmail = getuser.toString().trim();
        let oldEmail1 = oldEmail.replace('"','');
        let oldEmail2 = oldEmail1.replace('"','');

        // console.log(nemail);
        // console.log(newEmail);
        // console.log(oldEmail2);

        if (newEmail == oldEmail2) {
          cnt=i;
        }
      }
      setFormData({
        name: response.data[cnt].name,
        phone: response.data[cnt].phone,
        dob: response.data[cnt].dob,
        email: response.data[cnt].email
      });
    };
    fetchData();
  }, [email]);

  // console.log(setFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4001/create/edit`, formData);
      alert("Successfully updated the user!");
      history("/home")
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <>
      <div className="container mt-5" style={{ maxWidth:500, margin: "0 0px 0 500px" }}>
        <h2 className="text-center mb-4" style={{ color: "Purple" }}>Edit User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          <Button className="mb-3 col-lg-12" style={{maxWidth: 500, background: "rgb(67,100,127)", color: "#fff" , margin: "20px 0px 0 0px"}} type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </>
  );
};

export default Edit;
