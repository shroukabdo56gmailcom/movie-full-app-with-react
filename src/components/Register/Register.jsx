import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [erroesList, setErrorsList] = useState([]);
  const submitForm = async (e) => {
    e.preventDefault();
    let vRes = validation();
    // console.log(vRes.error.toString().includes('age'));
    if (vRes.error) {
      // alert("3ndak errors");
      setErrorsList(vRes.error.details);
      console.log(erroesList);
    } else {
      let { data } = await axios.post(
        "https://sticky-note-fe.vercel.app/signup",
        user
      );
      if (data.message == "success") {
        //goto login
        gotoLogin();
      } else {
        // already registered
        setErrorMsg(data.message);
        console.log(errorMsg);
      }
    }
  };
  const gotoLogin = () => {
    navigate("/login");
  };
  const handelChange = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
    console.log(newUser);
  };
  let validation = () => {
    let schema = joi.object({
      first_name: joi.string().required().min(2).max(10).alphanum(),
      last_name: joi.string().required().min(2).max(10).alphanum(),
      age: joi.number().required().min(18).max(70),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
        password:joi.string().pattern(new RegExp(/^[a-z][0-9]{3}$/))

    });
    return schema.validate(user, { abortEarly: false });
  };
  return (
    <>
      <div className=" w-75 m-auto py-5">
        <h2>Registration Form</h2>
        <form className="" onSubmit={submitForm}>
          <div>
            <label htmlFor="First Name"> first Name</label>
            <input
              type="text"
              onChange={handelChange}
              className="form-control my-1"
              name="first_name"
            />
          </div>
          <div>
            <label htmlFor="Last Name">Last Name</label>
            <input
              onChange={handelChange}
              type="text"
              className="form-control my-1"
              name="last_name"
            />
          </div>
          <div>
            <label htmlFor="age"> age</label>
            <input
              type="number"
              onChange={handelChange}
              className="form-control my-1"
              name="age"
            />
          </div>
          <div>
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              onChange={handelChange}
              className="form-control my-1"
              name="email"
            />
          </div>
          <div>
            <label htmlFor="passeord"> Password</label>
            <input
              type="password"
              className="form-control my-1"
              name="password"
              onChange={handelChange}
            />
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button className="btn btn-info float my-2 " type="submit">
            Submit
          </button>
          <div className="clear-fix"></div>
          {erroesList?.map((err) => (
            <div className="text-danger">{err.message}</div>
          ))}
        </form>
      </div>
    </>
  );
}
