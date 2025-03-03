$('document').ready(function () {

    const form = document.getElementById('form')
    const firstname_input = document.getElementById('firstname-input')
    const email_input = document.getElementById('email-input')
    const password_input = document.getElementById('password-input')
    const repeat_password_input = document.getElementById('repeat-password-input')
    const error_message = document.getElementById('error-message')
    const userTable = localStorage.getItem("userData")
    let existingData = userTable ? JSON.parse(userTable) : []


    form.addEventListener('submit', (e) => {

        let errors = []

        let email = email_input.value
        let password = password_input.value
        let userFound = false

        if (firstname_input) {
            errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
        }
        else if (email_input && password_input) {
            errors = getLoginFormErrors(email_input.value, password_input.value)
        }

        if (errors.length > 0) {
            e.preventDefault()
            error_message.innerText = errors.join(". ")
        } else {
            if (firstname_input) {
                let newId = existingData.length > 0 ? existingData[existingData.length - 1].id + 1 : 1

                const formData = {
                    id: newId,
                    firstname: firstname_input.value,
                    email: email_input.value,
                    password: password_input.value
                }

                existingData.push(formData)

                localStorage.setItem('userData', JSON.stringify(existingData))
            } else {
                existingData.forEach(user => {
                    if (user.email === email) {
                        if (user.password === password) {
                            console.log(user.password)
                            userFound = true
                            error_message.innerText = "Login successful!"
                            error_message.style.color = 'green'

                            // Optionally, store the logged-in user
                            localStorage.setItem('currentUser', JSON.stringify(user))
                        }
                    }
                })
            }
        }
    })

    function getSignupFormErrors(firstname, email, password, repeatPassword) {

        let errors = []

        if (firstname === '' || firstname == null) {
            errors.push('A First Name is required')
            firstname_input.parentElement.classList.add('incorrect')
        }

        if (email === '' || email == null) {
            errors.push('An Email is required')
            email_input.parentElement.classList.add('incorrect')
        }

        if (password === '' || password == null) {
            errors.push('A Password is required')
            password_input.parentElement.classList.add('incorrect')
        }

        if (repeatPassword === '' || repeatPassword == null) {
            errors.push('A Password is required')
            repeat_password_input.parentElement.classList.add('incorrect')
        }

        if (password.length < 8) {
            errors.push('Password must have at least 8 characters!')
            password_input.parentElement.classList.add('incorrect')
        }

        if (password !== repeatPassword) {
            errors.push('Passwords do not match!')
            password_input.parentElement.classList.add('incorrect')
            repeat_password_input.parentElement.classList.add('incorrect')
        }

        return errors;
    }

    function getLoginFormErrors(email, password) {

        let errors = []

        if (email === '' || email == null) {
            errors.push('An Email is required')
            email_input.parentElement.classList.add('incorrect')
        }

        if (password === '' || password == null) {
            errors.push('A Password is required')
            password_input.parentElement.classList.add('incorrect')
        }

        return errors;
    }

    const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

    allInputs.forEach(input => {

        input.addEventListener('input', () => {

            if (input.parentElement.classList.contains('incorrect')) {

                input.parentElement.classList.remove('incorrect')
                error_message.innerText = ""
            }
        })
    })
    
})