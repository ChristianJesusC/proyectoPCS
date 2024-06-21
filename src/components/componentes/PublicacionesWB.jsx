import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/publicaciones.css";

function Publicaciones() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3300/publicacion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await response.json();
      setPosts([...posts,parsedResponse.data]);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  };

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
        setPosts([...posts, response.data]);
        setPostText("");
      } catch (error) {
        console.error("Error al guardar la publicación:", error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPosts();
    })();

    const source = new EventSource("http://localhost:3300/publicacion/visual");
    source.onmessage = function (event) {
      setPosts([...posts,JSON.parse(event.data)]);
    };
  }, []);

  return (
    <div className="container">
      <div className="post-box">
        <form onSubmit={(e) => handlePostSubmit(e)}>
          <textarea
            className="post-box__input"
            placeholder="Escribe tu publicación..."
            onChange={(e) => handlePostChange(e)}
          ></textarea>
          <button className="post-box__submit-btn" type="submit">
            Publicar
          </button>
        </form>
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post._id} className="post-container_post">
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
