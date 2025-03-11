$('document').ready(function () {

    const SS = document.getElementsByClassName("SS");
    const MW = document.getElementsByClassName("MW");
    const DS = document.getElementsByClassName("DS");

    if (document.title == 'Astrotography | Directory') {

        SS[0].addEventListener("click", function () {
            document.getElementById('SS').scrollIntoView();
        });

        MW[0].addEventListener("click", function () {
            document.getElementById('MW').scrollIntoView();
        });

        DS[0].addEventListener("click", function () {
            document.getElementById('DS').scrollIntoView();
        });

        if (localStorage.getItem('scrollTo') == "SS") {
            document.getElementById('SS').scrollIntoView();
            localStorage.removeItem('scrollTo');
        } else if (localStorage.getItem('scrollTo') == "MW") {
            document.getElementById('MW').scrollIntoView();
            localStorage.removeItem('scrollTo');
        } else if (localStorage.getItem('scrollTo') == "DS") {
            document.getElementById('DS').scrollIntoView();
            localStorage.removeItem('scrollTo');
        }

    } else {

        SS[0].addEventListener("click", function () {
            localStorage.removeItem('scrollTo');
            localStorage.setItem('scrollTo', 'SS');
            document.location.href = "./directory.html";
        });

        MW[0].addEventListener("click", function () {
            localStorage.removeItem('scrollTo');
            localStorage.setItem("scrollTo", "MW");
            document.location.href = "./directory.html";
        });

        DS[0].addEventListener("click", function () {
            localStorage.removeItem('scrollTo');
            localStorage.setItem("scrollTo", "DS");
            document.location.href = "./directory.html";
        });

    }

});

