export interface Parada {
  id: string;
  indice: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  videoUrl?: string;
  posterUrl?: string;
}

export const PARADAS: Parada[] = [
  {
    id: 'la-fachada',
    indice: '01',
    titulo: 'La Fachada Oculta',
    subtitulo: 'Librería & Relojería Clásica',
    descripcion: 'Un comercio antiguo y apacible bajo la lluvia. Tras una estantería de caoba que gira en silencio, se desvela el acceso secreto a un mundo clandestino.',
    videoUrl: '/demos/speakeasy/videos/tramo-1.mp4',
    posterUrl: '/demos/speakeasy/photos/tramo-1-poster.webp'
  },
  {
    id: 'el-pasadizo',
    indice: '02',
    titulo: 'El Pasadizo de Ámbar',
    subtitulo: 'Descenso a la penumbra',
    descripcion: 'Un túnel subterráneo de ladrillo visto y apliques de latón Art Déco. El eco lejano del jazz y el aroma a madera y cuero anuncian la llegada.',
    posterUrl: '/demos/speakeasy/photos/02-pasadizo.jpg'
  },
  {
    id: 'la-barra',
    indice: '03',
    titulo: 'La Gran Barra de Autor',
    subtitulo: 'Alquimia, hielo esculpido & destilados',
    descripcion: 'Mármol negro veteado en oro y una biblioteca de elixires retroiluminada. Coctelería de autor con botánicos raros y técnica de precisión.',
    posterUrl: '/demos/speakeasy/photos/03-barra.jpg'
  },
  {
    id: 'el-salon',
    indice: '04',
    titulo: 'The Velvet Lounge',
    subtitulo: 'Privacidad, terciopelo y jazz',
    descripcion: 'Sillones Chesterfield en terciopelo verde esmeralda, mesas bajas de roble y luz de velas. Un santuario íntimo para quienes buscan lo clandestino.',
    posterUrl: '/demos/speakeasy/photos/04-salon.jpg'
  }
];
