import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider-parcels?riderEmail=${user?.email}&deliveryStatus=driver-assigned`,
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderEmail: user?.email,
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            title: `Thank you for accepting.`,
            timer: 2000,
          });
        }
      });
  };

  return (
    <div>
      <h2>AssignedParcels: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Delivery Cost</th>
              <th>Address</th>
              <th>Confirm</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryCost}</td>
                <td>{parcel.receiverAddress}</td>
                <td>
                  {parcel.deliveryStatus !== "rider-arriving" &&
                  parcel.deliveryStatus !== "picked-up" &&
                  parcel.deliveryStatus !== "delivered" ? (
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider-arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-error text-black">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <h1>Accepted</h1>
                  )}
                </td>
                <td className="flex gap-4">
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "picked-up")
                    }
                    className="btn btn-info text-black"
                  >
                    Picked up
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "delivered")
                    }
                    className="btn btn-primary text-black"
                  >
                    Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedParcels;
