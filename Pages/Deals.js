// Deals.js
function showDiscount(discountName) {
    var discountCode = getDiscountCode(discountName);
    document.getElementById("discountCode").innerText = "Your discount code for '" + discountName + "' is: " + discountCode;
    document.getElementById("overlay").style.display = "flex";
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
}

function getDiscountCode(discountName) {
    switch(discountName) {
        case "Monday Madness":
            return "MM2024";
        case "Student Discount":
            return "STU20";
        case "Family Pack":
            return "FAMILYFREE";
        case "Birthday Bash":
            return "BIRTHDAYFUN";
        case "Senior Citizen Special":
            return "SENIOR30";
        case "Military Discount":
            return "MIL25";
        default:
            return "No code available";
    }
}

function showDiscount(discountName) {
    var discountCode = getDiscountCode(discountName);
    document.getElementById("discountCode").innerHTML = "Your discount code for '" + discountName + "' is: <strong>" + discountCode + "</strong>";
    document.getElementById("overlay").style.display = "flex";
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
}
