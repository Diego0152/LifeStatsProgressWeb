import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-content-wrapper">
      {/* --- HERO: EL MANIFIESTO --- */}
      <header className="home-hero">
        <div className="hero-status-bar">
          <span className="status-tag">SISTEMA_DE_ALTO_RENDIMIENTO_ACTIVO</span>
          <span className="version-tag">ESTADO: OPTIMIZANDO</span>
        </div>
        <h1 className="hero-title">RECLAMA TU <span className="neon-text">GRANDEZA_</span></h1>
        
        <div className="hero-manifesto-expanded">
          <p className="hero-description">
            La mayoría de las personas operan bajo un software obsoleto, aceptando la mediocridad como su estado base. 
            <strong> Objective_OS</strong> no es una simple aplicación; es el parche de rendimiento para tu hardware biológico. 
            Hemos fusionado la psicología de vanguardia con la disciplina de grado militar para crear un entorno donde 
            el fracaso no es una opción, sino un error de sistema que vamos a corregir juntos.
          </p>
          <blockquote className="passion-quote">
            "La distancia entre quien eres y quien quieres ser, es lo que haces. Y lo que haces se gestiona aquí."
          </blockquote>
        </div>
      </header>

      {/* --- SECCIÓN 2: PROTOCOLOS (NUEVA INFORMACIÓN) --- */}
      <section className="info-expansion-block">
        <div className="protocol-grid">
          <div className="protocol-item">
            <span className="protocol-idx">01</span>
            <h4>INGENIERÍA DE HÁBITOS</h4>
            <p>No dejamos nada al azar. Cada pequeña acción es un bit de información que construye tu nueva identidad de alto impacto.</p>
          </div>
          <div className="protocol-item">
            <span className="protocol-idx">02</span>
            <h4>ARQUITECTURA DE ENFOQUE</h4>
            <p>Elimina el ruido. Nuestra interfaz está diseñada para que tu atención se dirija exclusivamente a lo que te hace evolucionar.</p>
          </div>
          <div className="protocol-item">
            <span className="protocol-idx">03</span>
            <h4>VISUALIZACIÓN DE DATA</h4>
            <p>Lo que no se mide, no se puede mejorar. Observa tu ascenso con precisión quirúrgica a través de métricas de progreso real.</p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: EL ARGUMENTO (FOTO + TEXTO) --- */}
      <section className="manifesto-block">
        <div className="manifesto-grid">
          <div className="manifesto-text">
            <h2>HACKEA TU <span className="secondary-neon">REALIDAD</span></h2>
            <p>
              ¿Cuándo fue la última vez que sentiste que tenías el control total de tu destino? 
              Estamos aquí para despertar ese instinto de conquista. A través de este sistema, 
              tus sueños dejan de ser deseos vagos para convertirse en <strong>directrices ejecutables</strong>.
            </p>
            <p className="pasion-extra">
              No busques motivación. Busca sistemas. La motivación es una chispa que se apaga; 
              un sistema bien diseñado es un motor que te lleva al límite humano día tras día.
            </p>
            <div className="mini-terminal">
              <code>{">"} Escaneando potencial latente... Encontrado: 100%</code>
              <code>{">"} Protocolo 'SIN_EXCUSAS' cargado correctamente.</code>
              <code>{">"} Estado: ESPERANDO TU PRIMER MOVIMIENTO.</code>
            </div>
          </div>
          <div className="manifesto-visual">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000" alt="Cyber Technology" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: CTA FINAL --- */}
      <section className="cta-block">
        <div className="cta-card">
          <div className="cta-header">
            <h3>NÚCLEO DE OBJETIVOS SIN INICIALIZAR</h3>
            <p>Advertencia: Un hombre sin metas es energía desperdiciada a la deriva.</p>
          </div>
          <div className="cta-body">
            <h4>EMPIEZA A CONSTRUIR TU MEJOR VERSIÓN</h4>
            <p>
              El tiempo es el único recurso que no puedes recuperar. No permitas que otro día pase en modo automático. 
              Establece tu primera meta y permite que el sistema comience a procesar tu transformación.
            </p>
            <button className="btn-action-glow" onClick={() => navigate('/login')}>
              INICIAR PROTOCOLO DE META
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;