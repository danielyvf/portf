import React, { useLayoutEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// IMPORTAÇÕES DE IMAGENS
import pagina1 from "../assets/images/pagina1.jpg";
import pagina2 from "../assets/images/pagina2.jpg";
import pagina3 from "../assets/images/pagina3.jpg";
import pagina4 from "../assets/images/pagina4.jpg";
import pagina5 from "../assets/images/pagina5.jpg";
import pagina6 from "../assets/images/pagina6.jpg";
import pagina7 from "../assets/images/pagina7.jpg";

// GALERIAS PYTHON
import foto1 from '../assets/images/foto1.jpg'; import foto2 from '../assets/images/foto2.jpg';
import foto3 from '../assets/images/foto3.jpg'; import foto4 from '../assets/images/foto4.jpg';
import foto5 from '../assets/images/foto5.jpg'; import foto6 from '../assets/images/foto6.jpg';
import img1 from '../assets/images/img1.jpg'; import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg'; import img4 from '../assets/images/img4.jpg';

function OutrosProjetos() {
  const [selectedImg, setSelectedImg] = useState(null);
  const sectionRef = useRef(null);

  // ESTRUTURA DE DADOS (LINKS E GALERIAS)
  const col1 = [
    { id: "p1", title: "RAMP", subtitle: "HTML, CSS e Javascript", img: pagina1, link: "https://ramp-danielyvfs-projects.vercel.app/" },
    { id: "p2", title: "Animals", subtitle: "HTML, CSS Layout & Grid", img: pagina2, link: "https://animals--phi.vercel.app/" }
  ];
  const col2 = [
    { id: "p5", title: "Automatização", subtitle: "Python & SQLite", img: pagina5, gallery: [foto1, foto2, foto3, foto4, foto5, foto6] },
    { id: "p3", title: "EcoBlog", subtitle: "Html, CSS Flexbox", img: pagina3, link: "https://flexblog-orpin.vercel.app/" },
    { id: "p6", title: "Análise de Dados", subtitle: "Pandas & Numpy", img: pagina6, gallery: [img1, img2, img3, img4] }
  ];
  const col3 = [
    { id: "p4", title: "Café", subtitle: "React", img: pagina4, link: "https://webcafe-nu.vercel.app/" },
    { id: "p7", title: "Houses", subtitle: "React", img: pagina7, link: "https://arqweb.vercel.app/" }
  ];

  useLayoutEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const dist = 500; 

      // Coluna 0 (Sobe)
      gsap.fromTo(".col-0", { y: dist }, { y: -dist, ease: "none", scrollTrigger: {
        trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1
      }});

      // Coluna 1 (Desce)
      gsap.fromTo(".col-1", { y: -dist }, { y: dist, ease: "none", scrollTrigger: {
        trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1
      }});

      // Coluna 2 (Sobe)
      gsap.fromTo(".col-2", { y: dist }, { y: -dist, ease: "none", scrollTrigger: {
        trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1
      }});
    }, sectionRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const handleProjectClick = (proj) => {
    if (proj.gallery) {
      setSelectedImg({ current: proj.gallery[0], all: proj.gallery });
    } else if (proj.link) {
      window.open(proj.link, "_blank");
    }
  };

  return (
    <section className="outros-area" ref={sectionRef}>
      <style>{`
        .outros-area { background: #000; padding: 300px 0; overflow: hidden; width: 100%; position: relative; }
        .outros-grid { display: flex; justify-content: center; gap: 5vw; max-width: 1400px; margin: 0 auto; padding: 0 40px; align-items: flex-start !important; }
        .outros-col { flex: 1; display: block; height: auto !important; }
        .column-inner { display: flex; flex-direction: column; gap: 120px; will-change: transform; }
        
        .card { cursor: pointer; color: #fff; width: 100%; }
        .img-box { width: 100%; aspect-ratio: 3/4; overflow: hidden; background: #111; border: 1px solid #222; }
        .img-box img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); transition: 0.6s ease; }
        .card:hover img { filter: grayscale(0); transform: scale(1.05); }
        
        .meta { padding-top: 15px; }
        .meta h3 { font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem; margin: 0; letter-spacing: 2px; }
        .meta p { color: #555; font-family: monospace; font-size: 0.8rem; margin-top: 5px; }

        /* Modal Galeria */
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-content { max-width: 900px; width: 100%; text-align: center; }
        .modal-content img.main { max-height: 70vh; max-width: 100%; border: 1px solid #333; margin-bottom: 20px; }
        .thumbs { display: flex; gap: 10px; justify-content: center; overflow-x: auto; padding-bottom: 10px; }
        .thumbs img { width: 60px; height: 40px; object-fit: cover; cursor: pointer; opacity: 0.4; border: 1px solid transparent; }
        .thumbs img.active { opacity: 1; border-color: #fff; }

        @media (max-width: 900px) {
          .outros-grid { flex-direction: column; align-items: center !important; }
          .column-inner { transform: none !important; gap: 60px; }
          .outros-area { padding: 100px 0; }
        }
      `}</style>

      <div className="outros-grid">
        {/* COLUNA 0 */}
        <div className="outros-col">
          <div className="column-inner col-0">
            {col1.map(p => (
              <div key={p.id} className="card" onClick={() => handleProjectClick(p)}>
                <div className="img-box"><img src={p.img} alt={p.title} /></div>
                <div className="meta"><h3>{p.title}</h3><p>{p.subtitle}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 1 */}
        <div className="outros-col">
          <div className="column-inner col-1">
            {col2.map(p => (
              <div key={p.id} className="card" onClick={() => handleProjectClick(p)}>
                <div className="img-box"><img src={p.img} alt={p.title} /></div>
                <div className="meta"><h3>{p.title}</h3><p>{p.subtitle} {p.gallery && "• GALERIA"}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 2 */}
        <div className="outros-col">
          <div className="column-inner col-2">
            {col3.map(p => (
              <div key={p.id} className="card" onClick={() => handleProjectClick(p)}>
                <div className="img-box"><img src={p.img} alt={p.title} /></div>
                <div className="meta"><h3>{p.title}</h3><p>{p.subtitle}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE GALERIA */}
      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImg.current} className="main" alt="Preview" />
            <div className="thumbs">
              {selectedImg.all.map((foto, idx) => (
                <img 
                  key={idx} 
                  src={foto} 
                  className={selectedImg.current === foto ? 'active' : ''}
                  onClick={() => setSelectedImg({...selectedImg, current: foto})}
                />
              ))}
            </div>
            <p style={{color: '#fff', marginTop: '10px', fontSize: '0.8rem', cursor: 'pointer'}} onClick={() => setSelectedImg(null)}>FECHAR [X]</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default OutrosProjetos;