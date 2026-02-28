$(document).ready(function () {

    $.getJSON("task9.json", function (data) {

        let form = $("<form id='dynamicForm'></form>");

        $.each(data.fields, function (index, field) {

            let fieldDiv = $("<div class='form-group'></div>");
            let label = $("<label></label>").text(field.label);
            fieldDiv.append(label);

            let input;

            if (field.type === "select") {
                input = $("<select></select>").attr("id", field.id);

                input.append("<option value=''>Select</option>");

                $.each(field.options, function (i, option) {
                    input.append("<option value='" + option + "'>" + option + "</option>");
                });

            } else {
                input = $("<input>").attr("type", field.type)
                                    .attr("id", field.id);
            }

            fieldDiv.append(input);
            fieldDiv.append("<span class='error'></span>");
            form.append(fieldDiv);
        });

        // Hidden state dropdown (for USA)
        let stateDiv = $(`
            <div class='form-group hidden' id='stateDiv'>
                <label>State</label>
                <select id='state'>
                    <option value=''>Select State</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>Florida</option>
                </select>
                <span class='error'></span>
            </div>
        `);

        form.append(stateDiv);

        // Conditional field: Student/Professional
        let roleDiv = $(`
            <div class='form-group'>
                <label>Role</label>
                <select id='role'>
                    <option value=''>Select</option>
                    <option value='student'>Student</option>
                    <option value='professional'>Professional</option>
                </select>
                <span class='error'></span>
            </div>
        `);

        form.append(roleDiv);

        // Extra fields
        let extraDiv = $(`
            <div class='form-group hidden' id='extraDiv'>
                <label id='extraLabel'></label>
                <input type='text' id='extraField'>
                <span class='error'></span>
            </div>
        `);

        form.append(extraDiv);

        form.append("<button type='submit'>Submit</button>");

        $("#formContainer").append(form);


        // Interactivity

        $("#country").change(function () {
            if ($(this).val() === "USA") {
                $("#stateDiv").removeClass("hidden");
            } else {
                $("#stateDiv").addClass("hidden");
            }
        });

        $("#role").change(function () {
            let role = $(this).val();

            if (role === "student") {
                $("#extraLabel").text("College Name");
                $("#extraDiv").removeClass("hidden");
            } 
            else if (role === "professional") {
                $("#extraLabel").text("Company Name");
                $("#extraDiv").removeClass("hidden");
            } 
            else {
                $("#extraDiv").addClass("hidden");
            }
        });


        // Validation

        $("#dynamicForm").submit(function (e) {
            e.preventDefault();

            let isValid = true;
            $(".error").text("");

            if ($("#name").val().trim() === "") {
                $("#name").next(".error").text("Name is required");
                isValid = false;
            }

            let email = $("#email").val();
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            if (!emailPattern.test(email)) {
                $("#email").next(".error").text("Enter valid email");
                isValid = false;
            }

            if ($("#password").val().length < 6) {
                $("#password").next(".error").text("Password must be at least 6 characters");
                isValid = false;
            }

            if ($("#country").val() === "") {
                $("#country").next(".error").text("Select country");
                isValid = false;
            }

            if ($("#country").val() === "USA" && $("#state").val() === "") {
                $("#state").next(".error").text("Select state");
                isValid = false;
            }

            if ($("#role").val() === "") {
                $("#role").next(".error").text("Select role");
                isValid = false;
            }

            if (!$("#extraDiv").hasClass("hidden") && $("#extraField").val().trim() === "") {
                $("#extraField").next(".error").text("This field is required");
                isValid = false;
            }

            if (isValid) {
                alert("Form submitted successfully!");
            }
        });

    });

});