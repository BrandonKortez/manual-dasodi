/* =========================================================
   PÁGINAS DEL SERVER — vista Discord del manual (Fase 3)
   - settings: secciones de «Ajustes del servidor», en el orden de Discord
     (octubre de 2026). Cada una toma su texto del extra «Mapa de Ajustes»
     (campo mapa = título exacto del item) o usa su propio texto (a).
     tasks = ids de content.js que se hacen en esa sección.
   - pages: las entradas de arriba de la barra de canales.
   - {S} = nombre del servidor · **negrita** · `código`.
   ========================================================= */
'use strict';

window.SERVER_PAGES = {
  // Título del extra de content.js de donde salen los textos
  mapaTitle: 'Mapa de Ajustes del servidor',

  settings: [
    { group: null, items: [
      { id: 'perfil', label: 'Perfil de servidor', mapa: 'Perfil de servidor', tasks: ['crear-2'] },
      { id: 'etiqueta', label: 'Etiqueta del servidor', mapa: 'Etiqueta del servidor', tasks: [] },
      { id: 'interaccion', label: 'Interacción', mapa: 'Interacción', tasks: ['bienvenida-1'] },
      { id: 'ventajas', label: 'Ventajas de mejora', mapa: 'Ventajas de mejora', tasks: [], page: 'p-mejoras' }
    ] },
    { group: 'Expresión', items: [
      { id: 'emojis', label: 'Emojis', mapa: 'Emojis, Stickers y Panel de sonidos', tasks: ['expresiones-1', 'expresiones-4', 'expresiones-5'] },
      { id: 'stickers', label: 'Stickers', mapa: 'Emojis, Stickers y Panel de sonidos', tasks: ['expresiones-2'] },
      { id: 'sonidos', label: 'Panel de sonidos', mapa: 'Emojis, Stickers y Panel de sonidos', tasks: ['expresiones-3'] }
    ] },
    { group: 'Personas', items: [
      { id: 'miembros', label: 'Miembros', mapa: 'Miembros', tasks: ['crear-5', 'roles-7'], page: 'p-miembros' },
      { id: 'roles', label: 'Roles', mapa: 'Roles', tasks: ['roles-1', 'roles-2', 'roles-3', 'roles-4', 'roles-5', 'roles-6', 'seguridad-3', 'seguridad-4'], list: 'roles' },
      { id: 'invitaciones', label: 'Invitaciones', mapa: 'Invitaciones', tasks: ['crear-4', 'seguridad-5'] },
      { id: 'acceso', label: 'Acceso', mapa: 'Acceso', tasks: [] }
    ] },
    { group: 'Apps', items: [
      { id: 'integraciones', label: 'Integraciones', mapa: 'Integraciones', tasks: ['bots-1', 'bots-3', 'bots-7', 'bots-6', 'botpropio-5', 'botpropio-6'], list: 'bots' },
      { id: 'directorio', label: 'Directorio de apps', mapa: 'Directorio de apps', tasks: [] }
    ] },
    { group: 'Moderación', items: [
      { id: 'seguridad', label: 'Configuración de seguridad', mapa: 'Configuración de seguridad', tasks: ['seguridad-2'] },
      { id: 'auditoria', label: 'Registro de auditoría', mapa: 'Registro de auditoría', tasks: [] },
      { id: 'baneos', label: 'Baneos', mapa: 'Baneos', tasks: [] },
      { id: 'automod', label: 'AutoMod', mapa: 'AutoMod', tasks: ['seguridad-1'] }
    ] },
    { group: 'Comunidad', items: [
      { id: 'info-general', label: 'Información general',
        a: 'Aparece cuando Comunidad ya está activa (antes se ve como **Activa la comunidad**). Aquí se eligen el **canal de reglas** (el #reglas de la categoría Información), el **canal de actualizaciones de la comunidad** (el #mods-avisos de Staff, donde Discord manda avisos para el equipo), el idioma principal y la descripción de {S}.',
        tasks: ['comunidad-2', 'comunidad-3', 'comunidad-4', 'comunidad-5'] },
      { id: 'incorporacion', label: 'Incorporación',
        a: 'El **Onboarding**: los canales predeterminados que ve toda persona nueva, las preguntas que le dan roles solos (juegos y alertas) y la **Guía del servidor**. Para activarlo, Discord pide suficientes canales predeterminados donde @everyone pueda escribir. Pasos en el nivel **Onboarding**.',
        tasks: ['onboarding-1', 'onboarding-2', 'onboarding-3', 'onboarding-4', 'onboarding-5', 'onboarding-6'] },
      { id: 'presencia-web', label: 'Presencia web', mapa: 'Novedad de noviembre de 2026: presencia web', tasks: [] }
    ] },
    { group: null, items: [
      { id: 'plantilla', label: 'Plantilla del servidor', mapa: 'Plantilla del servidor', tasks: ['seguridad-6'] }
    ] },
    { group: null, danger: true, items: [
      { id: 'eliminar', label: 'Eliminar servidor', mapa: 'Eliminar servidor', tasks: [] }
    ] }
  ],

  pages: {
    'p-eventos': {
      name: 'Eventos', icon: 'calendar',
      topic: 'Directos programados para que la gente se apunte y reciba aviso.',
      body: [
        { t: 'Para qué sirven',
          what: 'Un evento es un aviso con fecha y hora que la gente puede marcar con **Me interesa**: Discord le avisa cuando empieza. Sirve para anunciar directos programados, torneos o noches de juego.' },
        { t: 'Cómo crear uno',
          where: 'Clic en el nombre del server › **Crear evento**.',
          what: 'Elige dónde pasa: un **canal de voz** de {S} o **Otro lugar** (pega ahí el enlace del directo de YouTube o TikTok). Pon título, fecha, hora y, si quieres, una imagen de portada.',
          check: 'El evento aparece en **Eventos**, arriba de la lista de canales.' },
        { t: 'Quién puede',
          what: 'En este manual, **Streamer** tiene **Crear eventos** y **Administradores** tiene además **Administrar eventos** (editar o borrar los de cualquiera). @everyone no crea eventos.',
          warn: 'Los eventos no los publica DasodiLives: la alerta automática en #streams sigue saliendo igual. Un evento es opcional y se crea a mano.' }
      ],
      roles: ['rol-streamers', 'rol-admins']
    },
    'p-explorar': {
      name: 'Explorar canales', icon: 'browse',
      topic: 'Todos los canales del mapa, con su estado.',
      intro: 'En Discord, aquí cada miembro elige qué canales ver (cuando el Onboarding está activo). En el manual sirve como vista rápida de todo el mapa: toca un canal para ir a sus pasos.',
      tasks: ['onboarding-2'],
      list: 'channels'
    },
    'p-miembros': {
      name: 'Miembros', icon: 'members',
      topic: 'Roles y bots del server, con su estado.',
      intro: 'La misma lista de la columna derecha, a pantalla completa (útil en el celular). En Discord, la lista real está en Ajustes del servidor › **Miembros**.',
      tasks: ['crear-5', 'roles-7'],
      list: 'members'
    },
    'p-mejoras': {
      name: 'Mejoras del servidor', icon: 'boost',
      topic: 'Qué desbloquean las mejoras (boosts) que regalan los miembros.',
      body: [
        { t: 'Cómo funcionan',
          what: 'Las mejoras son suscripciones que los miembros regalan a {S}. Al juntar **2**, **7** o **14**, el server sube al nivel 1, 2 o 3 y desbloquea ventajas. Si alguien quita su mejora, el server puede bajar de nivel.' },
        { t: 'Qué desbloquean',
          where: 'Ajustes del servidor › **Ventajas de mejora**.',
          what: 'Más espacios de emojis, stickers y sonidos, mejor calidad de audio en voz, **cartel del server**, **etiqueta del server** (desde 3 mejoras), estilos de rol con degradado y más.',
          warn: 'Discord cambia de vez en cuando qué nivel pide cada ventaja. Antes de diseñar algo (como el cartel), revisa en Ventajas de mejora qué nivel pide hoy.' },
        { t: 'El cartel del server',
          what: 'El cartel es la imagen que se ve arriba de la lista de canales. En esta vista se usa a Mega Man como cartel de ejemplo. Para ponerlo en Discord: Ajustes del servidor › **Perfil de servidor** › **Cartel**, cuando el nivel de mejoras lo permita.',
          check: 'La imagen se ve arriba de los canales, en PC y en el celular.' }
      ]
    },
    'p-resumen': {
      name: 'Resumen de avance', icon: 'chart',
      topic: 'Qué está hecho, qué se descartó y qué falta.'
    }
  }
};
