import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Login(props) {
  const initialState = { email: "", password: "" };
  const [state, setState] = useState(initialState);
  const { lang, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .post("/user/login", state)
      .then((res) => {
        dispatch({ type: globalTypes.AUTH, payload: res.data });
        console.log(res);
        localStorage.setItem("isLogin", true);
        navigate("/");
        dispatch({ type: globalTypes.LOADING, payload: false });
        dispatch({
          type: globalTypes.ADD_TO_CART,
          payload: res.data.user.cart,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: "top-center",
        });
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <div className="login register">
      <div className="container">
        <div className="boxes mx-auto d-flex align-items-center justify-content-center">
          <div className="box p-4">
            <h2 className="text-center my-3">{langs[`${lang}`].login0}</h2>
            <form onSubmit={handleSubmit}>
              <input
                required
                className="form-control mb-3"
                type="email"
                placeholder="Enter your email..."
                name="email"
                value={state.email}
                onChange={handleInput}
              />
              <input
                required
                className="form-control mb-3"
                type="password"
                placeholder="Enter your password..."
                name="password"
                value={state.password}
                onChange={handleInput}
              />
              <button className="btn btn-info w-100 mb-3 d-block mx-auto">
                {langs[`${lang}`].login0}
              </button>
            </form>
            <Link className="link" to="/register">
              {langs[`${lang}`].notRegister}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
