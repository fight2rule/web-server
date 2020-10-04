//console.log("Hello world");
// // fetch("http://puzzle.mead.io/puzzle").then((response) => {
// //   response.json().then((data) => {
// //     console.log(data);
// //   });
// // });
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#one");
const messageTwo = document.querySelector("#two");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  //http://localhost:3000
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageTwo.textContent = data.forecastData;
        messageOne.textContent = data.placeName;
      }
    });
  });
  //console.log("testing");
});
