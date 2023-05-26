import React, { useEffect } from 'react'
import Store from '../../Redux/Store'
import { getData } from '../../Redux/dataSlise'
import { useDispatch, useSelector } from 'react-redux'
export default function Movies() {
  let dispatch=useDispatch()
  let {myItems}=useSelector((state)=>state.dataReducer)
  useEffect(()=>{
    dispatch(getData('movie'))
  },[])
  let imgSrc = "https://image.tmdb.org/t/p/original";


  return (<>
  <div className="row py-5">
        <div className="col-md-4">
          <div>
            <hr  className="w-25"/>
            <div>
              <h2>Trending</h2>
              <h2>Movies</h2>
              <h2>To watch out</h2>

              <p className="text-muted">Lorem ipsum dolor sit amet.</p>
            </div>
            <hr  className="w-100"/>
          </div>
        </div>
        {myItems?.map((item, i) => (
          <div className="col-2 p-2" key={i}>
            <div className="item ">
              <img src={imgSrc + item.poster_path} alt="" className="w-100" />
              <h5 className="my-2">
                {item.title}
                {item.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
  </>
  )
}
