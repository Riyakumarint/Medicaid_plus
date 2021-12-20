import React, { useState, useEffect } from "react";
import caution from "../../../images/caution.png";
import Loading from "../notification/LoadingAdmin";
function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // Wait for two second
      await new Promise((r) => setTimeout(r, 2000));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  if (loading) {
    return (
      <>
        <div
          className="loading"
          style={{ background: "#f8bec1", height: "100vh" }}
        >
          <Loading />
        </div>
      </>
    );
  } else {
    return (
      <div className="position-relative" style={{ height: "76vh" }}>
        <img
          src={caution}
          className="
         position-absolute"
          style={{
            top: "50%",
            left: "50%",
            height: "380px",
            transform: "translate(-50%, -50%)",
          }}
          alt="caution"
        />
        <h2
          className="
         position-absolute text-secondary"
          style={{
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          404 | NotFound
        </h2>
      </div>
    );
  }
}

export default NotFound;
