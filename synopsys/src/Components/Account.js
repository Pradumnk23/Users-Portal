import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import synopsys from "../Assets/synopsys.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, FormControl } from "react-bootstrap";

const Account = (props) => {

  const history = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    email:""
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/create/user");
      console.log(response.data);
      setData(response.data);
      const getuser = localStorage.getItem("user_login");
      console.log(getuser);
      for (let i = 0; i < response.data.length; i++) {
        const newEmail = `${response.data[i].email}`;
        const oldEmail = `${getuser}`;
        if(newEmail == oldEmail) {
          console.log('working');
        }
      }
      setFormData({
        name: response.data.name,
        phone: response.data.phone,
        dob: response.data.dob,
        email: response.data.email
      });
    };
    fetchData();
  }, [props.email]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // console.log(data[0].email);
  const edit = async (id) => {
    
    history("/home");
  }; 


  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.dob.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <div className="container mt-5">
        <section className="d-flex justify-content-between">
          <div
            className="left mt-1 ml-5 p-3"
            style={{ width: "100%", margin: "0 0px 0 400px" }}
          >
            <img
              src={synopsys}
              className="mb-3"
              style={{ maxWidth: 220, margin: "0 0px 0 90px" }}
              alt="synopsys"
            />

            <h2
              className="text-center  mb-4 "
              style={{ color: "Green", margin: "0 450px 0 -20px" }}
            >
              User Details
            </h2>
            <Form inline className="mb-3">
              <FormControl
                type="text"
                placeholder="Search User"
                className="mr-sm-6"
                style={{ maxWidth: 600, margin: "0 10px 0 -100px" }}
                value={search}
                onChange={handleSearch}
              />
            </Form>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}></tr>
              ))}
            </tbody>
            <Table
              striped
              bordered
              hover
              className="text-center col-lg-6 mb-4"
              style={{ maxWidth: 600, margin: "0 10px 0 -100px" }}
            >
              <thead>
                <tr>
                  <th >Name</th>
                  <th>Phone</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
               <tbody> 
                {filteredData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button
              variant="contained"
              className="mb-3 col-lg-12"
              onClick={edit}
              style={{maxWidth: 600, background: "rgb(67,100,127)", color: "#fff" , margin: "0 0px 0 -100px"}}
              type="submit"
            >
              Go to Homepage
            </Button>
      
          </div>
        </section>
      </div>
    </>
  );
};

export default Account;
