import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/publicaciones.css";

function Publicaciones() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3300/publicacion/visual"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    if (postText.trim() !== "") {
      const publicacion = {
        usuario: localStorage.getItem("nombre"),
        contenido: postText.trim(),
        fecha: new Date().toLocaleString(),
      };

      try {
        const response = await axios.post(
          "http://localhost:3300/publicacion/crear",
          publicacion
        );
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setPostText("");
      } catch (error) {
        console.error("Error al guardar la publicación:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="post-box">
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="post-box__input"
            placeholder="Escribe tu publicación..."
            value={postText}
            onChange={handlePostChange}
          ></textarea>
          <button className="post-box__submit-btn" type="submit">
            Publicar
          </button>
        </form>
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post._id} className="post-container__post">
            <h3>{post.usuario}</h3>
            <p>{post.contenido}</p>
            <p>{post.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publicaciones;
