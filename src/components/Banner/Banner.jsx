import React from "react";
import "./Banner.css";
function Banner({ image }) {
  console.log(image);
  return (
    <div className="banner">
      <img
        src={`https://4kwallpapers.com/images/wallpapers/the-witcher-3-ciri-5k-5120x2880-10663.jpg`}
        className="banner__image"
      />
    </div>
  );
}

export default Banner;
