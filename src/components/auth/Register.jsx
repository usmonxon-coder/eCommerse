import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";
import "../../Styles/Register.css";

export default function Register(props) {
  const initialState = { name: "", email: "", password: "" };
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lang, auth } = useSelector((state) => state);

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
      .post("/user/register", state)
      .then((res) => {
        console.log(res);
        navigate("/login");
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
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
    <div className="register">
      <div className="container">
        <div className="boxes mx-auto d-flex align-items-center justify-content-center">
          <div className="box p-4">
            <h3 className="text-center my-3">{langs[`${lang}`].register}</h3>
            <form onSubmit={handleSubmit}>
              <input
                required
                className="form-control mb-3"
                type="text"
                placeholder="Enter your name"
                name="name"
                value={state.name}
                onChange={handleInput}
              />
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
                {langs[`${lang}`].register}
              </button>
            </form>
            <Link className="link" to="/login">
              {langs[`${lang}`].notLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
