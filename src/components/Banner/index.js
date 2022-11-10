import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./styles.css";

const Banner = (props) => {
  const { onClose, handleEmailVerificationTrigger } = props;

  return (
    <div className="banner-root-container">
      <div className="banner-container">
        <div className="banner-content">
          ⚠️ Please verify your email in order to enable receiving email
          notifications for responses.
          <Link
            onClick={handleEmailVerificationTrigger}
            style={{ cursor: "pointer", marginLeft: 3 }}
          >
            <span style={{ fontWeight: "bold" }}> Click here to verify!</span>
          </Link>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleEmailVerificationTrigger: PropTypes.func.isRequired,
};

export default Banner;
