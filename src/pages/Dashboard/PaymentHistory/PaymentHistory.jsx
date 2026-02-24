import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistories = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`,
      );
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
              <th>Tracking Id</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistories.map((history, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{history.parcelName}</td>
                <td>{history.amount}</td>
                <td>{history.transactionId}</td>
                <td>{history.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
