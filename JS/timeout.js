/** Main Spans **/
const fnameSpan = document.querySelector("#fname");
const lnameSpan = document.querySelector("#lname");

// Injecting
fnameSpan.innerHTML = localStorage.getItem("fname");
lnameSpan.innerHTML = localStorage.getItem("lname");
