console.log("script is loaded home");

// redy document
$(document).ready(function () {
	let createPost = function () {
		// creating post
		let newPost = $("#new-post-form");
		// submit form using Ajax
		newPost.submit(function (event) {
			event.preventDefault();
			// Ajax
			$.ajax({
				type: "post",
				url: "/posts/create-post",
				data: newPost.serialize(),
				// getting data in data
				success: function (data) {
					let newPost = createNewPostDom(data.data.post);
					$("#post-list-container>ul").prepend(newPost);
				},
				// catching error
				error: function (err) {
					console.log(err.responseText());
				},
			});
		});
	};

	// create post in dom
	let createNewPostDom = function (post) {
		console.log(post);
		return $(`<li id="post-${post.id}">
        <p>
            <small>
                <a class="delete-post-btn" href="/posts/destroy/${post.id}">delete</a>
            </small>
              ${post.content}
            <br />
            <small> ${post.user.name} </small>
        </p>

        <div class="post-comment">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Add Comment" required />
                <input type="hidden" name="post" value="${post.id}" />
                <button type="submit"><Strong>Add Comment</Strong></button>
            </form>
            <div class="post-comments-list">
                <ul class="post--comments-${post.id}">
                 
                </ul>
            </div>
        </div>
    </li>`);
	};

	createPost();
});
