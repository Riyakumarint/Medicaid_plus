import React from 'react'
import i1 from "./img/user1.jpg"
import "./css/style.css"
export default function Cards(props) {
    return (
        <>
                <div className="col">
                    <a href="#">
					<div className="card bg-white p-3 mb-4 shadow">
						<div className="d-flex justify-content-between mb-4">
							<div className="user-info">
								<div className="user-info__img">
									<img src={i1} alt="User Img"/> 
								</div>
								<div className="user-info__basic">
									<h5 className="mb-0">{props.card.name}</h5>
									<p className="text-muted mb-0">{props.card.info}</p>
								</div>
							</div>
							<div className="dropdown open">
								<a href="#!" className="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i className="fa fa-ellipsis-v"></i>
								</a>
								<div className="dropdown-menu" aria-labelledby="triggerId1">
									<a className="dropdown-item" href="#"><i className="fa fa-pencil mr-1"></i> Edit</a>
									<a className="dropdown-item text-danger" href="#"><i className="fa fa-trash mr-1"></i> Delete</a>
								</div>
							</div>
						</div>
						<h6 className="mb-0">{props.card.Phone}</h6>
						<a href="#!"><small>Contact</small></a>
						<div className="d-flex justify-content-between mt-4">
							<div>
								<h5 className="mb-0">{props.card.time}
									<small className="ml-1">{props.card.date}</small>
								</h5>
							</div>
							<span className="text-success font-weight-bold">{props.card.type}</span>
						</div>
					</div>
                    </a>
                    </div>
        <hr/>
        </>
    )
}