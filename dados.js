<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre - Mapa OSC</title>
  <link rel="stylesheet" href="css/base.css">
  <style>
    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
    }
    .card {
      background: white;
      padding: 45px 50px;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .card h1 {
      color: #1a3c2e;
      font-size: 1.6rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .card p {
      color: #444;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .btn-back {
      display: inline-block;
      margin-top: 20px;
      color: #1a5a3b;
      text-decoration: none;
      font-weight: 500;
      padding: 10px 24px;
      border: 1.5px solid #1a5a3b;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .btn-back:hover {
      background: #1a5a3b;
      color: white;
    }
    @media (max-width: 768px) {
      .card { padding: 25px 20px; }
    }
  </style>
</head>
<body>

<nav id="navbar">
  <div id="navbar-left">
    <div id="navbar-logo">Mapa OSC</div>
    <ul class="nav-links">
      <li><a href="index.html">Início</a></li>
      <li><a href="sobre.html">Sobre</a></li>
      <li><a href="contato.html">Contato</a></li>
      <li><a href="#">Ajuda</a></li>
    </ul>
  </div>
</nav>

<div class="container">
  <div class="card">
    <h1>Sobre o Mapa OSC</h1>
    <p>
      O Mapa OSC é uma iniciativa da sociedade civil para mapear e divulgar Organizações da Sociedade Civil 
      que atuam no atendimento a migrantes no estado do Paraná.
    </p>
    <p>
      Nosso objetivo é facilitar o acesso a informações sobre serviços e apoio disponíveis para a população migrante, 
      promovendo a integração e o exercício da cidadania.
    </p>
    <p>
      Este projeto é mantido por voluntários e não possui fins lucrativos.
    </p>
    <a href="index.html" class="btn-back">← Voltar para o mapa</a>
  </div>
</div>

<footer id="footer">
  <div id="footer-content">
    <a href="termos-uso.html">Termos de Uso</a>
    <span class="footer-divider">|</span>
    <a href="#">Avaliação de Serviço</a>
    <span class="footer-divider">|</span>
    <a href="#">Campanha de Cadastramento</a>
  </div>
  <div id="footer-copy">© 2026 Mapa OSC</div>
</footer>

</body>
</html>
