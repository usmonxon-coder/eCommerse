import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function CreateProducts(props) {
  const [category, setCategory] = useState({});
  const { lang, auth, products } = useSelector((state) => state);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = {
    product_id: "",
    title: "",
    price: "",
    descriptionUz:
      "360° kabriolet Vivobook Go 14 Flip bilan dunyoni kashf eting.",
    descriptionEng:
      " Explore the world with the Vivobook Go 14 Flip, a 360°convertible.",
    contentUz:
      "Noutbuk va planshetni birlashtirgan ko‘p qirrali Vivobook Go 14 Flip atigi 1,45 kg og‘irlik qiladi, shuning uchun uni istalgan joyga bemalol o‘zingiz bilan olib ketishingiz mumkin. Qurilmaning apparat konfiguratsiyasi zamonaviy Intel Pentium  Silver protsessorini o'z ichiga oladi.",
    contentEng:
      "The versatile Vivobook Go 14 Flip, which combines a laptop and  a tablet, weighs only 1.45 kg, so you can easily take it anywhere with you.",
    categoryUz: "",
    categoryEng: "",
  };
  const [data, setData] = useState(initialState);

  const getCategory = () => {
    axios
      .get("/api/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const upload = (e) => {
    if (auth.user.role !== 1) return toast.error("Younare not admin");
    const file = e.target.files[0];
    if (!file) return toast.error("File not exist.");
    if (file.size > 1024 * 1024 * 5) return toast.error("File size too large");
    if (!(file.type === "image/png" || file.type === "image/jpeg"))
      return toast.error("File format is inCorrect");
    const formData = new FormData();
    formData.append("file", file);
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .post("/api/upload", formData, {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        console.log(res);
        setImages(res.data);
        dispatch({ type: globalTypes.LOADING, payload: false });
        let myData = data;
        myData.images = res.data;
        setData(myData);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const destroy = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .post(
        "/api/destroy",
        { public_id: images.public_id },
        { headers: { Authorization: auth.accessToken } }
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: globalTypes.LOADING, payload: false });
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
    setImages("");
  };
  const createProduct = (e) => {
    e.preventDefault();
    axios
      .post("/api/products", data, {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg);
      });
    setData(initialState);
    setImages("");
    // navigate("/");
  };

  const editProduct = () => {
    axios
      .put(`/api/product/:id`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const selectCategory = (e) => {
    let myCategory = e.target.value;
    if (lang === "Uz") {
      let categoryEng = category.find(
        (item) => item.nameUz === myCategory
      ).nameEng;
      setData({ ...data, categoryUz: myCategory, categoryEng });
    }
    if (lang === "Eng") {
      let categoryUz = category.find(
        (item) => item.nameEng === myCategory
      ).nameUz;
      setData({ ...data, categoryEng: myCategory, categoryUz });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="createProducts">
      <div className="container">
        <div className="row mt-5 align-items-center">
          <div className="col-md-4 offset-md-1 mb-md-0 mb-3">
            <div className="card1 border w-100 text-center">
              <input
                onChange={upload}
                className={`w-100 h-100 ${images ? "noFile" : "file"} `}
                type="file"
              />
              {images ? (
                <img className="w-100 " src={images.url} alt="rasm" />
              ) : (
                <div style={{ height: "500px" }}>
                  {" "}
                  <img
                    style={{ padding: "180px 20px" }}
                    className="w-50"
                    src="/images/plus.png"
                    alt="rasm"
                  />
                </div>
              )}

              <span onClick={destroy} className="close">
                X
              </span>
            </div>
          </div>
          <div className="col-md-6 offset-md-1">
            <div className="card2">
              <form onSubmit={createProduct}>
                <input
                  className="form-control mb-2"
                  placeholder="Productid..."
                  type="text"
                  name="product_id"
                  onChange={handleInput}
                />
                <input
                  className="form-control mb-2"
                  placeholder="TitleUz..."
                  type="text"
                  name="titleUz"
                  onChange={handleInput}
                />
                <input
                  className="form-control mb-2"
                  placeholder="TitleEng..."
                  type="text"
                  name="titleEng"
                  onChange={handleInput}
                />
                <input
                  className="form-control mb-2"
                  placeholder={`${langs[`${lang}`].price}...`}
                  type="text"
                  name="price"
                  onChange={handleInput}
                />
                <textarea
                  className="form-control mb-2"
                  name="descriptionUz"
                  cols="30"
                  rows="3"
                  onChange={handleInput}
                >
                  {data.descriptionUz}
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name="descriptionEng"
                  id=""
                  cols="30"
                  rows="3"
                  onChange={handleInput}
                >
                  {data.descriptionEng}
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name="contentUz"
                  id=""
                  cols="30"
                  rows="4"
                  onChange={handleInput}
                >
                  {data.contentUz}
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name="contentEng"
                  id=""
                  cols="30"
                  rows="4"
                  onChange={handleInput}
                >
                  {data.contentEng}
                </textarea>
                <select
                  onChange={selectCategory}
                  className="form-control mb-2 form-select"
                  name=""
                  id=""
                >
                  <option value="">{langs[`${lang}`].selectCategory}</option>
                  {category.length &&
                    category.map((item, index) => (
                      <option
                        onChange={handleInput}
                        key={index}
                        value={item[`name${lang}`]}
                      >
                        {item[`name${lang}`]}
                      </option>
                    ))}
                </select>
                <button className="btn btn-danger form-control mb-2">
                  {langs[`${lang}`].create}
                </button>
                <button
                  onClick={() => editProduct()}
                  className="btn btn-danger form-control"
                >
                  Taxrirlash...
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
