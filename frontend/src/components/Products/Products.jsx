import "./Products.scss";

import React from "react";
import Product from "./Product/Product";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/context";
import { fetchData } from "../../utils/api";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

const Products = () => {
	const { products, setProducts, productRef } = useContext(Context);

	const getProducts = () => {
		fetchData("/api/products?populate=*")
			.then((res) => setProducts(res))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="product-container" ref={productRef}>
			<h3 className="launchDate">The product will be launched in the month of August</h3>
			<div className="products">
				{products?.data ? (
					products.data?.map((product) => {
						return <Product key={product.id} product={product} />;
					})
				) : (
					<UseAnimations
						animation={loading2}
						className="loading"
						size={40}
					/>
				)}
			</div>
		</div>
	);
};

export default Products;
