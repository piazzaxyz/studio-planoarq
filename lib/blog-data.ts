export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "materialidade-e-leveza",
    title: "Materialidade e Leveza: O Diálogo do Concreto com a Natureza",
    excerpt:
      "Como a escolha dos materiais pode transformar um espaço e criar experiências que transcendem o visual, tocando a memória e as emoções.",
    category: "Design",
    readTime: "5 min de leitura",
    date: "12 Mai 2025",
    author: "Ana Luísa Forma",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    content: `## O Concreto como Tela

O concreto aparente, quando trabalhado com cuidado, revela uma textura viva e orgânica. Suas marcas de forma, suas variações sutis de tonalidade, são registros do processo de construção — uma história que o material carrega em si.

## A Entrada da Luz

Nenhum material existe sem luz. O concreto, ao longo do dia, transforma-se radicalmente conforme a incidência solar muda. Uma superfície que ao meio-dia parece fria e monolítica, ao entardecer ganha calor e suavidade.

## Integração com a Paisagem

O melhor projeto é aquele que sabe quando parar. Quando a arquitetura recua para que a natureza avance, criamos espaços que parecem inevitáveis — como se sempre tivessem existido naquele lugar.`,
  },
  {
    slug: "tendencias-2025",
    title: "Tendências na Arquitetura de Alto Padrão para 2025",
    excerpt:
      "Da sustentabilidade radical à biofilia integrada: um panorama sobre as diretrizes que estão moldando os projetos de excelência no Brasil e no mundo.",
    category: "Tendências",
    readTime: "7 min de leitura",
    date: "28 Abr 2025",
    author: "Marcos Vitor Forma",
    coverImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    content: `## Biofilia Integrada

A biofilia deixou de ser tendência para se tornar requisito. Jardins internos, paredes vivas, materiais naturais não processados — a arquitetura de 2025 busca reintegrar o ser humano à natureza.

## Sustentabilidade Radical

Certificações como LEED Platinum e WELL Building Standard são cada vez mais comuns em projetos residenciais de alto padrão. Energia solar, captação de água da chuva e materiais locais deixaram de ser diferenciais.

## Minimalismo Maximalista

Uma aparente contradição: espaços minimalistas em volumetria, mas maximizados em qualidade de materiais e detalhamento. Menos elementos, mas cada um escolhido com precisão cirúrgica.`,
  },
  {
    slug: "a-arte-do-detalhe",
    title: "A Arte do Detalhe: Quando o Invisível Torna-se Indispensável",
    excerpt:
      "Os detalhes construtivos são a assinatura de um projeto de excelência. Exploramos como as junções, encaixes e transições definem a qualidade percebida de um espaço.",
    category: "Processo",
    readTime: "4 min de leitura",
    date: "15 Abr 2025",
    author: "Ana Luísa Forma",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    content: `## A Junta que Desaparece

Uma das maiores conquistas do detalhamento contemporâneo é a junta imperceptível. Quando dois materiais se encontram sem que a transição seja visível, criamos uma continuidade que o olho percebe como naturalidade.

## O Rodapé Invisível

O rodapé flutuante — uma sombra entre parede e piso — é um detalhe que transforma radicalmente a percepção de um espaço. Simples na execução, radical no resultado.

## Detalhes que Envelhecem Bem

Os melhores detalhes são aqueles que melhoram com o tempo. A madeira que ganha pátina, o metal que desenvolve sua oxidação natural, a pedra que absorve a história do espaço.`,
  },
];
