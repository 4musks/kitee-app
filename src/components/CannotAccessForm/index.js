import React from "react";
import ImageAssets from "../../assets/images";
import "./styles.css";

const CannotAccessForm = () => {
  return (
    <div className="cannot-access-form-container">
      <div className="cannot-access-form-text">
        Oops, you cannot access this form at the moment!
      </div>
      <div className="cannot-access-form-illustration-container">
        <img
          src={ImageAssets.Cannot_Access_Illustration}
          alt=""
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CannotAccessForm;
