import "./App.css";
import React from "react";

function ErrorSivu() {
  return (
    <div className="content">
      <div className="container-1">
        <h1 style={{ color: "red", textAlign: "center" }}>
          VOEHAN MÄTÄ SIVUA EI LÖYTYNYT
        </h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/FOt3oQ_k008?start=8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          autoPlay="1"
          allowFullScreen="1"
        ></iframe>
      </div>
    </div>
  );
}

export default ErrorSivu;
