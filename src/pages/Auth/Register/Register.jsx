import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    const profileImg = data.photo[0];
    const name = data.name;
    registerUser(email, password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
        axios
          .post(imageApiUrl, formData)
          .then((res) => {
            console.log(res);
            const updateProfile = {
              displayName: name,
              photoURL: res.data.data.url,
            };
            updateUserProfile(updateProfile)
              .then(() => {
                console.log("Profile updated done");
                axiosSecure
                  .post("/create-user", {
                    name: name,
                    email: result.user.email,
                    role: "user",
                  })
                  .then((res) => console.log(res.data))
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <label className="label">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="input"
          placeholder="Name"
        />
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="input"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500">Email is required</p>
        )}
        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input"
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500">Password is required.</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">Password must be 6 character.</p>
        )}
        <label className="label">Profile Photo</label>
        <input type="file" className="file-input" {...register("photo")} />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Register</button>
      </fieldset>
      <Link to={"/login"} className="text-blue-500">
        Login
      </Link>
    </form>
  );
};

export default Register;
