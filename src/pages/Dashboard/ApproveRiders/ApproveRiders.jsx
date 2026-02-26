import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["rider", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-riders");
      return res.data;
    },
  });

  const updateStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure
      .patch(`/update-rider-status/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            title: `Rider has been ${status}`,
            timer: 2000,
          });
        }
      });
  };

  const handleApproveRider = (rider) => {
    updateStatus(rider, "approved");
  };

  const handleRejectRider = (rider) => {
    updateStatus(rider, "rejected");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <th>{index + 1}</th>
              <td>{rider.fullName}</td>
              <td>{rider.email}</td>
              <td
                className={`${rider.status === "approved" ? "text-green-500" : rider.status === "rejected" ? "text-red-500" : "text-yellow-500"} `}
              >
                {rider.status}
              </td>
              <td className="flex gap-4">
                <button
                  onClick={() => handleApproveRider(rider)}
                  className="btn btn-primary text-black"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectRider(rider)}
                  className="btn btn-secondary"
                >
                  Reject
                </button>
                <button className="btn btn-error ">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRiders;
