import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

function Category(props) {
  const [category, setCategory] = useState({});
  const [state, setState] = useState({ nameUz: "", nameEng: "" });
  const { lang, auth } = useSelector((state) => state);
  const [isHidden, setIsHidden] = useState(true);
  const dispatch = useDispatch();
  // const {id}=useParams()

  const getCategory = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .get("/api/category")
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addCategory = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    {
      state.nameUz === "" && state.nameEng === ""
        ? toast.warning("Iltimos maydonni to'ldiring")
        : axios
            .post("/api/category", state, {
              headers: { Authorization: auth.accessToken },
            })
            .then((res) => {
              getCategory();
              toast.success("Malumot qo'shildi", {
                position: "top-center",
                autoClose: 3000,
              });
              dispatch({ type: globalTypes.LOADING, payload: false });
              setState({ nameUz: "", nameEng: "" });
            })
            .catch((err) => {
              console.log(err.response);
              dispatch({ type: globalTypes.LOADING, payload: false });
            });
    }
  };

  const deleteCategory = (id) => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .delete(`/api/category/${id}`, {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        console.log(res);
        getCategory();
        dispatch({ type: globalTypes.LOADING, payload: false });
        toast.success("Malumot o'chirildi", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  const saveCategory = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .put(`/api/category/${state._id}`, state, {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        getCategory();
        setIsHidden(true);
        toast.success("Malumot o'zgartirildi");
        setState({ nameUz: "", nameEng: "" });
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  const editCategory = (item) => {
    setState(item);
    setIsHidden(false);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="category">
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="box0">
              <input
                className="form-control mb-2"
                placeholder={`Uz ${langs[`${lang}`].category}...`}
                type="text"
                name="nameUz"
                value={state.nameUz}
                onChange={handleInput}
              />
              <input
                className="form-control mb-3"
                placeholder={`Eng ${langs[`${lang}`].category}...`}
                type="text"
                name="nameEng"
                value={state.nameEng}
                onChange={handleInput}
              />
              {isHidden ? (
                <button
                  onClick={addCategory}
                  className="btn btn-outline-success mb-3"
                >
                  {langs[`${lang}`].add}
                </button>
              ) : (
                <button
                  onClick={saveCategory}
                  className="btn btn-outline-warning mb-3"
                >
                  {langs[`${lang}`].taxrir}
                </button>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            {category.length &&
              category.map((item, index) => (
                <div
                  key={index}
                  className="d-sm-flex align-items-center justify-content-between border p-1 px-2"
                >
                  <p className="m-0">
                    Uz: {item.nameUz}, Eng: {item.nameEng}
                  </p>
                  <div>
                    <button
                      onClick={() => editCategory(item)}
                      className="btn btn-warning me-2"
                    >
                      {langs[`${lang}`].taxrir}
                    </button>
                    <button
                      onClick={() => deleteCategory(item._id)}
                      className="btn btn-danger"
                    >
                      {langs[`${lang}`].delete}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
