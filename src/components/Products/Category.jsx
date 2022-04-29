import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";

function Category(props) {
  const [category, setCategory] = useState({});
  const [state, setState] = useState({ nameUz: "", nameEng: "" });
  const { lang, auth } = useSelector((state) => state);
  // const { cart } = useSelector((state) => state.globalState);

  const getCategory = () => {
    axios
      .get("/api/category")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addCategory = () => {
    axios
      .post("/api/category", state, {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        console.log(res.data);
        getCategory();
        toast.success("Malumot qo'shildi", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const deleteCategory = (_id) => {
    console.log(_id);
    axios
      .delete(`/api/product/${_id}`)
      .then((res) => {
        console.log(res);
        getCategory();
      })
      .catch((err) => {
        console.log(err);
      });
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
                placeholder="Uz Category..."
                type="text"
                name="nameUz"
                onChange={handleInput}
              />
              <input
                className="form-control mb-3"
                placeholder="Eng Category..."
                type="text"
                name="nameEng"
                onChange={handleInput}
              />
              <button
                onClick={addCategory}
                className="btn btn-outline-success mb-3"
              >
                Add
              </button>
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
                    <button className="btn btn-warning me-2">
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
