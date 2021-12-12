import React from "react";
import success from "../images/logos/status/error.svg"

function InfoTooltip({
  name,
  title,
  formName,
  isOpen,
  onClose,
  isSuccessful,
  children,
}) {
  //console.log("popup with",{children});

  const popupClassName = `popup info-tooltip ${
    isOpen ? "popup_open" : ""
  }`;
  
  return (
    <div className={popupClassName}>
      <div className="popup__container info-tooltip__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img 
        src={success} className="info-tooltip__image"
        />
        <h3 className="popup__title info-tooltip__text">{"Success! You have now been registered."}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;

