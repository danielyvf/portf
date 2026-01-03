import { BrowserRouter } from "react-router-dom";

// Components
import Header from "./components/header";
import Footer from "./components/Footer";

// Páginas (Seções)
import Home from "./pages/Home";
import OutrosProjetos from "./pages/OutrosProjetos"; 
import Contato from "./pages/Contato";

// Arquivos CSS
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      {/* O Header precisa dos IDs para saber onde 'pousar' o scroll */}
      <Header />

      <main>
        {/* Seção 1: Home (Fundo Líquido) */}
        <section id="home">
          <Home />
        </section>

        {/* Seção 2: Projetos (As 7 imagens com Parallax) 
            O ID 'projetos' é a 'âncora' que o botão do header vai buscar.
        */}
        <section id="projetos">
          <OutrosProjetos />
        </section>

        {/* Seção 3: Contato */}
        <section id="contato">
          <Contato />
        </section>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;