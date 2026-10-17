// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║              ✦  ÁREA DE CONFIGURAÇÃO — EDITE AQUI  ✦              ║
// ║                                                                    ║
// ║   Todos os textos, fotos, música, datas e cores que aparecem no    ║
// ║   site podem ser alterados neste único arquivo.                    ║
// ║   Não é preciso mexer em nenhum outro lugar.                       ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

// ─────────────────────────────────────────────
// 🎵 MÚSICA DE FUNDO
// ─────────────────────────────────────────────
// Substitua o arquivo em /public/music.mp3 por sua música
// OU altere o caminho abaixo para apontar para outro arquivo.
// Formatos suportados: mp3, ogg, wav, m4a
export const MUSIC_SRC = `${import.meta.env.BASE_URL}music.mp3`;
export const MUSIC_VOLUME = 0.45; // 0 a 1

// ─────────────────────────────────────────────
// 💙 NOME DA PESSOA
// ─────────────────────────────────────────────
export const PERSON_NAME = 'Luís';

// ─────────────────────────────────────────────
// 🌌 TELA INICIAL
// ─────────────────────────────────────────────
export const INTRO = {
  mainText: 'fiz pensando em você, mozi',
  subText: 'Então... fica mais um pouquinho?.',
  buttonText: 'Entrar',
  buttonIcon: '✦',
  hint: '♫ Recomendo usar fones.',
};

// ─────────────────────────────────────────────
// 💌 SEÇÃO 1 — A CARTA
// ─────────────────────────────────────────────
export const LETTER = {
  title: 'Antes de qualquer coisa...',
  // Cada item do array é um parágrafo, revelado gradualmente ao rolar.
  paragraphs: [
    'Eu não sei bem por onde começar. Talvez porque, quando algo importa demais, as palavras sempre parecem pequenas demais.',
    'Mas eu sei que eu queria te dar algo que não coubesse num embrulho. Algo que ficasse com você para sempre. E que mesmo que você não pudesse tocar, pelo menos pudesse sentir.',
    'Eu pensei em cada detalhe disso aqui. Cada cor, cada palavra, cada segundo que você vai passar olhando. E enquanto eu montava, eu sorria — porque sabia que, em algum momento, você estaria aqui, lendo com esses olhos apaixonantes.',
    'Isso não é apenas um site. É um modo de dizer que você existe de um jeito que mudou a minha forma de olhar pra coisas simples, mesmo que daí.',
  ],
  closing: 'Se já está aqui...\nacho que já pode continuar :).',
};

// ─────────────────────────────────────────────
// ✨ SEÇÃO 2 — PEQUENAS COISAS
// ─────────────────────────────────────────────
export const SMALL_THINGS = {
  title: 'Porque são as pequenas coisas...',
  subtitle: 'clique e leia cada uma ;).',
  cards: [
    {
      front: 'Seu jeito de me amar.',
      hidden: 'Tem dias que eu ouço sua voz na minha cabeça e preciso de um tempo, só pra sorrir (Como bestakk).',
    },
    {
      front: 'Seu sorriso (completamente apaixonada).',
      hidden: 'Não é só um sorriso. É o aquilo que me faz sentir tudo aquilo que nunca soube que existia. E que, de repente, passou a existir só por você existir.',
    },
    {
      front: 'As nossas conversas toscas.',
      hidden: 'Aquelas que me fazem rir e me fazem estresse sempre que possivel. E que, mesmo assim, eu não trocaria por nada.',
    },
    {
      front: 'Os momentos que parecem pequenos.',
      hidden: 'Mas que, quando me lembro, me fazem rir como se fosse a primeira vez. E me fazem sentir que, mesmo que o mundo seja grande, a gente consegue fazer dele um lugar só nosso.',
    },
    {
      front: 'A forma como você me escuta.',
      hidden: 'sem precisar de palavras, sem precisar de explicações. Só você e eu, e o mundo inteiro parece parar pra ouvir.',
    },
    {
      front: 'Você sendo você.',
      hidden: 'Sem precisar de máscaras, sem precisar de filtros. É o que me faz sentir que tudo que eu pudesse ter não faria sentido sem você.'
    },
  ],
};

// ─────────────────────────────────────────────
// 📸 SEÇÃO 3 — MEMÓRIAS (GALERIA)
// ─────────────────────────────────────────────
// Substitua as URLs das fotos por suas próprias imagens.
// Você pode usar URLs diretas ou colocar arquivos em /public.
export const MEMORIES = {
  title: 'Eu i você.',
  subtitle: 'fofinhos :>.',
  photos: [
    {
      src: 'https://i.pinimg.com/736x/53/56/0a/53560a16aabd62580388665643bbee48.jpg',
      caption: 'xonadinhos.',
      size: 'tall',
      rotate: -4,
    },
    {
      src: 'https://i.pinimg.com/736x/fc/27/35/fc27353284fb5cc8d9c59f251db5f073.jpg',
      caption: 'besinho.',
      size: 'square',
      rotate: 3,
    },
    {
      src: 'https://i.pinimg.com/736x/a5/2e/d1/a52ed12cd5f3dd7df2a2f80be34fcecd.jpg',
      caption: 'casamo:.',
      size: 'wide',
      rotate: -2,
    },
    {
      src: 'https://i.pinimg.com/736x/6f/a6/8b/6fa68bc96d2e838540587db78f55ccdb.jpg',
      caption: 'oxe que raiva.',
      size: 'tall',
      rotate: 5,
    },
    {
      src: 'https://i.pinimg.com/736x/04/1d/d7/041dd72940965f14696c0e159e411b71.jpg',
      caption: 'Zzz....',
      size: 'square',
      rotate: -3,
    },
    {
      src: 'https://i.pinimg.com/736x/fb/09/59/fb0959db9390269fde86dbc1daa48b8f.jpg',
      caption: ':>',
      size: 'wide',
      rotate: 2,
    },
    {
      src: 'https://i.pinimg.com/736x/6c/5c/c6/6c5cc6bef8dba639c5979be5bcd218e8.jpg',
      caption: 'voce.',
      size: 'tall',
      rotate: -5,
    },
    {
      src: 'https://i.pinimg.com/736x/f6/77/48/f67748dd0e13a7d15dae44faf621c4a2.jpg',
      caption: 'i eu.',
      size: 'square',
      rotate: 4,
    },
  ],
};

// ─────────────────────────────────────────────
// 🌠 SEÇÃO 4 — CONSTELAÇÃO
// ─────────────────────────────────────────────
export const CONSTELLATION = {
  title: 'Se eu pudesse guardar algumas coisas...',
  subtitle: 'Clique nas estrelas. Cada uma tem algo pro meu mo ;>.',
  stars: [
    { x: 15, y: 35, message: 'O som da sua risada que me faz sorrir mesmo sem querer.' },
    { x: 28, y: 22, message: 'O jeito que sorri para coisas bestas.' },
    { x: 42, y: 30, message: 'A sua calma, mesmo quando te tiro do sério.' },
    { x: 55, y: 18, message: 'A forma como você cuida das coisas sem alarde.' },
    { x: 68, y: 28, message: 'Seu carinho com as coisas simples.' },
    { x: 80, y: 22, message: 'A honestidade com que você vive.' },
    { x: 20, y: 55, message: 'O jeito que você transforma um dia comum em algo mais que perfeito.' },
    { x: 35, y: 62, message: 'Sua paciência com as coisas que não se há de haver.' },
    { x: 50, y: 58, message: 'A coragem de ser quem você é, sem pedir licença.' },
    { x: 65, y: 63, message: 'A forma como você faz o silêncio parecer confortável.' },
    { x: 78, y: 55, message: 'O gesto pequeno que você nem sabe que faz - que me toca.' },
    { x: 88, y: 48, message: 'O simples fato de você existir.' },
    { x: 12, y: 45, message: 'A qualidade de existir com você e por você.' },
    { x: 45, y: 45, message: 'O alguém mais incrível que tenho, sem ter que se esforçar pra isso.' },
    { x: 72, y: 42, message: 'A certeza de que tudo, com você, vale cada segundo.' },
  ],
};

// ─────────────────────────────────────────────
// 💙 SEÇÃO 5 — CONTADOR DE MOMENTOS
// ─────────────────────────────────────────────
// Altere a data abaixo para o dia que marcou o início de tudo.
// Formato: 'AAAA-MM-DDTHH:MM:SS'
export const COUNTER = {
  title: 'Desde aquele dia...',
  startDate: '2026-09-01T19:30:00',
  closingPhrase: 'E, de alguma forma, cada segundo valeu a pena.',
};

// ─────────────────────────────────────────────
// 🎁 SEÇÃO 6 — A SURPRESA
// ─────────────────────────────────────────────
export const SURPRISE = {
  title: 'ainda tenho uma coisa....',
  boxHint: 'Clique para abrir :).',
  // Primeira mensagem — revelada ao abrir a caixa
  firstMessage:
    'Eu não sei te explicar o que você é pra mim com precisão. Mas eu sei que, antes de você, algumas cores eram mais opacas. E depois de você, tudo parece ter um brilho que eu não sabia que existia.\n\nVocê não precisa fazer nada pra merecer isso. Você já é, por si só, o motivo. Eu te almo, com a alma, com o coração, com tudo que eu sou. E eu espero que você sinta isso, mesmo que seja só um pouquinho.',
  // Botão que revela a segunda mensagem
  moreButtonText: 'mais uma coisinha...',
  // Segunda mensagem — revelada ao clicar no botão
  secondMessage:
    'Obrigado...\n\nNão por algo específico. Por tudo.\nPor existir, por estar, por ser do jeito que você é.\n\nSe um dia você esquecer de como é importante, volta aqui. Isso sempre vai estar aqui, te lembrando que você é incrível e que eu sou grata por ter você na minha vida, amorzinho.',
};

// ─────────────────────────────────────────────
// 🫶 SEÇÃO 7 — FINAL
// ─────────────────────────────────────────────
export const FINAL = {
  firstLine: 'Eu poderia escrever muito mais...',
  secondLine: 'Mas acho que você já entendeu.',
  finalLine: 'Obrigado por existir em minha vida, guardião de minha Alma.',
  heartIcon: '💙',
  signature: 'Feito somente pra você e por você, amor da vida.',
};

// ─────────────────────────────────────────────
// 🎨 CORES (SUBTOS DE AZUL)
// ─────────────────────────────────────────────
export const COLORS = {
  // Cor de destaque principal — azul luminoso
  luminous: '#7db5ff',
  luminousSoft: '#a8d0ff',
  // Cor de fundo principal
  background: '#05080f',
  // Cor de fundo secundária
  backgroundAlt: '#030611',
  // Texto principal
  textPrimary: '#c8d9f0',
  // Texto de destaque
  textHighlight: '#e8f2ff',
  // Bordas
  border: 'rgba(125, 181, 255, 0.12)',
  borderHover: 'rgba(125, 181, 255, 0.3)',
};
