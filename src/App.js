import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/MasterLayout/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Movies from "./components/Movies/Movies";
import TV from "./components/TV/TV";
import People from "./components/People/People";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Protected from "./components/ProtectedRoute/Protected";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Details from "./components/Details/Details";

function App() {
  //hmsek fe edy aluser data
  let [userData, setUserData] = useState(null);
  const getToken = () => {
    let encoded = localStorage.getItem("token");
    let decoded = jwtDecode(encoded);
    console.log(decoded);
    setUserData(decoded);
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to="login" />;
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getToken();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "",
      errorElement: <Notfound />,
      element: <Layout userData={userData} logOut={logOut} />,
      children: [
        {
          index: true,
          element: (
            <Protected userData={userData}>
              <Home />
            </Protected>
          ),
        },
        { path: "about", element: <About /> },
        {
          path: "movies",
          element: (
            <Protected userData={userData}>
              {" "}
              <Movies />
            </Protected>
          ),
        },
        {
          path: "tv",
          element: (
            <Protected userData={userData}>
              <TV />
            </Protected>
          ),
        },
        {
          path: "people",
          element: <Protected userData={userData}> <People/> </Protected>,
        },
        { path: "register", element: <Register/> },
        { path: "/:mt/:id", element: <Details /> },
        { path: "login", element: <Login getToken={getToken} /> },
      ],
    },
  ]);
  return (
    <Provider store={Store}>
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    </Provider>
  );
}

export default App;
