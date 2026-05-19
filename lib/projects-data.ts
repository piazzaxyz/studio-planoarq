export interface Project {
  id: string;
  title: string;
  location: string;
  category: "Residencial" | "Comercial" | "Interiores";
  year: string;
  area: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "casa-horizonte",
    title: "Casa Horizonte",
    location: "Florianópolis, SC",
    category: "Residencial",
    year: "2024",
    area: "420 m²",
    description: "Residência contemporânea integrada à natureza da Mata Atlântica.",
    longDescription:
      "Um projeto que celebra a conexão entre o construído e o natural. A Casa Horizonte emerge da topografia do terreno com linhas horizontais que dialogam com o oceano ao fundo. Materiais naturais como madeira e pedra criam uma transição harmoniosa entre interior e exterior.",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce9bf14a83a8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "edificio-central",
    title: "Edifício Central",
    location: "São Paulo, SP",
    category: "Comercial",
    year: "2023",
    area: "3.200 m²",
    description: "Torre corporativa com fachada verde e certificação LEED Gold.",
    longDescription:
      "O Edifício Central redefine o skyline paulistano com sua fachada jardim de 12 andares. O projeto integra tecnologias sustentáveis com estética contemporânea, criando um ícone urbano que respeita o meio ambiente.",
    coverImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "loft-ipanema",
    title: "Loft Ipanema",
    location: "Rio de Janeiro, RJ",
    category: "Interiores",
    year: "2024",
    area: "180 m²",
    description: "Reforma sofisticada com paleta neutra e materiais nobres.",
    longDescription:
      "O Loft Ipanema é uma ode ao minimalismo carioca. A reforma transformou um apartamento datado em um espaço atemporal, onde o mármore branco, o carvalho natural e o travertino criam uma sinfonia de texturas sofisticadas.",
    coverImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "casa-serrana",
    title: "Casa Serrana",
    location: "Campos do Jordão, SP",
    category: "Residencial",
    year: "2023",
    area: "350 m²",
    description: "Casa de montanha com lareira central e grandes vidraças panorâmicas.",
    longDescription:
      "Projetada para se fundir à paisagem da Serra da Mantiqueira, a Casa Serrana utiliza pedra local e madeira escurecida para criar uma residência que parece ter sempre existido naquele lugar.",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "restaurante-ora",
    title: "Restaurante Ora",
    location: "Belo Horizonte, MG",
    category: "Comercial",
    year: "2023",
    area: "280 m²",
    description: "Espaço gastronômico com atmosfera íntima e referências brutalistas.",
    longDescription:
      "O Restaurante Ora é um projeto de hospitalidade que eleva a experiência gastronômica através da arquitetura. O concreto aparente, as luminárias artesanais e as paredes de tijolo reinterpretadas criam um ambiente caloroso e contemporâneo.",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "spa-wellbeing",
    title: "Spa Wellbeing",
    location: "Gramado, RS",
    category: "Interiores",
    year: "2024",
    area: "600 m²",
    description: "Centro de bem-estar com design sensorial e materiais orgânicos.",
    longDescription:
      "O Spa Wellbeing é uma experiência de imersão sensorial. Cada espaço foi cuidadosamente projetado para evocar calma e regeneração, com uso de materiais naturais, iluminação cênica e geometrias suaves.",
    coverImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];
