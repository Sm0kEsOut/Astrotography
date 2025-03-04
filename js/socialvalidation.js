$('document').ready(function () {

    let userData = localStorage.getItem("currentUser");
    let loggedInUser = userData ? JSON.parse(userData) : []

    if (document.title == 'Astrotography | Home') {
        const container = document.querySelector('.wrapper')
        const popup = document.querySelector('.cmt-dropdown-content')
        const openComments = document.querySelector('.cmt-dropdown-btn')
        const closeComments = document.querySelector('.close')

        const toggle = () => {

            container.classList.toggle('active')
            popup.classList.toggle('active')

        }

        if (loggedInUser) {
            document.getElementById("displayUsername").innerText = loggedInUser.firstname;
        } else {
            document.getElementById("displayUsername").innerText = "Guest"; // Default
        }

        let likeCount = localStorage.getItem("likeCount") ? parseInt(localStorage.getItem("likeCount")) : 0;
        let comments = JSON.parse(localStorage.getItem("comments")) || [];

        // Set the initial UI state
        document.getElementById("likeCount").innerText = likeCount;
        updateCommentDropdown(comments);

        // Like button event listener
        document.getElementById("likeButton").addEventListener("click", function () {
            likePost();
        });

        // Comment button event listener
        document.getElementById("commentButton").addEventListener("click", function () {
            commentPost();
        });

        // Function to handle likes
        function likePost() {
            let likeCountElement = document.getElementById("likeCount");
            let likeCount = parseInt(likeCountElement.innerText) + 1;
            likeCountElement.innerText = likeCount;
            localStorage.setItem("likeCount", likeCount); // Save to local storage
        }

        // Function to handle comments
        function commentPost() {
            let username = loggedInUser.firstname;
            let comment = prompt("Enter your comment:");

            if (username && comment) {
                let comments = JSON.parse(localStorage.getItem("comments")) || [];
                comments.push({ username, comment });
                localStorage.setItem("comments", JSON.stringify(comments)); // Save comments
                updateCommentDropdown(comments);
            }
        }

        function updateCommentDropdown(comments) {
            let dropdown = document.getElementById("cmt-commentDropdown");

            if (!dropdown) {
                console.error("Error: commentDropdown element not found!");
                return;
            }

            comments.forEach(({ username, comment }) => {
                if (dropdown.children.innerHTML != `<strong>${username}:</strong> ${comment}`) {
                    let commentItem = document.createElement("div");
                    commentItem.classList.add("comment-item");
                    commentItem.innerHTML = `<strong>${username}:</strong> ${comment}`;
                    dropdown.appendChild(commentItem);
                }
            });
        }

        openComments.addEventListener('click', toggle);
        closeComments.addEventListener('click', toggle);
    }    
})