// Load posts from localStorage or empty array
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Render posts function
function renderPosts(filter = "") {
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';

  posts.forEach((post, index) => {
    if (post.title.toLowerCase().includes(filter.toLowerCase()) || post.content.toLowerCase().includes(filter.toLowerCase())) {
      postsDiv.innerHTML += `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <div class="actions">
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>
          </div>
        </div>
      `;
    }
  });
}

// Add new post
document.getElementById('blogForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (title && content) {
    posts.push({ title, content });
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    e.target.reset();
  } else {
    alert("Please enter both title and content.");
  }
});

// Edit post
function editPost(index) {
  const newTitle = prompt('Edit title:', posts[index].title);
  const newContent = prompt('Edit content:', posts[index].content);

  if (newTitle && newContent) {
    posts[index] = { title: newTitle, content: newContent };
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

// Delete post
function deletePost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

// Search posts
document.getElementById('searchInput').addEventListener('input', (e) => {
  renderPosts(e.target.value);
});

// Initial render
window.onload = () => renderPosts();