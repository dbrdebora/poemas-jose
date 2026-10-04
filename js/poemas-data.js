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
  },


  {
    id: 7,
    title: "Nordestino é 'nó cego'",
    category: "Sertão",
    year: "07/02/2026",
    images: null,
    audio: null,
    excerpt: `Nordestino é "nó cego"
Cabra duro é assim
Osso duro de roer`,
    content: `Nordestino é "nó cego"
Cabra duro é assim
Osso duro de roer
_Bota um trago para mim...
Cachaça com música boa
Nordestina em pessoa
Te respeito em cortesia
Na música, na poesia
Se canto não fico atoa.`
  },

   {
    id: 8,
    title: "Os pobres",
    category: "Sertão",
    year: "28/02/2026",
    images: null,
    audio: null,
    excerpt: `Tu és pobre?
_Não; só estou errado.
Moro errado, no outro lugar
faço errado o meu dever
estudo errado, aprendo errado`,
    content: `Tu és pobre?
_Não; só estou errado.
Moro errado, no outro lugar
faço errado o meu dever
estudo errado, aprendo errado
trabalho errado e ganho errado
falo errado, e escuto errado
escrevo errado, leio errado
não sei cantar nem mentir
não sei calar nem fingir.
Pobre é o ladrão
que rouba o país
que mata a nação
não faz o que diz;
destrói hospitais,
e mata as crianças
e mata os homens,
e mata as mulheres;
destrói esperanças...
Pobre é o diabo,
e seus seguidores;
uns chamam políticos:
"Os demolidores".`
  },


   {
    id: 9,
    title: "Aldeias Altas és bendita!",
    category: "Memórias",
    year: "15/01/2026",
    images: null,
    audio: null,
    excerpt: `Aldeias Altas és bendita!
Suas batalhas e suas glórias`,
    content: `Aldeias Altas és bendita!
Suas batalhas e suas glórias,
História com honras dita
Trabalho, suor e Vitórias.`
  },




   {
    id: 10,
    title: "As secas",
    category: "Sertão",
    year: "05/11/2025",
    images: null,
    audio: null,
    excerpt: `as secas, as vidas
as terras, as cercas
sem vida, sem verde
sem rumo, sem passos
os laços, os bichos
os lixos, o mato`,
    content: `as secas, as vidas
as terras, as cercas
sem vida, sem verde
sem rumo, sem passos
os laços, os bichos
os lixos, o mato
sem calço, o sapato
a pobre Baleia
um tiro na veia
naquela quentura
sem nada e fartura
o sol, o carinho
o fogo, o espinho
os passos do chão.
_Inferno ou Sertão?
O inverno se foi
a cabra, o boi
um mar de aventura
fiel literatura
assim como amo...
já fez Graciliano.`
  },









];