/** Main Spans **/
const fnameSpan = document.querySelector("#fname");
const lnameSpan = document.querySelector("#lname");
const scoreSpan = document.querySelector("#score");

// Injecting
fnameSpan.innerHTML = localStorage.getItem("fname");
lnameSpan.innerHTML = localStorage.getItem("lname");
scoreSpan.innerHTML = localStorage.getItem("score");
