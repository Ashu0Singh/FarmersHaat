import "./Product.scss";

import { useNavigate } from "react-router-dom";
import Bottle from '../../../assets/ProductImg/BlackOil.jpeg'

const Product = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/FarmersHaat/product/${product.id}`)}
        >
            <div className="thumbnail">
                <img
                    src={
                        // process.env.REACT_APP_PRODUCTION_URL +
                        // product?.attributes.img.data[0].attributes.url
                        Bottle
                    }
                    alt=""
                />
            </div>

            <div className="product-details">
                <span className="name">{product.attributes.title}</span>
                <span className="desc">{product.attributes.desc}</span>
                <button className="button">Buy Now →</button>
            </div>
        </div>
    );
};

export default Product;
