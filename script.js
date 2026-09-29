function validateStudent() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");

    // =========================
    // EMAIL DFA
    // =========================

    let emailPath = ["q0"];

    // Check email characters
    let emailValid =
        /^[a-zA-Z0-9._-]+@ashokacollege\.in$/i.test(email);

    if (emailValid) {
        emailPath.push("q1");
        emailPath.push("q2");
        emailPath.push("q3");
        emailPath.push("q4");
        emailPath.push("q5");
    } else {
        emailPath.push("Dead State");
    }


    // =========================
    // PASSWORD DFA
    // =========================

    let passwordPath = ["q0"];

    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (hasLower) {
        passwordPath.push("q1");
    }

    if (hasUpper) {
        passwordPath.push("q2");
    }

    if (hasNumber) {
        passwordPath.push("q3");
    }

    if (hasSpecial) {
        passwordPath.push("q4");
    }

    let passwordValid =
        password.length >= 8 &&
        hasLower &&
        hasUpper &&
        hasNumber &&
        hasSpecial;

    if (passwordValid) {
        passwordPath.push("q5");
    } else {
        passwordPath.push("Dead State");
    }


    // =========================
    // DISPLAY RESULT
    // =========================

    let output = "";


    // EMAIL RESULT

    if (emailValid) {

        output += `
            <div class="valid">

                <h3>✅ Email is VALID</h3>

                <p>
                    Valid Ashoka College email address.
                </p>

                <strong>Email DFA Path:</strong>

                <div class="path">
                    ${emailPath.join(" → ")}
                </div>

            </div>
        `;

    } else {

        output += `
            <div class="invalid">

                <h3>❌ Email is INVALID</h3>

                <p>
                    Please enter a valid Ashoka College email address.
                </p>

                <strong>Email DFA Path:</strong>

                <div class="path">
                    ${emailPath.join(" → ")}
                </div>

            </div>
        `;
    }


    // PASSWORD RESULT

    if (passwordValid) {

        output += `
            <br>

            <div class="valid">

                <h3>✅ Strong Password</h3>

                <p>
                    Password satisfies all required conditions.
                </p>

                <strong>Password DFA Path:</strong>

                <div class="path">
                    ${passwordPath.join(" → ")}
                </div>

            </div>
        `;

    } else {

        output += `
            <br>

            <div class="invalid">

                <h3>❌ Weak Password</h3>

                <p>
                    Password must contain:
                </p>

                <ul>
                    <li>At least 8 characters</li>
                    <li>Uppercase letter</li>
                    <li>Lowercase letter</li>
                    <li>Number</li>
                    <li>Special character</li>
                </ul>

                <strong>Password DFA Path:</strong>

                <div class="path">
                    ${passwordPath.join(" → ")}
                </div>

            </div>
        `;
    }


    result.innerHTML = output;
    resetDFA();

highlightStates(
    "email",
    emailValid
        ? ["q0", "q1", "q2", "q3", "q4", "q5"]
        : ["q0"]
);

highlightStates(
    "pass",
    passwordValid
        ? ["q0", "q1", "q2", "q3", "q4", "q5"]
        : ["q0"]
);
}
function resetDFA() {

    document.querySelectorAll(".state").forEach(function(state) {

        state.classList.remove("active");

    });
}


function highlightStates(prefix, states) {

    states.forEach(function(state, index) {

        setTimeout(function() {

            const element =
                document.getElementById(prefix + "-" + state);

            if (element) {
                element.classList.add("active");
            }

        }, index * 500);

    });
}