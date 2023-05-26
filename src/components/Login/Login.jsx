import axios from "axios";
import joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({getToken}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
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
        "https://sticky-note-fe.vercel.app/signin",
        user
      );
      if (data.message == "success") {
        //goto login
        localStorage.setItem('token',data.token)
        getToken()
        gotoHome();
      } else {
        // already registered
        setErrorMsg(data.message);
        console.log(errorMsg);
      }
    }
  };
  const gotoHome = () => {
    navigate("/");
    
  };
  const handelChange = (e) => {
    let newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
    console.log(newUser);
  };
  let validation = () => {
    let schema = joi.object({
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password:joi.string().pattern(new RegExp(/^[a-z][0-9]{3}$/))
    });
    return schema.validate(user, { abortEarly: false });
  };

  return (
    <div className=" w-75 m-auto py-5">
    <h2>Login Form</h2>
    <form className="" onSubmit={submitForm}>
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
  )
}
