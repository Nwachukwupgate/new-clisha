function PaginateBtn({ containerId, leftId, rightId }) {
    const floatRight = document.getElementById(rightId);
    const floatLeft = document.getElementById(leftId);
    const rankslider = document.getElementById(containerId);
    floatLeft.addEventListener("click", () => {
        rankslider.scrollLeft -= 150;

        if (rankslider.scrollLeft === 0) {
            floatRight.classList.remove("disabledLink");
            floatRight.classList.add("activeLink");
            floatLeft.classList.remove("activeLink");
            floatLeft.classList.add("disabledLink");
        }
        else {
            floatRight.classList.add("activeLink");
            floatRight.classList.remove("disabledLink");
        }

    });
    floatRight.addEventListener("click", (e) => {
        rankslider.scrollLeft += 150;

        if (rankslider.scrollLeft >= 1490) {
            floatRight.classList.remove("activeLink");
            floatRight.classList.add("disabledLink");
            floatLeft.classList.remove("disabledLink");
            floatLeft.classList.add("activeLink");
        } else {
            floatLeft.classList.add("activeLink");
            floatLeft.classList.remove("disabledLink");
        }
    });
}

export default PaginateBtn