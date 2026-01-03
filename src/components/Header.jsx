import React from 'react';

function Header() {
  // Função técnica para o scroll funcionar na página contínua
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header style={{
      background: "#000100",
      padding: "20px 0",
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
      position: "sticky", // Mantido conforme seu original
      top: 0,
      zIndex: 1000 // Apenas garantindo que fique acima do conteúdo
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between", // Restaurado o posicionamento original
        alignItems: "center"
      }}>
        
        {/* Espaçador para manter o alinhamento original se houver logo à esquerda */}
        <div className="logo-placeholder"></div>

        {/* MENU - Texto e estilo restaurados exatamente como você enviou */}
        <nav className="bebas-neue-regular" style={{ display: "flex", gap: "10px", letterSpacing: "4px"}}>
          <a href="/" onClick={(e) => scrollToSection(e, 'home')} style={linkStyle}>HOME</a>
          <a href="/web" onClick={(e) => scrollToSection(e, 'projetos')} style={linkStyle}>PROJETOS,</a>
          <a href="/contato" onClick={(e) => scrollToSection(e, 'contato')} style={linkStyle}>CONTATO</a>
        </nav>
      </div>
    </header>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#a1a0a0",
  fontSize: "16px",
  transition: "0.3s",
  cursor: "pointer" // Garante que o mouse mude para a mãozinha
};

export default Header;