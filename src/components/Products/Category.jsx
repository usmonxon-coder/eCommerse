import React from "react";

function Category(props) {
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
              />
              <input
                className="form-control mb-3"
                placeholder="Eng Category..."
                type="text"
              />
              <button className="btn btn-outline-success mb-3">Add</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-sm-flex align-items-center justify-content-between border p-1 px-2">
              <h5 class="m-0">Uz: Kompyuter, Eng: Laptop</h5>
              <div>
                <button class="btn btn-warning me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between border p-1 px-2">
              <h5 class="m-0">Uz: Kitoblar, Eng: Books</h5>
              <div>
                <button class="btn btn-warning me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between border p-1 px-2">
              <h5 class="m-0">Uz: Telefonlar, Eng: Phones</h5>
              <div>
                <button class="btn btn-warning me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between border p-1 px-2">
              <h5 class="m-0">Uz: Krasofkalar, Eng: Sneakers</h5>
              <div>
                <button class="btn btn-warning me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between border p-1 px-2">
              <h5 class="m-0">Uz: Web Sayt, Eng: Web Site</h5>
              <div>
                <button class="btn btn-warning me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
