import React from "react";

const ThankYouBox = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          marginBottom: "5%",
          fontFamily: "Muli",
          fontSize: 22,
        }}
      >
        Your response has been recorded, thanks!
      </span>

      {/* <Button
        style={{
          background: "#66b2b2",
          color: "#ffffff",
        }}
      >
        <Link underline="none" color="inherit" href="/form">
          Start again
        </Link>
      </Button> */}
    </div>
  );
};

ThankYouBox.propTypes = {};

export default ThankYouBox;
