import "./Footer.scss";

import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import Logo from "../../assets/Logo.png";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const params = {
		headers: {
			Authorization: `bearer ${process.env.REACT_APP_STRAPI_APP}`,
		},
	};

	const [details, setDetails] = useState({
		name: "",
		email: "",
		query: "",
	});

	const handleChange = (event) => {
		setDetails((prevDetails) => ({
			...prevDetails,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		await axios
			.post(
				(process.env.REACT_APP_NODE_ENV === "DEVELOPMENT"
					? process.env.REACT_APP_DEV_URL
					: process.env.REACT_APP_PRODUCTION_URL) +
					"/api/query/sendEmail/",
				{ details: details },
				params
			)
			.then((data) => {
				setDetails({
					name: "",
					email: "",
					query: "",
				});
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	};

	const { footerRef } = useContext(Context);
	return (
		<div className="footer" ref={footerRef}>
			<div className="content">
				<div className="textContent">
					<div className="logo">
						<img
							src={Logo}
							alt="Farmers Haat"
							onClick={() =>
								navigate(
									`${process.env.REACT_APP_INITIAL_DOMAIN}/`
								)
							}
						/>
					</div>
					<div className="desc">
						If you have any concerns about your shipment, contact
						our support team at{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						within 48 hours of receiving the products.
						<br /> In the event of damaged or wrong products, you
						can return them within 7 days of delivery by emailing{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						with photos of the invoice, product, and order number.
						We will respond within 48 hours to arrange a
						replacement.
						<br />
						<br /> For prepaid orders, refunds will be initiated
						within 7 working days upon receiving the refund request.
						To cancel an order before shipping, email{" "}
						<a href="mailto:care@farmershaat.com">
							care@farmershaat.com
						</a>{" "}
						, and we'll assist you. Please refer to out{" "}
						<NavLink
							to={`${process.env.REACT_APP_INITIAL_DOMAIN}/policy`}>
							Privacy Policy
						</NavLink>{" "}
						for more information.
						<br />
						<br />
						<div className="address">
							<div className="marketing">
								<strong>Marketing Office</strong>
								<br />
								Farmers Haat Agrotech
								<br />
								33, Cantt Road,
								<br />
								1st Floor (Above Bank of Baroda)
								<br />
								Lucknow - 226001
							</div>
							<div className="registered">
								<strong>Registered Office</strong>
								<br />
								Farmers Haat Agrotech
								<br />
								B1/89, Sector K,
								<br />
								Aliganj,
								<br />
								Lucknow - 226024
							</div>
						</div>
					</div>
				</div>

				<div className="contactInfo">
					<div className="contactUs">Contact Us</div>
					<input
						type="text"
						className="name"
						placeholder="Name"
						name="name"
						value={details.name}
						onChange={handleChange}
					/>
					<input
						type="email"
						className="email"
						placeholder="Email"
						name="email"
						value={details.email}
						onChange={handleChange}
					/>
					<textarea
						type="textarea"
						className="query"
						placeholder="Query"
						name="query"
						rows={5}
						value={details.query}
						onChange={handleChange}
					/>
					<button
						disabled={isLoading}
						type="submit"
						className="submit"
						onClick={handleSubmit}>
						{isLoading ? (
							<UseAnimations
								animation={loading}
								strokeColor="#F8F7F1"
							/>
						) : (
							"Submit"
						)}
					</button>
				</div>

				<div className="socialMedia">
					<img
						width="40"
						height="40"
						src="https://img.icons8.com/fluency/48/facebook-new.png"
						alt="facebook-icon"
					/>
					<img
						width="40"
						height="40"
						src="https://img.icons8.com/fluency/48/instagram-new.png"
						alt="instagram-icon"
					/>
					<img
						width="40"
						height="40"
						src="https://img.icons8.com/color/96/twitter--v1.png"
						alt="twitter--v1"
					/>
					<a href="https://wa.me/9839011027">
						<img
							width="40"
							height="40"
							src="https://img.icons8.com/color/96/whatsapp--v1.png"
							alt="whatsapp--v1"
						/>
					</a>
					<a href="mailto:care@farmershaat.com">
						<img
							width="40"
							height="40"
							src="https://img.icons8.com/color/96/gmail-new.png"
							alt="gmail-new"
						/>
					</a>
				</div>
			</div>
			<div className="copyright">
				Copyright © 2023. All rights reserve to Framers Haat Agrotech
			</div>
		</div>
	);
};

export default Footer;
