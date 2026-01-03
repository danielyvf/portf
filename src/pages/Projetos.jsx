import React, { useLayoutEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';


// IMPORTAÇÃO DAS IMAGENS (7 PROJETOS)
import pagina1 from "../assets/images/pagina1.jpg";
import pagina2 from "../assets/images/pagina2.jpg";
import pagina3 from "../assets/images/pagina3.jpg";
import pagina4 from "../assets/images/pagina4.jpg";
import pagina5 from "../assets/images/pagina5.jpg";
import pagina6 from "../assets/images/pagina6.jpg";
import pagina7 from "../assets/images/pagina7.jpg";

// GALERIA (PYTHON/DATA)
import foto1 from '../assets/images/foto1.jpg'; import foto2 from '../assets/images/foto2.jpg';
import foto3 from '../assets/images/foto3.jpg'; import foto4 from '../assets/images/foto4.jpg';
import foto5 from '../assets/images/foto5.jpg'; import foto6 from '../assets/images/foto6.jpg';
import img1 from '../assets/images/img1.jpg'; import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg'; import img4 from '../assets/images/img4.jpg';

function WebProjects() {
  const [selectedImg, setSelectedImg] = useState(null);
  const containerRef = useRef(null);

  // DISTRIBUIÇÃO DOS 7 PROJETOS
  const colLeft = [
    { id: "p1", title: "RAMP", subtitle: "HTML, CSS e Javascript", img: pagina1, link: "https://ramp-danielyvfs-projects.vercel.app/" },
    { id: "p2", title: "Animals", subtitle: "Layout & Grid", img: pagina2, link: "https://animals--phi.vercel.app/" }
  ];
  const colMid = [
    { id: "p5", title: "Automatização", subtitle: "Python & SQLite", img: pagina5, gallery: [foto1, foto2, foto3, foto4, foto5, foto6] },
    { id: "p3", title: "EcoBlog", subtitle: "Flexbox System", img: pagina3, link: "https://flexblog-orpin.vercel.app/" },
    { id: "p6", title: "Análise de Dados", subtitle: "Pandas & Numpy", img: pagina6, gallery: [img1, img2, img3, img4] }
  ];
  const colRight = [
    { id: "p4", title: "Café", subtitle: "Fullstack App", img: pagina4, link: "https://webcafe-nu.vercel.app/" },
    { id: "p7", title: "Tarefas", subtitle: "Productivity", img: pagina7, link: "https://arqweb.vercel.app/" }
  ];

  useLayoutEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    // Efeito Parallax apenas nas colunas da div "outros"
    const columns = gsap.utils.toArray(".column-parallax");
    columns.forEach((col, i) => {
      const yValue = (i === 1) ? 350 : -500; // Coluna do meio desce, laterais sobem

      gsap.fromTo(col, 
        { y: yValue }, 
        {
          y: -yValue,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleProjectClick = (proj) => {
    if (proj.gallery) setSelectedImg({ current: proj.gallery[0], all: proj.gallery });
    else if (proj.link) window.open(proj.link, "_blank");
  };

  return (
    <div className="outros" ref={containerRef}>
      <style>{`
        .outros { background: #000; color: #fff; padding: 10vh 0; overflow: hidden; width: 100%; position: relative; }
        .outros-grid { display: flex; justify-content: center; gap: 4vw; max-width: 1300px; margin: 0 auto; padding: 0 20px; }
        .column-parallax { flex: 1; display: flex; flex-direction: column; gap: 60px; }
        
        .project-card { cursor: pointer; transition: 0.4s; }
        .img-holder { width: 100%; aspect-ratio: 4/5; overflow: hidden; background: #0d0d0d; border: 1px solid #1a1a1a; }
        .img-holder img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: 0.8s; }
        .project-card:hover img { filter: grayscale(0%); transform: scale(1.05); }
        
        .info-holder { padding: 15px 0; }
        .info-holder h3 { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; margin: 0; letter-spacing: 2px; }
        .info-holder p { font-family: monospace; font-size: 0.7rem; color: #666; text-transform: uppercase; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 10000; display: flex; align-items: center; justify-content: center; }
        .modal-content { width: 90%; max-width: 800px; text-align: center; }
        .modal-content img { max-height: 75vh; border: 1px solid #333; }

        @media (max-width: 768px) {
          .outros-grid { flex-direction: column; }
          .column-parallax { transform: none !important; }
        }
      `}</style>

      <div className="outros-grid">
        {/* COLUNA ESQUERDA */}
        <div className="column-parallax">
          {colLeft.map(p => (
            <div key={p.id} className="project-card" onClick={() => handleProjectClick(p)}>
              <div className="img-holder"><img src={p.img} alt={p.title} /></div>
              <div className="info-holder"><h3>{p.title}</h3><p>{p.subtitle}</p></div>
            </div>
          ))}
        </div>

        {/* COLUNA MEIO */}
        <div className="column-parallax">
          {colMid.map(p => (
            <div key={p.id} className="project-card" onClick={() => handleProjectClick(p)}>
              <div className="img-holder"><img src={p.img} alt={p.title} /></div>
              <div className="info-holder"><h3>{p.title}</h3><p>{p.subtitle} {p.gallery && "• [GALERIA]"}</p></div>
            </div>
          ))}
        </div>

        {/* COLUNA DIREITA */}
        <div className="column-parallax">
          {colRight.map(p => (
            <div key={p.id} className="project-card" onClick={() => handleProjectClick(p)}>
              <div className="img-holder"><img src={p.img} alt={p.title} /></div>
              <div className="info-holder"><h3>{p.title}</h3><p>{p.subtitle}</p></div>
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="modal-content">
            <img src={selectedImg.current} alt="view" />
          </div>
        </div>
      )}
    </div>
  );
}

export default WebProjects;