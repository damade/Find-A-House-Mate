//const {listOfUsers} = require("../utils/functionsNeeded");


//module.exports =
function showAlert() {
  if ($('div#errorstatus').text() != '') {
    alert($('div#errorstatus').text());
  }
}

function showModal(data) {
  // Get the modal
  var modal = document.getElementById("myModal");

  console.log(data);

  var obj = JSON.parse(data);

  modal.style.display = "block";

  document.getElementById('dataMu').innerHTML = obj.music;

  document.getElementById('dataPt').innerHTML = obj.personality;

  document.getElementById('dataCo').innerHTML = obj.comment;

  document.getElementById('dataAd').innerHTML = obj.houseInfo.address;

  document.getElementById('dataHt').innerHTML = obj.houseInfo.houseType;

  document.getElementById('dataDe').innerHTML = obj.houseInfo.description;

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//module.exports =
function getSessionDetails() {
  $.ajax({
    url: "/getsession",
    type: "GET",
    dataType: "json"
  })
    .done(resultFromFunc => {

      $(document).ready(function () {
        $(function () {
          $("#dropdownMenuButton").text("Hello, " + resultFromFunc["fullName"]);
        });
      });

    })
}
