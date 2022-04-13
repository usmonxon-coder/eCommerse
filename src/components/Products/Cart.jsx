import { useDispatch, useSelector } from "react-redux";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Cart(props) {
  const { cart } = useSelector((state) => state.globalState);
  const { lang, auth } = useSelector((state) => state);

  return (
    <div className="cart">
      <div className="container">
        {!auth.user && (
          <div>
            <h2 className="text-center my-5">{langs[`${lang}`].noProducts}</h2>
          </div>
        )}
        {auth.user && (
          <div className="xarid d-flex align-items-center justify-content-between">
            <h3 className="my-4">
              <b>{langs[`${lang}`].total_price}: </b> 122$
            </h3>
            <button className="btn btn-success">Paypal</button>
          </div>
        )}
        <div className="row ">
          {cart.map((item, index) => (
            <div key={index} className="col-lg-6 col-12 mb-3">
              <div className="card1 me-3 h-100">
                <div className="row  h-100 border align-items-center justify-content-between">
                  <div className=" col-md-6 box box1">
                    <img className="w-100" src={item.images.url} alt="rasm" />
                  </div>
                  <div className="col-md-6 box box2">
                    <b>{item[`title${lang}`]}</b>
                    <p className="mb-2">
                      <b>{langs[`${lang}`].price}: </b>
                      {item.price} $
                    </p>
                    <p className="mb-2">
                      <b>{langs[`${lang}`].description}: </b>
                      {item[`description${lang}`]}
                    </p>
                    <p>
                      <b>{langs[`${lang}`].content} :</b>
                      {item[`content${lang}`]}
                    </p>
                    <div className="btn-group mb-3">
                      <button className="btn px-3 btn-info">-</button>
                      <button className="btn px-3 btn-light">1</button>
                      <button className="btn px-3 btn-info">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
