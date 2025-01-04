import React, { useEffect, useState } from "react";
import "./updateUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);

  const navigate = useNavigate();

  const {id} = useParams();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  useEffect (()=> {
    axios.get(`http://localhost:8000/api/user/${id}`)
    .then((response) => {
        
        setUser(response.data);
        })
        .catch((error) => {
            console.error(error);
            });
  },[id])




  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message,{position:"top-right"})
        navigate("/");
      })
      .catch((error) => {
        console.log("Error updating user");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="form-container">
        <Link to="/" type="button" class="btn btn-secondary">
          <i class="fa-solid fa-backward"></i> Back
        </Link>
        <h2 className="text-center">Update User Form</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter your name"
              onChange={inputHandler}
              name="name"
              value={user.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter your email"
              onChange={inputHandler}
              name="email"
              value={user.email}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Enter your address"
              name="address"
              value={user.address}
              onChange={inputHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
