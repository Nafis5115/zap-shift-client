import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const regionData = useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const duplicateRegions = regionData.map((r) => r.region);
  const regions = Array(...new Set(duplicateRegions));
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtByRegion = (region) => {
    const regionDistricts = regionData.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  const axiosSecure = useAxiosSecure();

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        data.deliveryCost = cost;
        axiosSecure
          .post("/create-parcel", data)
          .then((data) => console.log(data.data))
          .catch((e) => console.log(e));
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="text-xl font-semibold">Enter your parcel details</h1>
      <div className="divider"></div>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        <div className="flex gap-4">
          <label className="flex gap-2 items-center cursor-pointer">
            <input
              {...register("parcelType")}
              value={"document"}
              type="radio"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="flex gap-2 items-center cursor-pointer">
            <input
              {...register("parcelType")}
              value={"non-document"}
              type="radio"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              {...register("parcelName")}
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
            />
          </div>
          <div className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              {...register("parcelWeight")}
              type="number"
              step="0.1"
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </div>
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Details */}

          <div className="mt-4">
            <h1 className="text-lg font-semibold">Sender Details</h1>
            <div className="fieldset">
              <label className="label">Sender Name</label>
              <input
                {...register("senderName")}
                type="text"
                className="input w-full"
                placeholder="Sender Name"
              />
            </div>
            <div className="fieldset">
              <label className="label">Sender Email</label>
              <input
                {...register("senderEmail")}
                type="email"
                className="input w-full"
                placeholder="Sender Email"
              />
            </div>
            <div className="fieldset">
              <label className="label">Address</label>
              <input
                {...register("senderAddress")}
                type="text"
                className="input w-full"
                placeholder="Address"
              />
            </div>
            <div className="fieldset">
              <label className="label">Sender Phone</label>
              <input
                {...register("senderPhone")}
                type="text"
                className="input w-full"
                placeholder="Sender Phone"
              />
            </div>
            <fieldset className="fieldset">
              <label className="label">Regions</label>
              <select
                defaultValue="Pick a region"
                className="select w-full"
                {...register("senderRegion")}
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Districts</label>
              <select
                defaultValue="Pick a district"
                className="select w-full"
                {...register("senderDistrict")}
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          {/* Receiver Details */}
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Receiver Details</h1>
            <div className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                {...register("receiverName")}
                type="text"
                className="input w-full"
                placeholder="Receiver Name"
              />
            </div>
            <div className="fieldset">
              <label className="label">Receiver Email</label>
              <input
                {...register("receiverEmail")}
                type="email"
                className="input w-full"
                placeholder="Receiver Email"
              />
            </div>
            <div className="fieldset">
              <label className="label">Address</label>
              <input
                {...register("receiverAddress")}
                type="text"
                className="input w-full"
                placeholder="Address"
              />
            </div>
            <div className="fieldset">
              <label className="label">Receiver Phone</label>
              <input
                {...register("receiverPhone")}
                type="text"
                className="input w-full"
                placeholder="Receiver Phone"
              />
            </div>
            <fieldset className="fieldset">
              <label className="label">Regions</label>
              <select
                defaultValue="Pick a region"
                className="select w-full"
                {...register("receiverRegion")}
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Districts</label>
              <select
                defaultValue="Pick a district"
                className="select w-full"
                {...register("receiverDistrict")}
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-black mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
