document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nuevo-post');
    var posts = [];
    var cont = 0;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        posts = data;
        posts.forEach(element => {
            var post = document.createElement('div');
            post.className = 'bg-light p-3 mb-3';
            post.innerHTML = `
                <h3>${element.title}</h3>
                <p>${element.body}</p>
            `;
            document.getElementById('posts').appendChild(post);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        cont ++;
        var postContent = document.getElementById('post-content').value;

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Demo' + cont,
                body: postContent,
                userId: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            var post = document.createElement('div');
            post.className = 'bg-light p-3 mb-3';
            post.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
            document.getElementById('posts').insertBefore(post, document.getElementById('posts').firstChild);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});