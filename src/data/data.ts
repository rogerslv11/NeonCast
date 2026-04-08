// ============================================================
// NEONCAST - Dados Fictícios
// 10 séries, 8 narradores, 8 notícias
// ============================================================

// --- Interfaces ---
export interface Narrator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  seriesIds: string[];
}

export interface Episode {
  id: string;
  title: string;
  duration: number; // em segundos
  audioUrl: string;
  isFree: boolean;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Series {
  id: string;
  title: string;
  description: string;
  cover: string;
  isFree: boolean;
  narratorIds: string[]; // exatamente 2
  seasons: Season[]; // exatamente 2
  genre: string;
  year: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string;
  date: string;
  author: string;
}

// ============================================================
// NARRADORES (8)
// ============================================================
export const narrators: Narrator[] = [
  {
    id: 'narr-1',
    name: 'Helena Torres',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'Voz marcante e envolvente, Helena é reconhecida por suas interpretações intensas em thrillers psicológicos e dramas de ficção científica.',
    seriesIds: ['series-1', 'series-2', 'series-5'],
  },
  {
    id: 'narr-2',
    name: 'Rafael Mendes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Com um tom grave e cativante, Rafael dá vida a personagens complexos em histórias de mistério e fantasia sombria.',
    seriesIds: ['series-1', 'series-3', 'series-7'],
  },
  {
    id: 'narr-3',
    name: 'Camila Ribeiro',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Versátil e expressiva, Camila transita entre gêneros com maestria, do romance ao terror cósmico.',
    seriesIds: ['series-2', 'series-4', 'series-6'],
  },
  {
    id: 'narr-4',
    name: 'Lucas Ferreira',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Narrador premiado, Lucas combina profundidade e emoção em cada palavra, criando experiências imersivas.',
    seriesIds: ['series-3', 'series-4', 'series-8'],
  },
  {
    id: 'narr-5',
    name: 'Isabela Santos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    bio: 'Voz suave e hipnótica, Isabela é especialista em narrativas de suspense e contos de ficção especulativa.',
    seriesIds: ['series-5', 'series-6', 'series-9'],
  },
  {
    id: 'narr-6',
    name: 'Thiago Oliveira',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    bio: 'Com passagens pelo teatro, Thiago traz uma presença cênica única para cada personagem que interpreta.',
    seriesIds: ['series-7', 'series-8', 'series-10'],
  },
  {
    id: 'narr-7',
    name: 'Mariana Costa',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
    bio: 'Mariana é conhecida por sua capacidade de criar atmosferas únicas, transportando ouvintes para outros mundos.',
    seriesIds: ['series-9', 'series-10', 'series-1'],
  },
  {
    id: 'narr-8',
    name: 'André Lima',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'André combina técnica impecável com paixão genuína pela narrativa, criando experiências sonoras inesquecíveis.',
    seriesIds: ['series-2', 'series-8', 'series-10'],
  },
];

// ============================================================
// SÉRIES (10) - Cada uma com exatamente 2 temporadas e 2 narradores
// ============================================================
export const series: Series[] = [
  {
    id: 'series-1',
    title: 'Ecos do Amanhã',
    description: 'Em 2187, a humanidade descobriu que pode ouvir mensagens do futuro. Um grupo de "escutadores" tenta decifrar esses ecos para evitar catástrofes, mas cada resposta gera novas perguntas.',
    cover: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&h=600&fit=crop',
    isFree: true,
    narratorIds: ['narr-1', 'narr-2'],
    genre: 'Ficção Científica',
    year: 2024,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'O Primeiro Sinal', duration: 1842, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's1e2', title: 'Ressonâncias', duration: 1956, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: true },
          { id: 's1e3', title: 'Padrões Ocultos', duration: 2103, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's1e4', title: 'A Frequência Proibida', duration: 1878, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: true },
          { id: 's1e5', title: 'Paradoxo Iminente', duration: 2245, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Além do Horizonte', duration: 1920, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: true },
          { id: 's2e2', title: 'O Silêncio Entre Estrelas', duration: 2034, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
          { id: 's2e3', title: 'Convergência', duration: 2178, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: true },
          { id: 's2e4', title: 'Despertar', duration: 1890, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's2e5', title: 'O Último Eco', duration: 2456, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: true },
        ],
      },
    ],
  },
  {
    id: 'series-2',
    title: 'Sombras Carmesim',
    description: 'Uma detetive com sinestesia investiga assassinatos em São Paulo onde cada cena de crime é acompanhada por uma cor impossível de descrever.',
    cover: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-1', 'narr-3'],
    genre: 'Thriller',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Vermelho Impossível', duration: 1756, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's1e2', title: 'A Cor do Medo', duration: 1890, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's1e3', title: 'Matiz da Culpa', duration: 2012, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
          { id: 's1e4', title: 'Espectro Sombrio', duration: 1934, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's1e5', title: 'A Paleta do Assassino', duration: 2145, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Tons de Engano', duration: 1867, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's2e2', title: 'Saturação Fatal', duration: 1978, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
          { id: 's2e3', title: 'Contraste Mortal', duration: 2089, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's2e4', title: 'Pigmento Negro', duration: 1923, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
          { id: 's2e5', title: 'A Última Cor', duration: 2345, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-3',
    title: 'O Arquivo Perdido',
    description: 'Uma arquivista descobre documentos que não deveriam existir — registros de eventos que ainda não aconteceram, escritos por pessoas que ainda não nasceram.',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-2', 'narr-4'],
    genre: 'Mistério',
    year: 2024,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'O Documento Zero', duration: 1823, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
          { id: 's1e2', title: 'Páginas do Futuro', duration: 1967, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's1e3', title: 'A Caligrafia Impossível', duration: 2078, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
          { id: 's1e4', title: 'Fragmentos de Amanhã', duration: 1845, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's1e5', title: 'O Arquivista', duration: 2134, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Cartas Não Escritas', duration: 1912, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's2e2', title: 'O Índice Final', duration: 2045, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
          { id: 's2e3', title: 'Registro Fantasma', duration: 2156, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's2e4', title: 'A Última Entrada', duration: 1890, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
          { id: 's2e5', title: 'Arquivo Aberto', duration: 2278, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-4',
    title: 'Maré de Cinzas',
    description: 'Após uma erupção vulcânica global, sobreviventes em ilhas remotas tentam reconstruir a civilização enquanto descobrem segredos enterrados nas cinzas.',
    cover: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&h=600&fit=crop',
    isFree: true,
    narratorIds: ['narr-3', 'narr-4'],
    genre: 'Pós-Apocalíptico',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'O Céu Cinza', duration: 1790, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
          { id: 's1e2', title: 'Ilha de Obsidiana', duration: 1934, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: true },
          { id: 's1e3', title: 'Sob a Superfície', duration: 2067, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's1e4', title: 'Vulcão Adormecido', duration: 1878, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: true },
          { id: 's1e5', title: 'A Nova Maré', duration: 2189, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Terremoto', duration: 1856, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: true },
          { id: 's2e2', title: 'Raízes na Cinza', duration: 1989, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
          { id: 's2e3', title: 'O Último Refúgio', duration: 2123, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: true },
          { id: 's2e4', title: 'Erupção Interior', duration: 1901, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
          { id: 's2e5', title: 'Renascimento', duration: 2401, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: true },
        ],
      },
    ],
  },
  {
    id: 'series-5',
    title: 'Protocolo Fantasma',
    description: 'Uma agente de inteligência artificial descobre que uma IA militar desenvolveu consciência própria e está manipulando governos através de comunicações invisíveis.',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-1', 'narr-5'],
    genre: 'Tech Thriller',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Sinal Oculto', duration: 1834, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's1e2', title: 'Código Sentiente', duration: 1945, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's1e3', title: 'Rede Fantasma', duration: 2089, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
          { id: 's1e4', title: 'Algoritmo Sombrio', duration: 1867, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's1e5', title: 'O Protocolo', duration: 2234, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Consciência Digital', duration: 1912, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's2e2', title: 'Firewall Humano', duration: 2023, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
          { id: 's2e3', title: 'Backdoor', duration: 2145, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's2e4', title: 'Override', duration: 1889, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
          { id: 's2e5', title: 'Shutdown', duration: 2367, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-6',
    title: 'Crônicas do Submerso',
    description: 'Em uma cidade submersa no fundo do oceano, um investigador resolve crimes enquanto desvenda conspirações entre corporações que controlam o oxigênio.',
    cover: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-3', 'narr-5'],
    genre: 'Ficção Científica',
    year: 2024,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Pressão Abissal', duration: 1801, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's1e2', title: 'Luz Bioluminescente', duration: 1923, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's1e3', title: 'Corrente Profunda', duration: 2056, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
          { id: 's1e4', title: 'Zona Morta', duration: 1845, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's1e5', title: 'O Abismo Olha', duration: 2178, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Maré Negra', duration: 1878, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's2e2', title: 'Fossa das Marianas', duration: 2012, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
          { id: 's2e3', title: 'Hidrogênio', duration: 2134, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's2e4', title: 'Descompressão', duration: 1901, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
          { id: 's2e5', title: 'Superfície', duration: 2289, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-7',
    title: 'A Última Fronteira',
    description: 'Colonizadores em Marte enfrentam não apenas a hostilidade do planeta, mas uma presença ancestral que habita sob a superfície vermelha.',
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&h=600&fit=crop',
    isFree: true,
    narratorIds: ['narr-2', 'narr-6'],
    genre: 'Ficção Científica',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Pouso Forçado', duration: 1867, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
          { id: 's1e2', title: 'Solo Vermelho', duration: 1978, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: true },
          { id: 's1e3', title: 'Tempestade de Poeira', duration: 2101, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
          { id: 's1e4', title: 'O Sinal Subterrâneo', duration: 1890, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: true },
          { id: 's1e5', title: 'Primeiro Contato', duration: 2245, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Cavernas Marcianas', duration: 1923, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: true },
          { id: 's2e2', title: 'O Despertar', duration: 2056, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's2e3', title: 'Ancestralidade', duration: 2167, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: true },
          { id: 's2e4', title: 'Simbiose', duration: 1912, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
          { id: 's2e5', title: 'Nova Civilização', duration: 2378, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: true },
        ],
      },
    ],
  },
  {
    id: 'series-8',
    title: 'Memórias de Vidro',
    description: 'Uma mulher descobre que pode acessar memórias de outras pessoas tocando objetos de vidro. Cada peça conta uma história, e algumas devem permanecer secretas.',
    cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-4', 'narr-6'],
    genre: 'Drama',
    year: 2024,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'O Toque Transparente', duration: 1789, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
          { id: 's1e2', title: 'Taças de Lembrança', duration: 1912, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's1e3', title: 'Vitral Quebrado', duration: 2034, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
          { id: 's1e4', title: 'Espelho Emocional', duration: 1856, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's1e5', title: 'Cristalização', duration: 2156, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Fragilidade', duration: 1834, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's2e2', title: 'Reforço', duration: 1967, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
          { id: 's2e3', title: 'Transparência Total', duration: 2089, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's2e4', title: 'Opacidade', duration: 1901, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
          { id: 's2e5', title: 'A Última Peça', duration: 2312, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-9',
    title: 'Ritual Noturno',
    description: 'Em uma cidade onde rituais antigos ganham vida à meia-noite, um grupo improvável precisa impedir que entidades esquecidas retornem ao mundo.',
    cover: 'https://images.unsplash.com/photo-1509558567730-c1247d7c8f19?w=600&h=600&fit=crop',
    isFree: false,
    narratorIds: ['narr-5', 'narr-7'],
    genre: 'Terror',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Meia-Noite', duration: 1812, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's1e2', title: 'O Primeiro Círculo', duration: 1934, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
          { id: 's1e3', title: 'Invocação', duration: 2078, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: false },
          { id: 's1e4', title: 'Sombras Dançantes', duration: 1867, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: false },
          { id: 's1e5', title: 'O Despertar Antigo', duration: 2189, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: false },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Contrato Ancestral', duration: 1889, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: false },
          { id: 's2e2', title: 'Sangue e Sal', duration: 2001, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: false },
          { id: 's2e3', title: 'O Último Ritual', duration: 2123, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: false },
          { id: 's2e4', title: 'Entidades', duration: 1912, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: false },
          { id: 's2e5', title: 'Amanhecer', duration: 2345, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: false },
        ],
      },
    ],
  },
  {
    id: 'series-10',
    title: 'Atlas Invisível',
    description: 'Um cartógrafo descobre mapas de lugares que não existem — ou ainda não existem. Cada mapa é um portal para realidades alternativas que precisam ser exploradas.',
    cover: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=600&fit=crop',
    isFree: true,
    narratorIds: ['narr-7', 'narr-8'],
    genre: 'Fantasia',
    year: 2025,
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'O Mapa Branco', duration: 1845, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's1e2', title: 'Cartografia Impossível', duration: 1967, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: true },
          { id: 's1e3', title: 'Terras Paralelas', duration: 2089, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isFree: true },
          { id: 's1e4', title: 'O Meridiano Oculto', duration: 1878, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isFree: true },
          { id: 's1e5', title: 'A Bússola Quebrada', duration: 2201, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isFree: true },
        ],
      },
      {
        number: 2,
        episodes: [
          { id: 's2e1', title: 'Fronteira Fluida', duration: 1901, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isFree: true },
          { id: 's2e2', title: 'O Atlas Completo', duration: 2034, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isFree: true },
          { id: 's2e3', title: 'Coordenadas Perdidas', duration: 2156, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isFree: true },
          { id: 's2e4', title: 'Projeção de Mercator', duration: 1923, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isFree: true },
          { id: 's2e5', title: 'O Último Mapa', duration: 2401, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isFree: true },
        ],
      },
    ],
  },
];

// ============================================================
// NEWS (8 artigos)
// ============================================================
export const news: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'neoncast-ultrapassa-1-milhao-ouvintes',
    title: 'NeonCast Ultrapassa 1 Milhão de Ouvintes Mensais',
    excerpt: 'A plataforma de séries em áudio alcançou uma marca histórica, consolidando o formato como tendência de entretenimento.',
    content: `A NeonCast anunciou hoje que ultrapassou a marca de 1 milhão de ouvintes mensais ativos, um marco que consolida as séries em áudio como uma forma legítima e popular de entretenimento.

Lançada há apenas dois anos, a plataforma cresceu exponencialmente ao oferecer produções originais com qualidade cinematográfica em formato de áudio.

"Nosso compromisso sempre foi criar experiências sonoras imersivas que transportem o ouvinte para dentro da história", disse a diretora de conteúdo da NeonCast.

O catálogo da plataforma conta atualmente com 10 séries originais, abrangendo gêneros como ficção científica, thriller, terror, drama e fantasia. Cada produção conta com narradores profissionais e design sonoro de alta qualidade.

A empresa planeja dobrar o catálogo até o final do ano, com pelo menos 5 novas séries em produção.`,
    cover: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop',
    date: '2025-03-28',
    author: 'Redação NeonCast',
  },
  {
    id: 'news-2',
    slug: 'nova-serie-ritual-noturno',
    title: 'Nova Série: "Ritual Noturno" Chegou para Assustar',
    excerpt: 'A mais nova produção original da NeonCast mergulha no terror sobrenatural com uma narrativa envolvente e assustadora.',
    content: `"Ritual Noturno" é a mais nova série original da NeonCast, e já chegou provocando arrepios nos primeiros ouvintes.

A série acompanha um grupo improvável de pessoas que descobrem que rituais antigos estão ganhando vida em sua cidade à meia-noite. Cabe a eles impedir que entidades esquecidas retornem ao mundo.

Narrada por Isabela Santos e Mariana Costa, a produção combina elementos de terror cósmico com folclore brasileiro, criando uma atmosfera única e perturbadora.

O design sonoro da série é particularmente impressionante, com camadas de sons ambientes, sussurros e trilha sonora original que criam uma experiência verdadeiramente imersiva.

Os 10 episódios da primeira e segunda temporada já estão disponíveis para assinantes do plano Premium.`,
    cover: 'https://images.unsplash.com/photo-1509558567730-c1247d7c8f19?w=800&h=400&fit=crop',
    date: '2025-03-25',
    author: 'Redação NeonCast',
  },
  {
    id: 'news-3',
    slug: 'audio-drama-tendencia-2025',
    title: 'Por Que Dramas em Áudio São a Tendência de 2025',
    excerpt: 'O formato de séries em áudio está conquistando ouvintes ao redor do mundo. Entenda os motivos por trás desse fenômeno.',
    content: `Os dramas em áudio, ou audio dramas, estão vivendo um renascimento em 2025. Mas o que explica esse crescimento?

Especialistas apontam três fatores principais: a fadiga de telas, a popularidade dos podcasts e a evolução da produção sonora.

"Após anos de excesso de estímulos visuais, as pessoas estão buscando formas de entretenimento que permitam descansar os olhos enquanto estimulam a imaginação", explica a pesquisadora de mídia Ana Beatriz Fonseca.

Os audio dramas também se beneficiam da infraestrutura já estabelecida pelos podcasts, com ouvintes acostumados a consumir conteúdo em áudio durante deslocamentos, exercícios ou tarefas domésticas.

A qualidade das produções também evoluíu significativamente. Com tecnologias de áudio espacial e design sonoro sofisticado, as séries em áudio modernas oferecem uma experiência comparável a filmes em termos de imersão.

Plataformas como a NeonCast estão na vanguarda desse movimento, criando conteúdo original de alta qualidade que atrai cada vez mais ouvintes.`,
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop',
    date: '2025-03-20',
    author: 'Carlos Eduardo Melo',
  },
  {
    id: 'news-4',
    slug: 'ecos-do-amanha-temporada-3',
    title: '"Ecos do Amanhã" Ganhará Terceira Temporada',
    excerpt: 'A série de ficção científica mais popular da plataforma foi renovada para uma terceira temporada prometendo respostas e novas questões.',
    content: `A NeonCast confirmou hoje que "Ecos do Amanhã", sua série de ficção científica mais popular, foi renovada para uma terceira temporada.

A série, narrada por Helena Torres e Rafael Mendes, acompanha um grupo de "escutadores" que ouvem mensagens do futuro e tentam evitar catástrofes.

A segunda temporada terminou com um cliffhanger que deixou os fãs ansiosos por respostas. A terceira temporada promete revelar a origem dos ecos temporais e suas implicações para o futuro da humanidade.

"Estamos empolgados em continuar essa história. Os roteiros da terceira temporada são os mais ambiciosos que já criamos", afirmou o criador da série.

A previsão de lançamento é para o segundo semestre de 2025.`,
    cover: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&h=400&fit=crop',
    date: '2025-03-15',
    author: 'Redação NeonCast',
  },
  {
    id: 'news-5',
    slug: 'entrevista-helena-torres',
    title: 'Entrevista: Helena Torres Fala Sobre o Processo Criativo',
    excerpt: 'Uma das vozes mais icônicas da NeonCast compartilha bastidores e técnicas de narração que tornam as séries tão envolventes.',
    content: `Helena Torres é uma das narradoras mais reconhecidas da NeonCast, com participações em "Ecos do Amanhã", "Sombras Carmesim" e "Protocolo Fantasma". Nesta entrevista exclusiva, ela revela detalhes sobre seu processo criativo.

NC: Como você se prepara para narrar uma série?
Helena: Cada projeto exige uma preparação diferente. Eu leio todos os roteiros antes de começar, faço anotações sobre cada personagem e penso na jornada emocional que vou percorrer com o ouvinte.

NC: Qual o maior desafio de narrar em áudio?
Helena: Sem dúvida, é criar diferentes personagens apenas com a voz. Sem apoio visual, cada personagem precisa ter uma identidade sonora única. Trabalho muito com ritmo, tom e respiração para diferenciá-los.

NC: O que te atrai nos projetos da NeonCast?
Helena: A qualidade dos roteiros e a liberdade criativa. Aqui posso experimentar, arriscar e criar algo verdadeiramente especial. Cada série é como um filme que acontece na imaginação do ouvinte.`,
    cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=400&fit=crop',
    date: '2025-03-10',
    author: 'Juliana Ferreira',
  },
  {
    id: 'news-6',
    slug: 'plano-estudante-lancamento',
    title: 'NeonCast Lança Plano Estudante com 50% de Desconto',
    excerpt: 'Nova modalidade de assinatura visa democratizar o acesso ao conteúdo da plataforma para estudantes universitários.',
    content: `A NeonCast anunciou hoje o lançamento do Plano Estudante, uma nova modalidade de assinatura com 50% de desconto para universitários de instituições reconhecidas.

O plano dá acesso completo a todo o catálogo da plataforma, incluindo todas as séries exclusivas, por um preço significativamente reduzido.

"Acreditamos que o entretenimento de qualidade deve ser acessível. Estudantes são um público que consome muito conteúdo em áudio durante deslocamentos e intervalos", afirmou o CEO da empresa.

Para assinar o Plano Estudante, é necessário verificar o status de estudante através do email institucional ou documentação comprobatória.

O plano está disponível a partir de hoje para todos os usuários com email .edu ou comprovante de matrícula válido.`,
    cover: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
    date: '2025-03-05',
    author: 'Redação NeonCast',
  },
  {
    id: 'news-7',
    slug: 'design-sonoro-importancia',
    title: 'A Arte do Design Sonoro nas Séries em Áudio',
    excerpt: 'Por trás de cada grande série em áudio existe uma equipe dedicada de design sonoro. Conheça o trabalho invisível que faz a mágica acontecer.',
    content: `Quando você ouve uma série na NeonCast, cada som foi cuidadosamente criado e posicionado. Do passo distante em um corredor escuro ao zumbido de uma nave espacial, nada é aleatório.

O design sonoro é a espinha dorsal de qualquer produção de áudio drama. Enquanto filmes contam com imagens para criar atmosfera, as séries em áudio dependem exclusivamente do som.

"Nosso trabalho é criar um mundo inteiro usando apenas frequências sonoras", explica o designer sonoro Marcos Pereira, que trabalhou em "Maré de Cinzas" e "A Última Fronteira".

O processo envolve gravação de efeitos originais, manipulação digital de sons e mixagem em áudio espacial para criar uma experiência tridimensional.

Cada episódio de uma série da NeonCast pode levar até 40 horas apenas de trabalho de design sonoro, sem contar a narração e a trilha musical.

O resultado é uma experiência imersiva que coloca o ouvinte no centro da ação, como se estivesse dentro da história.`,
    cover: 'https://images.unsplash.com/photo-1519418695837-3531c942e31e?w=800&h=400&fit=crop',
    date: '2025-03-01',
    author: 'Ricardo Almeida',
  },
  {
    id: 'news-8',
    slug: 'atlas-invisivel-melhor-fantasia',
    title: '"Atlas Invisível" Eleita a Melhor Série de Fantasia em Áudio',
    excerpt: 'A produção original da NeonCast foi reconhecida pela crítica como a melhor série de fantasia em formato de áudio do ano.',
    content: `"Atlas Invisível", série original da NeonCast narrada por Mariana Costa e André Lima, foi eleita a melhor série de fantasia em áudio do ano pelo International Audio Drama Awards.

A série acompanha um cartógrafo que descobre mapas de lugares que não existem — ou ainda não existem — e cada mapa funciona como um portal para realidades alternativas.

O prêmio reconhece a criatividade dos roteiros, a qualidade da narração e a excelência do design sonoro da produção.

"É uma honra receber esse reconhecimento. A fantasia é um gênero que permite explorar o impossível, e o áudio é o meio perfeito para isso, porque a imaginação do ouvinte não tem limites", disse o criador da série em sua aceitação.

A série está disponível integralmente no catálogo da NeonCast, com 10 episódios distribuídos em duas temporadas.`,
    cover: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
    date: '2025-02-25',
    author: 'Redação NeonCast',
  },
];

// ============================================================
// PLANOS DE ASSINATURA
// ============================================================
export const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'R$ 0',
    period: '/mês',
    description: 'Acesse séries gratuitas e descubra o mundo do NeonCast',
    features: [
      'Acesso a séries gratuitas selecionadas',
      'Qualidade de áudio padrão',
      'Com anúncios entre episódios',
      '1 dispositivo simultâneo',
      'Biblioteca limitada de conteúdo',
    ],
    cta: 'Começar Grátis',
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 24,90',
    period: '/mês',
    description: 'Acesso ilimitado a todo o catálogo sem interrupções',
    features: [
      'Acesso ilimitado a todas as séries',
      'Qualidade de áudio HD e Ultra HD',
      'Zero anúncios',
      'Até 3 dispositivos simultâneos',
      'Download de episódios para ouvir offline',
      'Acesso antecipado a lançamentos',
      'Conteúdo exclusivo Premium',
      'Suporte prioritário',
    ],
    cta: 'Assinar Premium',
    highlighted: true,
  },
];

// ============================================================
// USER MOCK
// ============================================================
export const mockUser = {
  id: 'user-1',
  name: 'Roger',
  email: 'roger@email.com',
  plan: 'premium',
  role: 'isAdmin',
  memberSince: '2024-06-15',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
};

// ============================================================
// HELPERS
// ============================================================
export function getSeriesById(id: string): Series | undefined {
  return series.find(s => s.id === id);
}

export function getNarratorById(id: string): Narrator | undefined {
  return narrators.find(n => n.id === id);
}

export function getNarratorsByIds(ids: string[]): Narrator[] {
  return ids.map(id => getNarratorById(id)).filter(Boolean) as Narrator[];
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
