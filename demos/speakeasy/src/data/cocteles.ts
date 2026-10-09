export interface Coctel {
  id: string;
  nombre: string;
  subtitulo: string;
  precio: string;
  descripcion: string;
  notas: string[];
  graduacion: string;
  cristaleria: string;
  ingredientes: string[];
}

export interface PaginaMenu {
  seccion: string;
  subtituloSeccion: string;
  cocteles: Coctel[];
}

export const CARTA_MENU: PaginaMenu[] = [
  {
    seccion: 'Alquimia & Signatures',
    subtituloSeccion: 'Creaciones exclusivas de nuestra barra',
    cocteles: [
      {
        id: 'humo-caoba',
        nombre: '01 · Humo & Caoba',
        subtitulo: 'Old Fashioned Ahumado en Roble',
        precio: '16 €',
        descripcion: 'Bourbon envejecido en barricas tostadas, infusión de higos negros, bitters de cacao puro y humo denso de madera de roble servido en campana de cristal.',
        notas: ['Amaderado', 'Dulce sutil', 'Ahumado'],
        graduacion: '32%',
        cristaleria: 'Vaso Old Fashioned tallado a mano',
        ingredientes: ['Woodford Reserve Bourbon', 'Sirope de higo macerado', 'Bitter artesanal de cacao', 'Humo de virutas de roble francés']
      },
      {
        id: 'luna-esmeralda',
        nombre: '02 · Luna Esmeralda',
        subtitulo: 'Gin Botánico & Chartreuse Verde',
        precio: '15 €',
        descripcion: 'Ginebra seca destilada con enebro silvestre, elixir de hierbas alpinas Chartreuse, cordial de lima kaffir y una nube sedosa de albahaca fresca.',
        notas: ['Herbáceo', 'Cítrico', 'Fresco'],
        graduacion: '24%',
        cristaleria: 'Copa Coupé helada',
        ingredientes: ['Monkey 47 Gin', 'Chartreuse Vert', 'Cordial de lima kaffir', 'Espuma emulsionada de albahaca']
      },
      {
        id: 'terciopelo-negro',
        nombre: '03 · Terciopelo Negro',
        subtitulo: 'Espresso Clandestino & Vainilla',
        precio: '17 €',
        descripcion: 'Ron añejo 12 años, extracción en frío de café etíope de especialidad, licor de vainilla de Madagascar y polvo de oro comestible de 24 quilates.',
        notas: ['Café tostado', 'Vainilla', 'Sedoso'],
        graduacion: '26%',
        cristaleria: 'Copa Nick & Nora',
        ingredientes: ['Diplomático Reserva Exclusiva', 'Cold Brew Etiopía Yirgacheffe', 'Licor artesanal de vainilla', 'Polvo de oro 24k']
      }
    ]
  },
  {
    seccion: 'Destilados Prohibidos',
    subtituloSeccion: 'Recetas de la era clandestina (1920-1933)',
    cocteles: [
      {
        id: 'penicilina-islay',
        nombre: '04 · Niebla de Islay',
        subtitulo: 'Penicillin de Alta Turba',
        precio: '16 €',
        descripcion: 'Single Malt escocés de Islay con marcado carácter de turba, miel de azahar orgánica, jengibre fresco prensado al momento y perfume de limón confitado.',
        notas: ['Turba intensa', 'Picante', 'Balsámico'],
        graduacion: '29%',
        cristaleria: 'Vaso bajo con roca de hielo tallada',
        ingredientes: ['Laphroaig 10 Single Malt', 'Miel silvestre de azahar', 'Jugo de jengibre fresco', 'Aceites de piel de limón']
      },
      {
        id: 'boulevardier-ambar',
        nombre: '05 · Boulevardier Ámbar',
        subtitulo: 'Rye Whiskey & Vermouth Rojo Reserva',
        precio: '15 €',
        descripcion: 'Whiskey de centeno especiado, Campari envejecido en ánfora de barro y vermouth dulce macerado con ajenjo y corteza de naranja amarga.',
        notas: ['Amargo elegante', 'Especiado', 'Complejo'],
        graduacion: '30%',
        cristaleria: 'Copa Coupé vintage',
        ingredientes: ['Bulleit 95 Rye', 'Campari macerado en ánfora', 'Carpano Antica Formula', 'Twist de naranja sanguina']
      },
      {
        id: 'bocado-maridaje',
        nombre: '06 · Bocado Clandestino',
        subtitulo: 'Tabla de Quesos Madurados & Cecina',
        precio: '18 €',
        descripcion: 'Selección de tres quesos de leche cruda afinados en cueva, cecina de buey curada al humo de roble y pan crujiente de centeno con mantequilla tostada.',
        notas: ['Salino', 'Umami', 'Ahumado'],
        graduacion: '0%',
        cristaleria: 'Plato de pizarra negra con filo de oro',
        ingredientes: ['Comté 24 meses', 'Stilton azul al Oporto', 'Cecina de León Reserva', 'Miel de trufa negra']
      }
    ]
  }
];
