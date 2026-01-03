// src/pages/Contato.jsx
import React, { useState } from "react";

function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/mwvewjak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
    } else {
      setStatus("Ocorreu um erro ao enviar a mensagem.");
    }
  };

  return (
    <div className="bebas-neue-regular" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", color: "#ccc", letterSpacing: "2px" }}>
      
      {/* Estilos para animações e efeitos de foco */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in { animation: fadeInUp 0.8s ease-out forwards; }
          
          input, textarea {
            background: #1a1a1a;
            border: 1px solid #333;
            color: #fff;
            transition: all 0.3s ease;
            outline: none;
          }
          
          input:focus, textarea:focus {
            border-color: #fff;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            transform: scale(1.01);
          }

          button:hover {
            background-color: #fff !important;
            color: #000 !important;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
          }
          button:active { transform: translateY(-1px); }
        `}
      </style>

      <div className="fade-in">
        <h1 style={{ fontSize: "3rem", marginBottom: "30px", borderBottom: "1px solid #333", display: "inline-block" }}>
          Contato
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="nome" style={{ display: "block", marginBottom: "8px" }}>Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px", fontSize: "16px", borderRadius: "4px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px", fontSize: "16px", borderRadius: "4px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="assunto" style={{ display: "block", marginBottom: "8px" }}>Assunto</label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px", fontSize: "16px", borderRadius: "4px" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="mensagem" style={{ display: "block", marginBottom: "8px" }}>Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "12px", fontSize: "16px", height: "150px", borderRadius: "4px", resize: "vertical" }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              padding: "12px 30px",
              backgroundColor: "#111",
              color: "#fff",
              border: "1px solid #fff",
              borderRadius: "0px", 
              fontSize: "18px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase"
            }}
          >
            Enviar Mensagem
          </button>
        </form>

        {status && (
          <p style={{ 
            marginTop: "20px", 
            padding: "10px", 
            backgroundColor: status.includes("sucesso") ? "#1b4332" : "#5a1a1a",
            color: "#fff",
            textAlign: "center",
            animation: "fadeInUp 0.5s ease"
          }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default Contato;