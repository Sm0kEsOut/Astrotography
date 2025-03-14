$('document').ready(function () {

    if (document.title == 'Astrotography | Contact') {
        document.getElementById('contactForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const comments = document.getElementById('comments-input').value;

            window.location.href = `./formFilled.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&comments=${encodeURIComponent(comments)}`;
        });
    }

    if (document.title == 'Astrotography | Form Finished') {

        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        document.getElementById('displayName').textContent = getParameterByName('name');
        document.getElementById('displayEmail').textContent = getParameterByName('email');
        document.getElementById('displayComments').textContent = getParameterByName('comments');
    }

});