import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const TrackParcel = () => {
  const params = useParams();
  const axiosInstance = useAxios();
  const { data: trackings = [] } = useQuery({
    queryKey: ["tracking", params.id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/get-parcel-log/${params.id}`);

      return res.data;
    },
  });
  return (
    <div>
      <h1>Track parcel: {params.id}</h1>
      <ul className="timeline timeline-vertical">
        {trackings.map((tracking) => (
          <li key={tracking._id}>
            <div className="timeline-start">
              {new Date(tracking.createdAt).toLocaleString()}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">{tracking.details}</div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackParcel;
