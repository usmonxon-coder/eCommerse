import React from "react";
import { Link } from "react-router-dom";

export default function CreateProducts(props) {
  return (
    <div className="createProducts">
      <div className="container">
        <div className="row mt-5 align-items-center">
          <div className="col-md-4 offset-md-1 mb-md-0 mb-3">
            <Link to="/r">
              <div className="card1 border w-100 text-center">
                <img
                  style={{ padding: "180px 20px 180px 20px" }}
                  className="w-50 "
                  src="/images/plus.png"
                  alt="rasm"
                />
                <span className="close position-absolute">X</span>
              </div>
            </Link>
          </div>
          <div className="col-md-6 offset-md-1">
            <div className="card2">
              <form>
                <input
                  className="form-control mb-2"
                  placeholder="Productid..."
                  type="text"
                />
                <input
                  className="form-control mb-2"
                  placeholder="TitleUz..."
                  type="text"
                />
                <input
                  className="form-control mb-2"
                  placeholder="TitleEng..."
                  type="text"
                />
                <input
                  className="form-control mb-2"
                  placeholder="Price..."
                  type="text"
                />
                <textarea
                  className="form-control mb-2"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                >
                  360° kabriolet Vivobook Go 14 Flip bilan dunyoni kashf eting.
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                >
                  Explore the world with the Vivobook Go 14 Flip, a 360°
                  convertible.
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                >
                  Noutbuk va planshetni birlashtirgan ko‘p qirrali Vivobook Go
                  14 Flip atigi 1,45 kg og‘irlik qiladi, shuning uchun uni
                  istalgan joyga bemalol o‘zingiz bilan olib ketishingiz mumkin.
                  Qurilmaning apparat konfiguratsiyasi zamonaviy Intel Pentium
                  Silver protsessorini o'z ichiga oladi.
                </textarea>
                <textarea
                  className="form-control mb-2"
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                >
                  The versatile Vivobook Go 14 Flip, which combines a laptop and
                  a tablet, weighs only 1.45 kg, so you can easily take it
                  anywhere with you. The hardware configuration of the device
                  includes a modern Intel Pentium Silver processor.
                </textarea>
                <select className="form-control mb-2" name="" id="">
                  <option value="">Select Category</option>
                  <option value="">Laptop</option>
                  <option value="">Books</option>
                  <option value="">Phones</option>
                  <option value="">Sneakers</option>
                  <option value="">Website</option>
                </select>
                <button className="btn btn-danger form-control">
                  Create...
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
