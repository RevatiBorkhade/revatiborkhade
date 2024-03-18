// import React, { useState, useContext,useEffect } from "react";
import "./preloader.css"


// const Preloader = () => {
//     return(
//         <div id="root_preloader">
//             <div className="loader-wrapper">
//                 <div className="loader"></div>
//             </div>
//         </div>
//     );
// }
// export default Preloader;

// import React, { useState, useContext,useEffect } from "react";
// import "./preloader.css"


const Preloader = () => {
    return(
        <div id="root_preloader" style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
            <div className="hexagon" aria-label="Animated hexagonal ripples">
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
	<div className="hexagon__group">
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
		<div className="hexagon__sector"></div>
	</div>
</div>
<p aria-label="Loading">Loading</p>
        </div>
    );
}
export default Preloader;

