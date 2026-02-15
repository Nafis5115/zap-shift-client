import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcels = [] } = useQuery({
    queryKey: ["MyParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Receiver Email</th>
              <th>Payment</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.receiverEmail}</td>
                <td>
                  <Link
                    to={`/dashboard/payment/${parcel._id}`}
                    className="btn btn-primary text-black"
                  >
                    {parcel.paymentStatus === "paid" ? "Paid" : "Pay now"}
                  </Link>
                </td>
                <td>{parcel.deliveryCost}</td>
                <td>
                  <div className="flex gap-4">
                    <button className="btn btn-info text-black">View</button>
                    <button className="btn btn-secondary">Update</button>
                    <button className="btn btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
