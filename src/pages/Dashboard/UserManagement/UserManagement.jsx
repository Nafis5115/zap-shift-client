import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-users`);
      return res.data;
    },
  });

  const updateRole = (user, role) => {
    const roleInfo = { role: role };
    axiosSecure
      .patch(`/user-admin-role/${user._id}`, roleInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            title: `${user.name} is mark as admin`,
            timer: 2000,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const handleMakeAdmin = (user) => {
    updateRole(user, "admin");
  };
  const handleRemoveAdmin = (user) => {
    updateRole(user, "user");
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin Actions</th>
            <th>Others Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex gap-4">
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="btn btn-primary text-black"
                >
                  Make admin
                </button>
                <button
                  onClick={() => handleRemoveAdmin(user)}
                  className="btn btn-secondary"
                >
                  Remove admin
                </button>
              </td>
              <td>
                <button className="btn btn-error ">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
