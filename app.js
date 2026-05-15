/* =============================================
   PIXELRIFT — app.js
   Funcionalidades:
   - Gestión del carrito (array de productos)
   - Cálculo del total + coste de envío
   - Filtrado por categoría
   - Ordenación por precio (sort)
   - Simulación de sesión de usuario
   ============================================= */

'use strict';

/* ════════════════════════════════
   1. DATOS — Catálogo de productos
   Juegos reales con imágenes de Steam CDN
   Steam capsule format: https://cdn.akamai.steamstatic.com/steam/apps/{APPID}/header.jpg
   ════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    title: 'R.E.P.O.',
    dev: 'semiwork',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/3241660/header.jpg',
    category: 'accion',
    price: 9.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 310000,
    badge: '🔥 Trending',
    tags: ['horror', 'co-op', 'física'],
    desc: 'Juego de terror cooperativo online para hasta 6 jugadores. Localiza objetos valiosos con física realista y extráelos mientras sobrevives a las amenazas que los protegen. Humor oscuro y sustos garantizados.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1–6 online', idioma: 'Inglés', horas: '~10h' }
  },
  {
    id: 2,
    title: 'Lethal Company',
    dev: 'Zeekerss',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
    category: 'accion',
    price: 9.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 620000,
    badge: '⭐ Top Seller',
    tags: ['horror', 'co-op', 'supervivencia'],
    desc: 'Trabaja para la Compañía recolectando chatarra de lunas abandonadas. Sobrevive a los monstruos con tus compañeros en este caótico juego de terror cooperativo que arrasa en Steam.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1–4 online', idioma: 'Inglés', horas: '∞' }
  },
  {
    id: 3,
    title: 'Hollow Knight',
    dev: 'Team Cherry',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg',
    category: 'accion',
    price: 14.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 180000,
    badge: '🏆 Clásico',
    tags: ['metroidvania', 'exploración', 'difícil'],
    desc: 'Adéntrate en un vasto mundo subterráneo lleno de insectos. Un metroidvania de precisión artesanal con combate fluido, narrativa críptica y un mundo que te dejará sin palabras.',
    specs: { plataformas: 'PC, Mac, Linux, Switch', jugadores: '1', idioma: 'Español', horas: '~40h' }
  },
  {
    id: 4,
    title: 'Hollow Knight: Silksong',
    dev: 'Team Cherry',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1030300/header.jpg',
    category: 'accion',
    price: 14.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 12000,
    badge: '✨ Esperado',
    tags: ['metroidvania', 'plataformas', 'combate'],
    desc: 'La secuela de Hollow Knight. Juega como Hornet en un nuevo reino lleno de criaturas y tribus. Un juego largamente esperado que promete superar a su legendario predecesor.',
    specs: { plataformas: 'PC, Mac, Linux, Switch', jugadores: '1', idioma: 'Multilingüe', horas: '~30h' }
  },
  {
    id: 5,
    title: 'Subnautica',
    dev: 'Unknown Worlds Entertainment',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 230000,
    badge: '🏆 Imprescindible',
    tags: ['supervivencia', 'submarino', 'exploración'],
    desc: 'Despierta en un planeta alienígena cubierto de océano. Construye bases submarinas, explora profundidades aterradoras y descubre los secretos de un mundo que no quiere que salgas de él.',
    specs: { plataformas: 'PC, Mac, PS4, Xbox', jugadores: '1', idioma: 'Español', horas: '~35h' }
  },
  {
    id: 6,
    title: 'Subnautica: Below Zero',
    dev: 'Unknown Worlds Entertainment',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/848450/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 75000,
    badge: null,
    tags: ['supervivencia', 'ártico', 'exploración'],
    desc: 'Regresa al planeta 4546B, esta vez a una región de aguas heladas y biomas polares. Nueva historia, nuevas criaturas y la misma tensión bajo las profundidades.',
    specs: { plataformas: 'PC, Mac, PS4/5, Xbox', jugadores: '1', idioma: 'Español', horas: '~25h' }
  },
  {
    id: 7,
    title: 'Peak',
    dev: 'Aggro Crab',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg',
    category: 'aventura',
    price: 7.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 317000,
    badge: '🔥 Trending',
    tags: ['escalada', 'co-op', 'supervivencia'],
    desc: 'Escala montañas con tus amigos en este juego cooperativo de Aggro Crab y Landfall. Gestiona el equipo, las condiciones y tu resistencia para llegar a la cima. Superventas de 2025 con más de 10 millones de copias.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1–4 online', idioma: 'Español', horas: '~3h' }
  },
  {
    id: 8,
    title: 'Phasmophobia',
    dev: 'Kinetic Games',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
    category: 'accion',
    price: 13.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 500000,
    badge: null,
    tags: ['horror', 'co-op', 'caza-fantasmas'],
    desc: 'Investiga localizaciones encantadas como cazador de fantasmas profesional. Usa detectores EMF, cámaras y tableros ouija para identificar el tipo de entidad antes de que sea demasiado tarde.',
    specs: { plataformas: 'PC (Steam / VR)', jugadores: '1–4 online', idioma: 'Español', horas: '∞' }
  },
  {
    id: 9,
    title: 'Undertale',
    dev: 'Toby Fox',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
    category: 'rpg',
    price: 9.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 170000,
    badge: '🏆 Legendario',
    tags: ['rpg', 'narrativo', 'bullet-hell'],
    desc: 'Caes al mundo subterráneo de los monstruos. En este RPG puedes elegir matar o perdonar a cada enemigo, y cada decisión moldea la historia. Una obra maestra de una sola persona.',
    specs: { plataformas: 'PC, Mac, Linux, Switch, PS4', jugadores: '1', idioma: 'Español', horas: '~8h' }
  },
  {
    id: 10,
    title: 'Deltarune',
    dev: 'Toby Fox',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1671210/header.jpg',
    category: 'rpg',
    price: 0.00,
    originalPrice: null,
    rating: 4.9,
    reviews: 55000,
    badge: '🎁 Gratis',
    tags: ['rpg', 'narrativo', 'bullet-hell'],
    desc: 'La continuación espiritual de Undertale. Controla a Kris, Susie y Ralsei en un mundo oscuro lleno de secretos. Los capítulos 1 y 2 son completamente gratuitos.',
    specs: { plataformas: 'PC, Mac, Linux, Switch', jugadores: '1', idioma: 'Español', horas: '~10h' }
  },
  {
    id: 11,
    title: 'ULTRAKILL',
    dev: 'Arsi "Hakita" Patala',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1229490/header.jpg',
    category: 'accion',
    price: 24.99,
    originalPrice: null,
    rating: 4.95,
    reviews: 199000,
    badge: '🩸 Bestial',
    tags: ['fps', 'retro', 'estiloso'],
    desc: 'La humanidad está extinta. Las máquinas corren hacia el infierno en busca de sangre como combustible. Un FPS ultraviolento y frenético donde la sangre de tus enemigos te cura si te acercas lo suficiente.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1', idioma: 'Inglés', horas: '~20h' }
  },
  {
    id: 12,
    title: 'Slime Rancher',
    dev: 'Monomi Park',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/433340/header.jpg',
    category: 'aventura',
    price: 19.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 120000,
    badge: null,
    tags: ['granja', 'exploración', 'relax'],
    desc: 'Explora un planeta alienígena capturando y criando slimes adorables en tu rancho. Un juego encantador y relajante con una isla llena de secretos y mecánicas de gestión muy adictivas.',
    specs: { plataformas: 'PC, Mac, Xbox, PS4', jugadores: '1', idioma: 'Español', horas: '~20h' }
  },
  {
    id: 13,
    title: 'Slime Rancher 2',
    dev: 'Monomi Park',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1657630/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 40000,
    badge: null,
    tags: ['granja', 'exploración', 'relax'],
    desc: 'Beatrix LeBeau vuelve en esta secuela con nuevas islas, slimes inéditos y mecánicas evolucionadas. Más colorido, más grande y más slimes que nunca en este paraíso adictivo.',
    specs: { plataformas: 'PC, Xbox (Game Pass)', jugadores: '1', idioma: 'Español', horas: '~25h' }
  },
  {
    id: 14,
    title: 'Terraria',
    dev: 'Re-Logic',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
    category: 'accion',
    price: 9.99,
    originalPrice: null,
    rating: 4.95,
    reviews: 900000,
    badge: '🏆 Obra Maestra',
    tags: ['sandbox', 'construcción', 'exploración'],
    desc: 'Cava, pelea, explora y construye en un mundo 2D generado proceduralmente. Con más de 400 enemigos, 20 jefes y cientos de horas de contenido, Terraria es uno de los mejores juegos de todos los tiempos.',
    specs: { plataformas: 'PC, Mac, Linux, consolas, móvil', jugadores: '1–8 online', idioma: 'Español', horas: '∞' }
  },
  {
    id: 15,
    title: 'The Forest',
    dev: 'Endnight Games',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
    category: 'aventura',
    price: 14.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 290000,
    badge: null,
    tags: ['supervivencia', 'horror', 'construcción'],
    desc: 'Sobrevive en un bosque terrorífico poblado por caníbales mutantes tras un accidente de avión. Construye refugios, fabrica armas y encuentra a tu hijo en este survival de terror en primera persona.',
    specs: { plataformas: 'PC, PS4', jugadores: '1–8 coop', idioma: 'Español', horas: '~30h' }
  },
  {
    id: 16,
    title: 'Sons of the Forest',
    dev: 'Endnight Games',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1326470/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 210000,
    badge: null,
    tags: ['supervivencia', 'horror', 'construcción'],
    desc: 'La secuela de The Forest. Enviado a investigar la desaparición de un multimillonario en una isla remota, descubrirás algo mucho peor. Mejoras visuales brutales y nuevos terrores.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1–8 coop', idioma: 'Español', horas: '~25h' }
  },
  {
    id: 17,
    title: 'Risk of Rain 2',
    dev: 'Hopoo Games',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/632360/header.jpg',
    category: 'roguelike',
    price: 24.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 220000,
    badge: null,
    tags: ['roguelike', 'shooter', 'co-op'],
    desc: 'Un roguelike de acción en tercera persona donde el desafío escala cuanto más tiempo sobrevives. Desbloquea personajes únicos, objetos y builds en cada run con tus amigos.',
    specs: { plataformas: 'PC, PS4, Xbox, Switch', jugadores: '1–4 online', idioma: 'Inglés', horas: '∞' }
  },
  {
    id: 18,
    title: 'Stray',
    dev: 'BlueTwelve Studio',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1332010/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 110000,
    badge: '🐱 Único',
    tags: ['gato', 'narrativo', 'cyberpunk'],
    desc: 'Juega como un gato callejero perdido en una ciudad cyberpunk habitada por robots. Explora, resuelve puzles y encuentra el camino de vuelta a casa en una de las aventuras más originales de los últimos años.',
    specs: { plataformas: 'PC, PS4/5', jugadores: '1', idioma: 'Español', horas: '~6h' }
  },
  {
    id: 19,
    title: 'Palworld',
    dev: 'Pocketpair',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    category: 'aventura',
    price: 26.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 730000,
    badge: '🔥 Viral',
    tags: ['supervivencia', 'criaturas', 'construcción'],
    desc: 'Capturas criaturas llamadas Pals en un mundo abierto, pero también puedes armarlas o ponerlas a trabajar en tu fábrica. Una mezcla explosiva de géneros que arrasó en Steam en 2024.',
    specs: { plataformas: 'PC, Xbox', jugadores: '1–32 online', idioma: 'Español', horas: '∞' }
  },
  {
    id: 20,
    title: 'Outer Wilds',
    dev: 'Mobius Digital',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/753640/header.jpg',
    category: 'aventura',
    price: 24.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 65000,
    badge: '🌌 Revelación',
    tags: ['exploración', 'misterio', 'espacio'],
    desc: 'Estás atrapado en un bucle temporal de 22 minutos que termina con la explosión del sol. Explora un sistema solar lleno de secretos para descubrir qué ocurrió con una antigua civilización. Imprescindible.',
    specs: { plataformas: 'PC, PS4/5, Xbox, Switch', jugadores: '1', idioma: 'Español', horas: '~20h' }
  },
  {
    id: 21,
    title: 'OMORI',
    dev: 'OMOCAT',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1150690/header.jpg',
    category: 'rpg',
    price: 19.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 72000,
    badge: '💔 Devastador',
    tags: ['rpg', 'psicológico', 'pixel art'],
    desc: 'Un RPG de terror psicológico sobre un chico que vive en un mundo de ensueño con sus amigos. A medida que avanzas, la realidad y la pesadilla se fusionan en una historia que te romperá el corazón.',
    specs: { plataformas: 'PC, Mac, Linux, Switch, PS4', jugadores: '1', idioma: 'Inglés', horas: '~25h' }
  },
  {
    id: 22,
    title: 'Hades',
    dev: 'Supergiant Games',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg',
    category: 'roguelike',
    price: 24.99,
    originalPrice: null,
    rating: 4.95,
    reviews: 240000,
    badge: '🏆 GOTY',
    tags: ['roguelike', 'acción', 'narrativo'],
    desc: 'Escapa del inframundo griego en este roguelike de acción con una narrativa que evoluciona en cada run. El juego que demostró que un roguelike puede tener una historia increíble. Ganador de múltiples premios.',
    specs: { plataformas: 'PC, Mac, Switch, PS4/5, Xbox', jugadores: '1', idioma: 'Español', horas: '~90h' }
  },
  {
    id: 23,
    title: 'Gang Beasts',
    dev: 'Boneloaf',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/285900/header.jpg',
    category: 'accion',
    price: 19.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 78000,
    badge: null,
    tags: ['multijugador', 'local', 'caótico'],
    desc: 'Lucha contra tus amigos con muñecos de gelatina en arenas absurdas. Golpea, agarra y lanza a tus rivales fuera del escenario en el juego de fiesta más caótico que existe.',
    specs: { plataformas: 'PC, PS4, Xbox', jugadores: '1–8 local/online', idioma: 'Inglés', horas: '∞' }
  },
  {
    id: 24,
    title: 'Buckshot Roulette',
    dev: 'Mike Klubnika',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2835570/header.jpg',
    category: 'puzzle',
    price: 2.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 65000,
    badge: '💀 Cult',
    tags: ['cartas', 'horror', 'estrategia'],
    desc: 'Una siniestra variante de la ruleta rusa con escopetas. Usa objetos estratégicamente para sobrevivir rondas contra un dealer demoníaco. Corto, intenso y memorable.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1', idioma: 'Inglés', horas: '~2h' }
  },
  {
    id: 25,
    title: 'Among Us',
    dev: 'Innersloth',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
    category: 'accion',
    price: 4.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 650000,
    badge: null,
    tags: ['social', 'deducción', 'multijugador'],
    desc: 'Completa tareas en una nave espacial… o sabotéala eliminando a los tripulantes sin que te pillen. El fenómeno social que conquistó el mundo. ¿En quién confías?',
    specs: { plataformas: 'PC, móvil, consolas', jugadores: '4–15 online', idioma: 'Español', horas: '∞' }
  },
  {
    id: 26,
    title: 'STRAFTAT',
    dev: 'Ruben Gees',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2386720/header.jpg',
    category: 'accion',
    price: 0.00,
    originalPrice: null,
    rating: 4.8,
    reviews: 20000,
    badge: '🎁 F2P',
    tags: ['fps', 'arcade', '1v1'],
    desc: 'Shooter FPS gratuito de muerte instantánea con más de 350 mapas. Cada mapa tiene sus propias armas. Rondas ultrarrápidas con chat de proximidad. 1v1, 2v2 o FFA sin cuartel.',
    specs: { plataformas: 'PC (Steam)', jugadores: '1–4 online', idioma: 'Multilingüe', horas: '∞' }
  },
  {
    id: 27,
    title: 'Little Nightmares',
    dev: 'Tarsier Studios',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/424840/header.jpg',
    category: 'aventura',
    price: 19.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 145000,
    badge: null,
    tags: ['horror', 'plataformas', 'atmosférico'],
    desc: 'Guía a Six a través de Las Fauces, un lugar retorcido lleno de residentes hambrientos. Un juego de plataformas y puzles aterrador con una estética de pesadilla absolutamente única.',
    specs: { plataformas: 'PC, PS4, Xbox, Switch', jugadores: '1', idioma: 'Español', horas: '~4h' }
  },
  {
    id: 28,
    title: 'Little Nightmares II',
    dev: 'Tarsier Studios',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/860510/header.jpg',
    category: 'aventura',
    price: 29.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 95000,
    badge: null,
    tags: ['horror', 'plataformas', 'atmosférico'],
    desc: 'Mono y Six se aventuran por una ciudad distorsionada dominada por una señal de televisión. Más grande, más aterrador y con puzles más elaborados que su predecesor. Un final que no olvidarás.',
    specs: { plataformas: 'PC, PS4/5, Xbox, Switch', jugadores: '1', idioma: 'Español', horas: '~6h' }
  },
];

/* ════════════════════════════════
   2. ESTADO GLOBAL
   ════════════════════════════════ */
const state = {
  cart: [],          // Array de { id, qty }
  filteredProducts: [...PRODUCTS],
  currentCategory: 'all',
  currentSort: 'default',
  session: null,     // null | { username, purchasedGames: [], totalSpent: number }
};

/* Credenciales de demo */
const DEMO_USERS = {
  indie: { password: '1234', purchasedGames: [3, 16], totalSpent: 21.98 },
  admin: { password: 'admin', purchasedGames: [], totalSpent: 0 },
};

/* Costes de envío */
const SHIPPING = {
  FREE_THRESHOLD: 25,  // Envío gratis a partir de 25€
  COST: 3.99,
};

/* ════════════════════════════════
   3. CARRITO
   ════════════════════════════════ */

/**
 * addToCart — recibe el id de un producto y lo guarda en el array del carrito.
 * Si ya existe, incrementa la cantidad.
 */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  renderCart();
  updateCartBadge();
  showToast(`🎮 "${product.title}" añadido al carrito`, 'success');
  bumpCartBadge();
  updateAddToCartButtons();
}

/**
 * removeFromCart — elimina un item del carrito por id.
 */
function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  renderCart();
  updateCartBadge();
  updateAddToCartButtons();
}

/**
 * updateCartQty — incrementa o decrementa la cantidad de un item.
 * Si llega a 0, elimina el item.
 */
function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    renderCart();
  }
}

/**
 * calculateSubtotal — suma los precios de los productos en el carrito.
 * @returns {number} Subtotal en euros
 */
function calculateSubtotal() {
  return state.cart.reduce((total, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return total + (product ? product.price * item.qty : 0);
  }, 0);
}

/**
 * calculateShipping — determina el coste de envío basado en el subtotal.
 * Envío gratuito si el pedido supera SHIPPING.FREE_THRESHOLD.
 * @param {number} subtotal
 * @returns {{ cost: number, label: string, note: string }}
 */
function calculateShipping(subtotal) {
  if (state.cart.length === 0) {
    return { cost: 0, label: '—', note: '' };
  }
  if (subtotal >= SHIPPING.FREE_THRESHOLD) {
    return {
      cost: 0,
      label: '✓ GRATIS',
      note: '🎉 ¡Envío gratuito aplicado!'
    };
  }
  const remaining = (SHIPPING.FREE_THRESHOLD - subtotal).toFixed(2);
  return {
    cost: SHIPPING.COST,
    label: formatPrice(SHIPPING.COST),
    note: `Añade ${remaining}€ más para envío gratis`
  };
}

/**
 * getTotalItems — total de unidades en el carrito.
 * @returns {number}
 */
function getTotalItems() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ════════════════════════════════
   4. FILTRADO POR CATEGORÍA
   ════════════════════════════════ */

/**
 * filterByCategory — filtra el array de productos por categoría.
 * @param {string} category — 'all' | 'accion' | 'aventura' | etc.
 */
function filterByCategory(category) {
  state.currentCategory = category;

  if (category === 'all') {
    state.filteredProducts = [...PRODUCTS];
  } else {
    state.filteredProducts = PRODUCTS.filter(p => p.category === category);
  }

  // Mantener el orden activo después de filtrar
  sortProducts(state.currentSort);
  renderProducts();
  updateFilterUI();
  updateResultsInfo();
}

/* ════════════════════════════════
   5. ORDENACIÓN (sort)
   ════════════════════════════════ */

/**
 * sortProducts — ordena state.filteredProducts usando Array.sort().
 * @param {string} criteria — 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc'
 */
function sortProducts(criteria) {
  state.currentSort = criteria;

  switch (criteria) {
    case 'price-asc':
      // Orden de menor a mayor precio
      state.filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case 'price-desc':
      // Orden de mayor a menor precio
      state.filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case 'name-asc':
      state.filteredProducts.sort((a, b) =>
        a.title.localeCompare(b.title, 'es', { sensitivity: 'base' })
      );
      break;

    case 'rating-desc':
      state.filteredProducts.sort((a, b) => b.rating - a.rating);
      break;

    case 'default':
    default:
      // Restaurar orden original (ID ascendente)
      state.filteredProducts.sort((a, b) => a.id - b.id);
      break;
  }

  renderProducts();
}

/* ════════════════════════════════
   6. SIMULACIÓN DE SESIÓN
   ════════════════════════════════ */

/**
 * login — simula el inicio de sesión comprobando credenciales demo.
 * @param {string} username
 * @param {string} password
 * @returns {boolean} éxito o fracaso
 */
function login(username, password) {
  const userKey = username.trim().toLowerCase();
  const userData = DEMO_USERS[userKey];

  if (!userData || userData.password !== password) {
    showToast('❌ Usuario o contraseña incorrectos', 'error');
    return false;
  }

  state.session = {
    username: userKey,
    purchasedGames: [...userData.purchasedGames],
    totalSpent: userData.totalSpent,
  };

  updateSessionUI();
  closeSessionDropdown();
  showToast(`✅ ¡Bienvenido/a, ${userKey}!`, 'success');
  return true;
}

/**
 * logout — cierra la sesión activa.
 */
function logout() {
  const username = state.session?.username;
  state.session = null;
  updateSessionUI();
  showToast(`👋 Hasta pronto, ${username}!`);
}

/**
 * isLoggedIn — comprueba si hay sesión activa.
 * @returns {boolean}
 */
function isLoggedIn() {
  return state.session !== null;
}

/* ════════════════════════════════
   7. FUNCIONES DE RENDERIZADO
   ════════════════════════════════ */

function formatPrice(price) {
  if (price === 0) return 'GRATIS';
  return price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function formatReviews(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span class="nr-icon">🔍</span>
        <strong>No hay juegos en esta categoría.</strong>
        <p>Prueba con otro filtro o explora todo el catálogo.</p>
      </div>`;
    return;
  }

  state.filteredProducts.forEach((product, i) => {
    const inCart = state.cart.some(item => item.id === product.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.dataset.productId = product.id;

    card.innerHTML = `
      <div class="card__img">
        <div class="card__img-inner"><img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.parentElement.innerHTML='🎮'" /></div>
        ${product.badge ? `<span class="card__badge">${product.badge}</span>` : ''}
        <span class="card__category-tag">${product.category}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${product.title}</h3>
        <p class="card__dev">por ${product.dev}</p>
        <div class="card__rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-num">${product.rating} (${formatReviews(product.reviews)})</span>
        </div>
      </div>
      <div class="card__footer">
        <div class="card__price">
          <span class="price-current ${product.price === 0 ? 'price-free' : ''}">${formatPrice(product.price)}</span>
          ${product.originalPrice
            ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>`
            : ''}
        </div>
        <button
          class="btn-add-cart ${inCart ? 'in-cart' : ''}"
          data-id="${product.id}"
          aria-label="${inCart ? 'En carrito: ' : 'Añadir al carrito: '}${product.title}"
        >
          ${inCart ? '✓ En carrito' : '+ Carrito'}
        </button>
      </div>`;

    // Click en la tarjeta → abrir modal (excepto si se hace click en el botón)
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.btn-add-cart')) {
        openProductModal(product.id);
      }
    });

    // Click en el botón de añadir
    card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });

    grid.appendChild(card);
  });
}

function renderCart() {
  const cartList  = document.getElementById('cartList');
  const cartEmpty = document.getElementById('cartEmpty');
  const subtotal  = calculateSubtotal();
  const shipping  = calculateShipping(subtotal);
  const total     = subtotal + shipping.cost;

  // Mostrar / ocultar estado vacío
  if (state.cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartList.innerHTML = '';
  } else {
    cartEmpty.style.display = 'none';
    cartList.innerHTML = '';

    state.cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item__emoji"><img src="${product.image}" alt="${product.title}" style="width:100%;height:100%;object-fit:cover;border-radius:4px" onerror="this.outerHTML='🎮'" /></div>
        <div class="cart-item__info">
          <span class="cart-item__name">${product.title}</span>
          <span class="cart-item__qty">${formatPrice(product.price)} × ${item.qty}</span>
        </div>
        <div class="cart-item__actions">
          <span class="cart-item__price">${formatPrice(product.price * item.qty)}</span>
          <div class="cart-item__controls">
            <button class="qty-btn" data-id="${product.id}" data-delta="-1" aria-label="Quitar uno">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" data-id="${product.id}" data-delta="1" aria-label="Añadir uno">+</button>
            <button class="qty-btn remove" data-id="${product.id}" data-remove="true" aria-label="Eliminar">🗑</button>
          </div>
        </div>`;

      // Event listeners de cantidad
      li.querySelectorAll('[data-delta]').forEach(btn => {
        btn.addEventListener('click', () =>
          updateCartQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta))
        );
      });
      li.querySelector('[data-remove]')?.addEventListener('click', () =>
        removeFromCart(parseInt(li.querySelector('[data-remove]').dataset.id))
      );

      cartList.appendChild(li);
    });
  }

  // Actualizar totales
  document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('shippingCost').textContent = shipping.label;
  document.getElementById('cartTotal').textContent = formatPrice(total);
  document.getElementById('shippingNote').textContent = shipping.note;

  // Estilo dinámico para envío gratis
  const shippingEl = document.getElementById('shippingCost');
  shippingEl.style.color = shipping.cost === 0 && state.cart.length > 0
    ? 'var(--color-neon-green)'
    : '';
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const total = getTotalItems();
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function bumpCartBadge() {
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow para reiniciar animación
  badge.classList.add('bump');
}

function updateAddToCartButtons() {
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const inCart = state.cart.some(item => item.id === id);
    btn.textContent = inCart ? '✓ En carrito' : '+ Carrito';
    btn.classList.toggle('in-cart', inCart);
  });
}

function updateFilterUI() {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.classList.toggle('pill--active', pill.dataset.cat === state.currentCategory);
  });
}

function updateResultsInfo() {
  const count = state.filteredProducts.length;
  const catLabel = state.currentCategory === 'all'
    ? 'Todos los géneros'
    : state.currentCategory.charAt(0).toUpperCase() + state.currentCategory.slice(1);

  document.getElementById('resultsCount').textContent =
    `Mostrando ${count} juego${count !== 1 ? 's' : ''}`;
  document.getElementById('activeFilter').textContent = catLabel;
}

function updateSessionUI() {
  const btnSession    = document.getElementById('btnSession');
  const sessionLabel  = document.getElementById('sessionLabel');
  const loginForm     = document.getElementById('sessionLoginForm');
  const userPanel     = document.getElementById('sessionUserPanel');
  const displayName   = document.getElementById('displayUsername');
  const statGames     = document.getElementById('statGames');
  const statSpent     = document.getElementById('statSpent');

  if (isLoggedIn()) {
    sessionLabel.textContent = state.session.username;
    btnSession.classList.add('is-logged');
    loginForm.style.display  = 'none';
    userPanel.style.display  = 'block';
    displayName.textContent  = state.session.username;
    statGames.textContent    = state.session.purchasedGames.length;
    statSpent.textContent    = formatPrice(state.session.totalSpent);
  } else {
    sessionLabel.textContent = 'Iniciar sesión';
    btnSession.classList.remove('is-logged');
    loginForm.style.display  = 'block';
    userPanel.style.display  = 'none';
  }
}

/* ════════════════════════════════
   8. MODAL DE PRODUCTO
   ════════════════════════════════ */
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const inCart = state.cart.some(item => item.id === productId);
  const modal  = document.getElementById('modalContent');

  modal.innerHTML = `
    <div class="modal-game-header">
      <div class="modal-game-emoji"><img src="${product.image}" alt="${product.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.outerHTML='🎮'" /></div>
      <div class="modal-game-info">
        <h2 class="modal-game-title">${product.title}</h2>
        <p class="modal-game-dev">por ${product.dev}</p>
        <div class="card__rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-num">${product.rating} (${formatReviews(product.reviews)} reseñas)</span>
        </div>
        <div class="modal-game-tags">
          ${product.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <p class="modal-game-desc">${product.desc}</p>
    <div class="modal-game-specs">
      ${Object.entries(product.specs).map(([k, v]) => `
        <div class="spec-item">
          <span class="spec-label">${k}</span>
          <span class="spec-value">${v}</span>
        </div>`).join('')}
    </div>
    <div class="modal-game-footer">
      <div class="modal-price-block">
        <span class="modal-price">${formatPrice(product.price)}</span>
        ${product.originalPrice
          ? `<span class="modal-price-original">${formatPrice(product.originalPrice)}</span>`
          : ''}
      </div>
      <button class="btn-primary btn--lg modal-add-btn" data-id="${product.id}">
        <span>${inCart ? '✓ En carrito' : '+ Añadir al carrito'}</span>
        <span class="btn-arrow">→</span>
      </button>
    </div>`;

  modal.querySelector('.modal-add-btn').addEventListener('click', (e) => {
    addToCart(product.id);
    // Actualizar texto del botón del modal
    const btn = e.currentTarget.querySelector('span:first-child');
    btn.textContent = '✓ En carrito';
  });

  document.getElementById('modalOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════
   9. CARRITO SIDEBAR — UI
   ════════════════════════════════ */
function openCart() {
  document.getElementById('cartSidebar').classList.add('is-open');
  document.getElementById('cartOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('is-open');
  document.getElementById('cartOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════
   10. SESIÓN — DROPDOWN
   ════════════════════════════════ */
function toggleSessionDropdown() {
  document.getElementById('sessionDropdown').classList.toggle('is-open');
}

function closeSessionDropdown() {
  document.getElementById('sessionDropdown').classList.remove('is-open');
}

/* ════════════════════════════════
   11. TOAST
   ════════════════════════════════ */
function showToast(message, type = '') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ════════════════════════════════
   12. CHECKOUT (SIMULADO)
   ════════════════════════════════ */
function handleCheckout() {
  if (state.cart.length === 0) {
    showToast('⚠️ El carrito está vacío', 'error');
    return;
  }

  if (!isLoggedIn()) {
    showToast('👤 Inicia sesión para finalizar la compra', 'error');
    closeCart();
    toggleSessionDropdown();
    return;
  }

  // Simulación de compra exitosa
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total    = subtotal + shipping.cost;

  // Actualizar estadísticas de sesión
  state.session.purchasedGames.push(...state.cart.map(i => i.id));
  state.session.totalSpent += total;

  // Vaciar carrito
  state.cart = [];
  renderCart();
  updateCartBadge();
  updateAddToCartButtons();
  closeCart();
  updateSessionUI();

  showToast(`🎉 ¡Compra realizada! Total: ${formatPrice(total)}`, 'success');
}

/* ════════════════════════════════
   13. EVENT LISTENERS
   ════════════════════════════════ */
function bindEvents() {
  // Filtros de categoría
  document.getElementById('filterPills').addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (pill) filterByCategory(pill.dataset.cat);
  });

  // Ordenación
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    sortProducts(e.target.value);
  });

  // Carrito — abrir/cerrar
  document.getElementById('btnCart').addEventListener('click', openCart);
  document.getElementById('btnCloseCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);

  // Checkout
  document.getElementById('btnCheckout').addEventListener('click', handleCheckout);

  // Modal — cerrar
  document.getElementById('btnCloseModal').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Sesión — toggle dropdown
  document.getElementById('btnSession').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSessionDropdown();
  });

  // Cerrar dropdown al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-session')) {
      closeSessionDropdown();
    }
  });

  // Login
  document.getElementById('btnLogin').addEventListener('click', () => {
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    login(username, password);
  });

  // Login con Enter
  document.getElementById('inputPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btnLogin').click();
  });

  // Logout
  document.getElementById('btnLogout').addEventListener('click', logout);

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
      closeSessionDropdown();
    }
  });
}

/* ════════════════════════════════
   14. INIT
   ════════════════════════════════ */
function init() {
  renderProducts();
  renderCart();
  updateCartBadge();
  updateSessionUI();
  updateResultsInfo();
  bindEvents();

  // Ocultar badge si está a 0
  document.getElementById('cartBadge').style.display = 'none';

  console.log('%c🎮 PIXELRIFT Indie Store', 'color: #00f5ff; font-family: monospace; font-size: 18px; font-weight: bold;');
  console.log('%cEstado inicial cargado:', 'color: #6b6b9a; font-size: 12px;');
  console.log('%c  • Productos disponibles:', PRODUCTS.length, 'color: #e0e0f0; font-size: 12px;');
  console.log('%c  • Carrito:', state.cart, 'color: #e0e0f0; font-size: 12px;');
}

document.addEventListener('DOMContentLoaded', init);
