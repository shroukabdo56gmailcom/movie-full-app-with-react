import React, { useEffect, useState } from "react";
import Store from "../../Redux/Store";
import { getData } from "../../Redux/dataSlise";
import { useDispatch, useSelector } from "react-redux";
import img from "../../sY2mwpafcwqyYS1sOySu1MENDse.jpg";
import user from "../../user.png";
import { Link } from "react-router-dom";

export default function People() {
  const dispatch = useDispatch();
  const { myItems } = useSelector((state) => state.dataReducer);
  const [isLoading, setIsLoading] = useState(true); // <-- add state variable

  useEffect(() => {
    dispatch(getData("person")).then(() => setIsLoading(false)); // <-- set isLoading to false when data is loaded
  }, [dispatch]);

  let imgSrc = "https://image.tmdb.org/t/p/original";

  return (
    <div className="row py-5 placeholder-glow">
      <div className="col-md-4">
        <div>
          <hr className="w-25" />
          <div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch out</h2>

            <p className="text-muted">Lorem ipsum dolor sit amet.</p>
          </div>
          <hr className="w-100" />
        </div>
      </div>
      {isLoading && (
        <>
          {" "}
          {[...Array(6)].map((_, i) => (
            <div className="col-2 p-2 placeholder-glow " key={i}>
              <img src={user} className="w-100 my-2 " alt="" />
              <h3 className="placeholder col-12"></h3>
            </div>
          ))}
        </>
      )}{" "}
      {!isLoading && (
        <>
          {myItems?.map((item, i) => (
            <Link className="col-2 p-2" key={i} to={`/person/${item.id}`} >
              <div className="item ">
                <img
                  src={item.profile_path ? imgSrc + item.profile_path : img}
                  alt=""
                  className="w-100"
                />
                <h5 className="my-2">
                  {item.title}
                  {item.name}
                </h5>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
