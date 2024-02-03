import React from 'react';
import "../../style/Scss/LoadingScreen.scss";

const LoadingScreen = () => {
    const spinner = document.getElementById("spinner");

    if (spinner && !spinner.hasAttribute("hidden")) {
        spinner.setAttribute("hidden", "true");
    }
    return (
        <div id="spinner" className="loading">
            <div></div>
        </div>
    );
};

export default LoadingScreen;
