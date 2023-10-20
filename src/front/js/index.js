// React V18 
//import react into the bundle
import React from "react";
import {createRoot} from "react-dom/client";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
const root = createRoot(document.querySelector('#app'))
root.render(<Layout/>)


// // PREVIOUS (React V16 - t.ly/JNjtv)
// // import react into the bundle
// import React from "react";
// import ReactDOM from "react-dom";

// //include your index.scss file into the bundle
// import "../styles/index.css";

// //import your own components
// import Layout from "./layout";

// //render your react application
// ReactDOM.render(<Layout />, document.querySelector("#app"));
