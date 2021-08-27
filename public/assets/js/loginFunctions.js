//module.exports = 
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

function validatePassword() {
    $(document).ready(function () {
        $("#submitButton").click(function (e) {
            e.preventDefault();
            var matched,
                password = $("#user-pass").val(),
                confirm = $("#user-repeatpass").val();
                stateCheck =  $("#States").val();

            if (password && confirm ) {
                matched = (password == confirm) ? true : false;
                if(stateCheck == "Choose A State"){
                    $("#responseDiv").html("Choose Your State");
                    $("#responseDiv").addClass("alert alert-danger");
                    return false;
                }else if (matched) {
                    //Submit line commented out for example.  In production, remove the //
                    $("#signUpForm").submit();

                    //Shows success message and prevents submission.  In production, comment out the next 2 lines.
                    //$("#responseDiv").html("Passwords Match");
                    //return false;
                }
                else {
                    $("#responseDiv").html("Passwords don't match...");
                    $("#responseDiv").addClass("alert alert-danger");
                    return false;
                }
            } else {
                $("#responseDiv").html("Empty Password Fields.");
                $("#responseDiv").addClass("alert alert-danger");
                return false;
            }



        });
    });
}