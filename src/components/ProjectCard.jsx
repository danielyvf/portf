import React, { useState } from 'react';

function ProjectCard({ title, description, techs, image, link, galleryImages }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const hasGallery = galleryImages && galleryImages.length > 0;

  const handleClick = (e) => {
    if (hasGallery) {
      e.preventDefault();
      setOpen(true);
      setIndex(0);
    }
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* CARD */}
      <div
        style={{
          background: `url(${image}) center/cover no-repeat`,
          padding: "20px",
          borderRadius: "2px",
          width: "100%",
          height: "600px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.07)",
          transition: "0.3s",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          color: "#fff",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-40px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <p><strong>Tecnologias:</strong> {techs}</p>

        <a
          href={hasGallery ? "#" : link}
          target={hasGallery ? undefined : "_blank"}
          rel="noreferrer"
          onClick={handleClick}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            background: "#fff",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          Ver Projeto
        </a>
      </div>

      {/* MODAL GALERIA */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90vw",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            <img
              src={galleryImages[index]}
              alt="Galeria"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "12px",
                transform: "rotateY(-6deg)",
                transition: "0.4s",
              }}
            />

            <button onClick={prev} style={arrowStyle("left")}>‹</button>
            <button onClick={next} style={arrowStyle("right")}>›</button>

            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                fontSize: "2rem",
                background: "none",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "-60px",
  transform: "translateY(-50%)",
  fontSize: "3rem",
  background: "none",
  color: "#fff",
  border: "none",
  cursor: "pointer",
});

export default ProjectCard;
