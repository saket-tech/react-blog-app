// src/api/posts.js

// Initial data for the blog
let posts = [
    { id: 1, title: "Welcome to the Blog!", content: "This is your first post. You can edit or delete it.", author: "Admin" },
    { id: 2, title: "Understanding React", content: "React makes building interactive UIs a breeze. This app is built entirely with it.", author: "Dev" },
    { id: 3, title: "Styling with Standard CSS", content: "This version uses a simple CSS stylesheet instead of a utility framework.", author: "Designer" }
];
let nextId = 4;

// Functions to interact with the posts data
export const getAllPosts = () => posts;

export const getPostById = (id) => posts.find(p => p.id === id);

export const addPost = (post) => {
    const newPost = { id: nextId++, ...post };
    posts.push(newPost);
    return newPost;
};

export const updatePost = (id, updatedData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedData };
        return posts[postIndex];
    }
    return null;
};

export const deletePost = (id) => {
    const initialLength = posts.length;
    posts = posts.filter(p => p.id !== id);
    return posts.length < initialLength;
};
