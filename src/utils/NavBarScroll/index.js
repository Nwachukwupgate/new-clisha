

function NavBarScroll() {
    var myNav = document.getElementById('mynav_bar');
    var login_btn = document.getElementById('login_btn');
    const navbar_brand = document.getElementById("navbar-brand");
    const toggle_btn = document.getElementById("toggle_btn");
    const navbarsItems = document.querySelectorAll("#navbarsItems > li > a");

    window.onscroll = function () {
        if (window.scrollY >= 40) {
            myNav.classList.add("bg-white", "navbar-dark", "shadow");
            myNav.classList.remove("bg-transparent");
            myNav.classList.remove("navbar-light");
            navbar_brand.src = "logo.png"
            navbarsItems.forEach((x) => (x.classList.add("word-dark")))
            login_btn.classList.add("word-dark");
            toggle_btn.classList.add("m-dark");
        }
        else {
            myNav.classList.add("bg-transparent", "navbar-light", "shadow");
            myNav.classList.remove("bg-white");
            myNav.classList.remove("navbar-dark");
            login_btn.classList.remove("word-dark");
            toggle_btn.classList.remove("m-dark");
            navbar_brand.src = "logo2.png"  
            navbarsItems.forEach((x) => (x.classList.remove("word-dark")))

        }
    };

}

export default NavBarScroll