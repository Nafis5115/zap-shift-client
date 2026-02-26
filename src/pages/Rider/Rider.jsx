import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rider = () => {
  const regionData = useLoaderData();
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();

  const duplicateRegions = regionData.map((r) => r.region);
  const regions = Array(...new Set(duplicateRegions));
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = regionData.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure
      .post("/create-rider", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider application submitted!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="text-xl font-semibold">Apply as a Rider</h1>
      <div className="divider"></div>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="mt-4">
            <h1 className="text-lg font-semibold">Personal Information</h1>
            <div className="fieldset">
              <label className="label">Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                className="input w-full"
                placeholder="Full Name"
              />
            </div>
            <div className="fieldset">
              <label className="label">Email</label>
              <input
                {...register("email")}
                type="email"
                className="input w-full"
                placeholder="Email"
              />
            </div>
            <div className="fieldset">
              <label className="label">Phone</label>
              <input
                {...register("phone")}
                type="text"
                className="input w-full"
                placeholder="Phone"
              />
            </div>
            <div className="fieldset">
              <label className="label">Address</label>
              <input
                {...register("address")}
                type="text"
                className="input w-full"
                placeholder="Address"
              />
            </div>
            <fieldset className="fieldset">
              <label className="label">Regions</label>
              <select
                defaultValue="Pick a region"
                className="select w-full"
                {...register("riderRegion")}
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
                {...register("riderDistrict")}
              >
                <option disabled={true}>Pick a district</option>
                {districtByRegion(riderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-semibold">Vehicle Information</h1>
            <div className="fieldset">
              <label className="label">Vehicle Type</label>
              <select
                defaultValue="Pick a vehicle type"
                className="select w-full"
                {...register("vehicleType")}
              >
                <option disabled={true}>Pick a vehicle type</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div className="fieldset">
              <label className="label">Vehicle Number</label>
              <input
                {...register("vehicleNumber")}
                type="text"
                className="input w-full"
                placeholder="Vehicle Number"
              />
            </div>
            <div className="fieldset">
              <label className="label">Driving License Number</label>
              <input
                {...register("licenseNumber")}
                type="text"
                className="input w-full"
                placeholder="Driving License Number"
              />
            </div>
            <div className="fieldset">
              <label className="label">NID Number</label>
              <input
                {...register("nidNumber")}
                type="text"
                className="input w-full"
                placeholder="NID Number"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-black mt-4">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Rider;
