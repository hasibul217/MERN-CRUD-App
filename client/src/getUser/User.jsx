import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const User = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/allUsers");
        setUser(response.data);
      } catch (error) {
        console.log("Error while fetching data");
      }
    };
    fetchData();
  }, []);

  

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
      setUser(users.filter((user) => user._id !== id)); // Update state after deletion
      toast.success(response.data.message, { position: "top-right" }); // Display success message
    } catch (error) {
      console.log("Error while deleting user:", error);
      toast.error("Error while deleting user", { position: "top-right" }); // Display error message
    }
  };
  

  return (
    <div className="userTable">
      <Link to="/add" type="button" class="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionButton">
                  <Link to={`/update/` + user._id} type="button" class="btn btn-info" style={{ marginRight: "15px" }}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button type="button" class="btn btn-danger"
                  onClick={() => deleteUser(user._id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
