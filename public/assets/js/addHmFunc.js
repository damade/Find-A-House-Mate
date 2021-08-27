$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})
function statePopulator(select) {
    var options =
        ["Abia", "Adamawa", "Abuja", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
            "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
            "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe",
            "Zamfara"];
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function showSnackBar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function validateHouseOwner() {
    $(document).ready(function () {
        $("#hosButton").click(function (e) {
            e.preventDefault();
                address = $("#aho").val(),
                description = $("#dho").val();
                stateCheck =  $("#States").val();

            if (address && description) {
                if(stateCheck == "Choose A State"){
                    $("#snackbarf").html("Select a valid state");
                    $("#snackbarf").addClass("alert alert-danger");
                    return false;
                }
                else{
                    //Submit line commented out for example.  In production, remove the //
                    $("#houseOwnerForm").submit();
                }
            }else {
                if(stateCheck == "Choose A State"){
                    $("#snackbarf").html("Fill in your address or description, also select a valid state");
                    $("#snackbarf").addClass("alert alert-danger");
                    return false;
                }
                else{
                    $("#snackbarf").html("Fill in your address or description");
                    $("#snackbarf").addClass("alert alert-danger");
                    return false;
                }
            }



        });
    });
}

function validateHouseFinder() {
    $(document).ready(function () {
        $("#hofButton").click(function (e) {
            e.preventDefault();
                stateCheck =  $("#Secstates").val();

                if(stateCheck == "Choose A State"){
                    $("#snackbarf").html("Select a valid state");
                    $("#snackbarf").addClass("alert alert-danger");
                    return false;
                }
                else{
                    //Submit line commented out for example.  In production, remove the //
                    $("#houseFinderForm").submit();
                }
        });
    });
}