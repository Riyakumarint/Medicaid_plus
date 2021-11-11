import React from 'react'
import caution from '../../../images/caution.png'
function NotFound() {
    return (
        <div
      className="position-relative"
      style={{ height: "76vh" }}
        >
            <img src={caution}  className="
         position-absolute"
        style={{ top: "50%", left: "50%",height:"380px", transform: "translate(-50%, -50%)" }} alt="caution"/>
      <h2
                className="
         position-absolute text-secondary"
        style={{ top: "80%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        404 | NotFound
      </h2>
    </div>
    )
}

export default NotFound