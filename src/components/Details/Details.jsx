import React, { useEffect } from "react";
import Store from "../../Redux/Store";
import { getItem } from "../../Redux/dataSlise";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function Details() {
  let dispatch = useDispatch();
  let { myItem } = useSelector((state) => state.dataReducer);
  let { mt, id } = useParams();
  useEffect(() => {
    dispatch(getItem({ mt, id }));
    console.log(myItem);
  }, []);
  let imgSrc = "https://image.tmdb.org/t/p/original";

  return (
    <div className="row py-5">
      <div class="card mb-3 text-dark" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src={imgSrc + myItem.profile_path} class="img-fluid rounded-start " alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{myItem.name}</h5>
        <p class="card-text"></p>
        <p class="card-text"><small class="text-body-secondary">{myItem.biography}</small></p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Date of Birth : {myItem.birthday}</li>
          <li className="list-group-item">Place of Birth : {myItem.place_of_birth}</li>
        </ul>

      </div>
    </div>
  </div>
</div>
      {/* <img
        src={imgSrc + myItem.profile_path}
        className="card-img-top w-25"
        alt="..."
      />

      <div className="card text-dark col-9 m-auto bg-light bg-opacity-60 ">
        <div className="card-body">
          <h5 className="card-title">{myItem.name}</h5>
          <p className="card-text">
           {myItem.biography}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Date of Birth : {myItem.birthday}</li>
          <li className="list-group-item">Place of Birth : {myItem.place_of_birth}</li>
        </ul>
        
      </div> */}
    </div>
  );
}
