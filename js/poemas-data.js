/*
  ════════════════════════════════════════════════════════
  BANCO DE DADOS DOS POEMAS — José de Arimateia
  ════════════════════════════════════════════════════════

  CAMPOS DISPONÍVEIS:
  ─────────────────────────────────────────────────────
  id       → número único do poema
  title    → título do poema
  category → "Sertão" | "Amor" | "Memórias"
  excerpt  → trecho curto para o card
  content  → poema completo
  year     → ano de escrita — ou null

  CAMPO DE IMAGENS (galeria dentro do modal):
  ─────────────────────────────────────────────────────
  images   → array de caminhos de imagens
             Coloque as fotos em: assets/images/poemas/
             Pode ter quantas quiser por poema

  Exemplos:
    images: null                          → sem galeria
    images: ["assets/images/poemas/amanhecer-1.jpg"]
    images: [
      "assets/images/poemas/sertanejo-1.jpg",
      "assets/images/poemas/sertanejo-2.jpg",
      "assets/images/poemas/sertanejo-3.jpg"
    ]

  CAMPO DE ÁUDIO:
  ─────────────────────────────────────────────────────
  audio    → caminho do arquivo de áudio — ou null
             Coloque os áudios em: assets/audio/
  Exemplo: audio: "assets/audio/amanhecer.mp3"

  ════════════════════════════════════════════════════════
*/

const poemsData = [
  {
    id: 1,
    title: "Amanhecer",
    category: "Sertão",
    year: null,
    images: null,
    audio: null,
    excerpt: `O mundo me espera
vou logo cumprir
meu santo dever...`,
    content: `O mundo me espera
vou logo cumprir
meu santo dever
pintar colorir
Um Sol bem bonito
me aquece no dia
trabalho bem firme
levando alegria.`
  },

  {
    id: 2,
    title: "O Bom Sertanejo",
    category: "Sertão",
    year: "2025",
    images: null,
    audio: null,
    excerpt: `Para um bom sertanejo
Aqui é uma cultura
A queima da roça...`,
    content: `Para um bom sertanejo
Aqui é uma cultura
A queima da roça
Para a agricultura
No mês de outubro
Mil graus de quentura
Num sol de agonia
Se faz poesia
E literatura.`
  },

  {
    id: 3,
    title: "Soberania",
    category: "Memórias",
    year: "01/01/2026",
    images: null,
    audio: null,
    excerpt: `Não é pelo ar puro
Nem pela beleza
Mas a natureza...`,
    content: `Não é pelo ar puro
Nem pela beleza
Mas a natureza
Traz vida e alegria
Paz e poesia
Cores e sabores
Soberania.`
  },

  {
    id: 4,
    title: "Homenagem a Gonçalves Dias",
    category: "Memórias",
    year: "agosto de 2025",
    images: null,
    audio: null,
    excerpt: `Em terras distantes, aqui...
Nordeste; nas matas nascia...
O menino se fez poesia.`,
    content: `Em terras distantes, aqui...
Nordeste; nas matas nascia.
Crescia, depois se exilou.
O menino se fez poesia.
Duzentos anos passaram,
mas vive: é Gonçalves Dias.`
  },

  {
    id: 5,
    title: "Caminhos do Afeto",
    category: "Amor",
    year: null,
    images: null,
    audio: null,
    excerpt: `No silêncio da tarde que desce suave,
O peito encontra um porto seguro...`,
    content: `No silêncio da tarde que desce suave,
O peito encontra um porto seguro.
O afeto é a luz que o tempo não apaga,
A ponte firme sobre o futuro.

Entre os versos que canto pra terra,
Guardo o amor como fonte e oração,
Pois onde há sentimento sincero,
Floresce a paz no meu coração.`
  },

  {
    id: 6,
    title: 'Nordestino é "nó cego"',
    category: "Sertão",
    year: "2026",
    images: null,
    audio: null,
    excerpt: `Nordestino é "nó cego"
Cabra duro é assim...
Osso duro de roer.`,
    content: `Nordestino é "nó cego"
Cabra duro é assim
Osso duro de roer
Bota um trago para mim...
Cachaça com música boa
Nordestina em pessoa
Te respeito em cortesia
Na música, na poesia
Se canto não fico atoa..`
  }
];