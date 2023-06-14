import "./Advantages.scss";

import React, { useContext, useEffect, useState } from "react";
import Advantage from "./Advantage/Advantage";
import { fetchData } from "../../utils/api";
import { Context } from "../../utils/context";

const Advantages = () => {
    const { benefitsRef } = useContext(Context);
    const [benefits, setBenefits] = useState();
    const getBenefits = async () => {
        fetchData("/api/advantages?populate=*")
            .then((data) => setBenefits(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getBenefits();
    }, []);

    return (
        <div className="advantages">
            <div className="content">
                <h1 className="title">
                    Discover the Health and Culinary Advantages of Wood-Pressed
                    Mustard Oil
                </h1>
                <div className="adv-grid" ref={benefitsRef}>
                    {benefits?.data?.map((benefit) => (
                        <Advantage
                            key={benefit.id}
                            heading={benefit.attributes.title}
                            desc={benefit.attributes.desc}
                            icon={
                                process.env.REACT_APP_PRODUCTION_URL +
                                benefit.attributes.icon.data.attributes.url
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Advantages;
