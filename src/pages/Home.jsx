import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

class TouchTexture {
  constructor() {
    this.size = 64; this.maxAge = 64; this.radius = 0.25 * this.size;
    this.trail = []; this.last = null; this.initTexture();
  }
  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.Texture(this.canvas);
  }
  update() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.size, this.size);
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i]; p.age++;
      if (p.age > this.maxAge) this.trail.splice(i, 1);
      else this.drawPoint(p);
    }
    this.texture.needsUpdate = true;
  }
  addTouch(point) {
    let force = 0, vx = 0, vy = 0;
    if (this.last) {
      const dx = point.x - this.last.x, dy = point.y - this.last.y;
      if (dx === 0 && dy === 0) return;
      const d = Math.sqrt(dx * dx + dy * dy);
      vx = dx / d; vy = dy / d; force = Math.min(d * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }
  drawPoint(p) {
    const x = p.x * this.size, y = (1 - p.y) * this.size;
    let intensity = p.age < this.maxAge * 0.3 ? Math.sin((p.age / (this.maxAge * 0.3)) * (Math.PI / 2)) : 1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
    intensity *= p.force;
    this.ctx.shadowBlur = this.radius;
    this.ctx.shadowColor = `rgba(${((p.vx + 1) / 2) * 255},${((p.vy + 1) / 2) * 255},${intensity * 255},${0.2 * intensity})`;
    this.ctx.beginPath(); this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(x, y, this.radius, 0, Math.PI * 2); this.ctx.fill();
  }
}

function Home() {
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const appRef = useRef({ uniforms: null });
  const [activeScheme, setActiveScheme] = useState(1);

  const schemes = {
    1: { c1: "#F15A22", c2: "#0A0E27", navy: "#0a0e27", gSize: 0.45, gCount: 12, speed: 1.5, w1: 0.5, w2: 1.8 },
    2: { c1: "#965db4", c2: "#0a0e27", navy: "#0a0e27", gSize: 1.0, gCount: 6, speed: 1.2, w1: 1.0, w2: 1.0 },
    3: { c1: "#40E0D0", c2: "#0A0E27", navy: "#0A0E27", gSize: 0.45, gCount: 12, speed: 1.5, w1: 0.5, w2: 1.8 },
  };

  useEffect(() => {
    const textElement = textRef.current;
    const originalText = "portfolio";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    textElement.innerHTML = "";
    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.innerHTML = char;
      textElement.appendChild(span);
    });
    const letters = Array.from(textElement.children);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    letters.forEach((letter, i) => {
      const originalChar = letter.innerHTML;
      tl.to({}, {
        duration: 0.8,
        onUpdate: () => { letter.textContent = chars[Math.floor(Math.random() * chars.length)]; },
        onComplete: () => { letter.textContent = originalChar; }
      }, i * 0.05);
    });

    const touch = new TouchTexture();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTouchTexture: { value: touch.texture },
      uColor1: { value: new THREE.Color(schemes[1].c1) },
      uColor2: { value: new THREE.Color(schemes[1].c2) },
      uDarkNavy: { value: new THREE.Color(schemes[1].navy) },
      uGradientSize: { value: schemes[1].gSize },
      uGradientCount: { value: schemes[1].gCount },
      uSpeed: { value: schemes[1].speed },
      uColor1Weight: { value: schemes[1].w1 },
      uColor2Weight: { value: schemes[1].w2 },
      uGrainIntensity: { value: 0.08 },
      uIntensity: { value: 1.8 }
    };
    appRef.current.uniforms = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float uTime; uniform vec2 uResolution; uniform sampler2D uTouchTexture;
        uniform vec3 uColor1, uColor2, uDarkNavy;
        uniform float uGradientSize, uGradientCount, uSpeed, uColor1Weight, uColor2Weight, uGrainIntensity, uIntensity;
        varying vec2 vUv;
        float grain(vec2 uv, float time) {
          vec2 gUv = uv * uResolution * 0.5;
          return fract(sin(dot(gUv + time, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
        }
        void main() {
          vec2 uv = vUv;
          vec4 touchTex = texture2D(uTouchTexture, uv);
          float intensity = touchTex.b;
          uv.x += -(touchTex.r * 2.0 - 1.0) * 0.8 * intensity;
          uv.y += -(touchTex.g * 2.0 - 1.0) * 0.8 * intensity;
          float dist = length(uv - 0.5);
          uv += sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
          vec3 color = uDarkNavy;
          for(int i=0; i<12; i++) {
            if(float(i) >= uGradientCount) break;
            float fi = float(i);
            vec2 center = vec2(0.5 + sin(uTime * uSpeed * 0.4 + fi) * 0.4, 0.5 + cos(uTime * uSpeed * 0.5 + fi) * 0.4);
            float d = length(uv - center);
            float influence = 1.0 - smoothstep(0.0, uGradientSize, d);
            vec3 targetCol = (mod(fi, 2.0) == 0.0) ? uColor1 : uColor2;
            float weight = (mod(fi, 2.0) == 0.0) ? uColor1Weight : uColor2Weight;
            color += targetCol * influence * weight * (0.55 + 0.45 * sin(uTime + fi));
          }
          color = clamp(color, 0.0, 1.0) * uIntensity;
          color += grain(uv, uTime) * uGrainIntensity;
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const fovRad = (camera.fov * Math.PI) / 180;
    const h = Math.abs(camera.position.z * Math.tan(fovRad / 2) * 2);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(h * camera.aspect, h), material);
    scene.add(mesh);

    const animate = () => {
      uniforms.uTime.value += 0.01; touch.update();
      renderer.render(scene, camera); requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e) => touch.addTouch({ x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const changeScheme = (id) => {
    setActiveScheme(id);
    const u = appRef.current.uniforms; const s = schemes[id]; if (!u) return;
    u.uColor1.value.set(s.c1); u.uColor2.value.set(s.c2);
    u.uGradientSize.value = s.gSize; u.uGradientCount.value = s.gCount;
    u.uColor1Weight.value = s.w1; u.uColor2Weight.value = s.w2;
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#000", overflow: "hidden" }}>
      <style>{`
        .color-controls {
          position: fixed; top: 30px; right: 30px; z-index: 1000;
          display: flex; gap: 12px; padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px);
          border-radius: 50px; border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .color-btn {
          background: transparent; border: none; color: rgba(255, 255, 255, 0.4);
          display: flex; align-items: center; gap: 10px; cursor: pointer;
          padding: 8px 15px; border-radius: 30px; transition: 0.4s;
        }
        .color-dot { width: 10px; height: 10px; border-radius: 50%; }
        .color-btn.active { background: #fff; color: #000; font-weight: bold; }

        .hero-main {
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; height: 100vh; width: 100%;
          position: relative; z-index: 1; pointer-events: none;
        }
        .hero-content { pointer-events: auto; text-align: center; max-width: 800px; padding: 0 20px; }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }} />
      
      <div className="color-controls">
        {[1, 2, 3].map(id => (
          <button key={id} onClick={() => changeScheme(id)} className={`color-btn ${activeScheme === id ? 'active' : ''}`}>
            <span className="color-dot" style={{ backgroundColor: schemes[id].c1 }}></span>
            <span style={{ fontFamily: 'Roboto Mono', fontSize: '0.8rem' }}>0{id}</span>
          </button>
        ))}
      </div>

      <div className="hero-main">
        <div className="hero-content">
          <h1 ref={textRef} className="bebas-neue-regular" style={{ fontSize: "6vw", color: "#fff", margin: "0", letterSpacing: "-2px" }} />
          
          <div style={{ marginTop: "40px" }}>
            {/* Primeiro P (Nome) */}
            <p className="roboto-mono" style={{ color: "#fff", letterSpacing: "5px", borderBottom: "2px solid rgba(255,255,255,0.2)", paddingBottom: "10px", display: "inline-block", fontWeight: "bold", marginBottom: "20px" }}>
              DANIELY VENTURA
            </p>
            
            {/* Segundo P (Descrição) - Restaurado aqui */}
            <p className="roboto-mono" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "2px", lineHeight: "1.6", fontSize: "1rem" }}>
              Com um foco em soluções modernas e responsivas, meu objetivo é fornecer sites que atendem às necessidades de negócios de todos os tamanhos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;