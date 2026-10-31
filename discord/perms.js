/* =========================================================
   CATÁLOGO DE PERMISOS DE DISCORD
   Fuente: docs.discord.com › Permissions (revisado octubre 2026).
   - key: nombre técnico real de la API (no cambia entre idiomas).
   - label: nombre en el Discord en español.
     verified: true  = visto en tus capturas o pantallas de autorización reales.
     verified: false = traducción probable; si en tu Discord se llama distinto,
                       guíate por la descripción y el nombre técnico.
   - scope: dónde aplica en canales (T = texto, anuncios y foros; V = voz).
            Sin scope = solo existe a nivel de servidor (en el rol).
   - twoFA: Discord pide 2FA al owner para usarlo si el server exige 2FA.
   ========================================================= */
'use strict';

window.PERMS = {
  sections: [
    { id: 'general', title: 'Permisos generales' },
    { id: 'members', title: 'Permisos de miembros' },
    { id: 'text', title: 'Permisos de canales de texto' },
    { id: 'voice', title: 'Permisos de canales de voz' },
    { id: 'apps', title: 'Permisos de apps' },
    { id: 'events', title: 'Permisos de eventos' },
    { id: 'advanced', title: 'Permisos avanzados' }
  ],
  list: [
    // --- generales
    { key: 'VIEW_CHANNEL', section: 'general', label: 'Ver canales', chLabel: 'Ver canal', verified: true, scope: 'TV',
      desc: 'Ver el canal: leer mensajes en texto y entrar a canales de voz. Si se niega, el canal se vuelve privado y casi todo lo demás deja de aplicar.' },
    { key: 'MANAGE_CHANNELS', section: 'general', label: 'Gestionar canales', chLabel: 'Gestionar canal', verified: true, scope: 'TV', twoFA: true,
      desc: 'Crear, editar y borrar canales.' },
    { key: 'MANAGE_ROLES', section: 'general', label: 'Gestionar roles', chLabel: 'Gestionar permisos', verified: true, scope: 'TV', twoFA: true,
      desc: 'Crear y editar roles por debajo del suyo. En un canal: cambiar sus permisos.' },
    { key: 'CREATE_GUILD_EXPRESSIONS', section: 'general', label: 'Crear expresiones', verified: true,
      desc: 'Subir emojis, stickers y sonidos, y editar o borrar los propios.' },
    { key: 'MANAGE_GUILD_EXPRESSIONS', section: 'general', label: 'Gestionar expresiones', verified: true, twoFA: true,
      desc: 'Editar o borrar emojis, stickers y sonidos de cualquiera.' },
    { key: 'VIEW_AUDIT_LOG', section: 'general', label: 'Ver registro de auditoría', verified: true,
      desc: 'Ver quién hizo qué cambios en el server.' },
    { key: 'VIEW_GUILD_INSIGHTS', section: 'general', label: 'Ver estadísticas del servidor', verified: false,
      desc: 'Ver las estadísticas del server.' },
    { key: 'MANAGE_WEBHOOKS', section: 'general', label: 'Gestionar webhooks', verified: true, scope: 'TV', twoFA: true,
      desc: 'Crear, editar o borrar webhooks (enlaces que publican en un canal).' },
    { key: 'MANAGE_GUILD', section: 'general', label: 'Gestionar servidor', verified: true, twoFA: true,
      desc: 'Cambiar nombre, región, invitaciones y casi toda la configuración del server.' },

    // --- miembros
    { key: 'CREATE_INSTANT_INVITE', section: 'members', label: 'Crear invitación', verified: true, scope: 'TV',
      desc: 'Crear enlaces de invitación.' },
    { key: 'CHANGE_NICKNAME', section: 'members', label: 'Cambiar apodo', verified: true,
      desc: 'Cambiar su propio apodo en el server.' },
    { key: 'MANAGE_NICKNAMES', section: 'members', label: 'Gestionar apodos', verified: true,
      desc: 'Cambiar el apodo de otros.' },
    { key: 'KICK_MEMBERS', section: 'members', label: 'Expulsar miembros', verified: true, twoFA: true,
      desc: 'Sacar a alguien del server (puede volver con invitación).' },
    { key: 'BAN_MEMBERS', section: 'members', label: 'Banear miembros', verified: true, twoFA: true,
      desc: 'Sacar a alguien del server de forma permanente.' },
    { key: 'MODERATE_MEMBERS', section: 'members', label: 'Moderar miembros', verified: true,
      desc: 'Aislar temporalmente: la persona no puede escribir, reaccionar ni hablar por un tiempo.' },

    // --- texto
    { key: 'SEND_MESSAGES', section: 'text', label: 'Enviar mensajes', forumLabel: 'Crear publicaciones', verified: true, scope: 'TV',
      desc: 'Escribir en el canal. En un foro, crear publicaciones. No incluye responder en hilos. Negarlo también bloquea adjuntar, insertar enlaces y mencionar @everyone.' },
    { key: 'SEND_MESSAGES_IN_THREADS', section: 'text', label: 'Enviar mensajes en hilos', forumLabel: 'Enviar mensajes en publicaciones', verified: true, scope: 'T',
      desc: 'Responder dentro de hilos y de publicaciones de foro.' },
    { key: 'CREATE_PUBLIC_THREADS', section: 'text', label: 'Crear hilos públicos', verified: true, scope: 'T',
      desc: 'Abrir hilos que todos pueden ver.' },
    { key: 'CREATE_PRIVATE_THREADS', section: 'text', label: 'Crear hilos privados', verified: true, scope: 'T',
      desc: 'Abrir hilos solo por invitación.' },
    { key: 'EMBED_LINKS', section: 'text', label: 'Insertar enlaces', verified: true, scope: 'TV',
      desc: 'Que los enlaces muestren su vista previa. Los bots lo necesitan para publicar recuadros (embeds).' },
    { key: 'ATTACH_FILES', section: 'text', label: 'Adjuntar archivos', verified: true, scope: 'TV',
      desc: 'Subir imágenes y archivos. Koya lo necesita: la tarjeta de bienvenida es una imagen.' },
    { key: 'ADD_REACTIONS', section: 'text', label: 'Añadir reacciones', verified: true, scope: 'TV',
      desc: 'Poner reacciones nuevas. Sumarse a una existente no lo requiere.' },
    { key: 'USE_EXTERNAL_EMOJIS', section: 'text', label: 'Usar emojis externos', verified: true, scope: 'TV',
      desc: 'Usar emojis de otros servers (con Nitro).' },
    { key: 'USE_EXTERNAL_STICKERS', section: 'text', label: 'Usar stickers externos', verified: true, scope: 'TV',
      desc: 'Usar stickers de otros servers (con Nitro).' },
    { key: 'MENTION_EVERYONE', section: 'text', label: 'Mencionar a @everyone, @here y a todos los roles', verified: true, scope: 'TV',
      desc: 'Notificar a todo el server o a cualquier rol, aunque no sea mencionable.' },
    { key: 'MANAGE_MESSAGES', section: 'text', label: 'Gestionar mensajes', verified: true, scope: 'TV', twoFA: true,
      desc: 'Borrar mensajes de otros. Desde febrero de 2026 ya no incluye fijar mensajes ni saltarse el modo lento.' },
    { key: 'PIN_MESSAGES', section: 'text', label: 'Fijar mensajes', verified: true, scope: 'T',
      desc: 'Fijar y desfijar mensajes. Separado de Gestionar mensajes desde febrero de 2026.' },
    { key: 'BYPASS_SLOWMODE', section: 'text', label: 'Omitir modo lento', verified: false, scope: 'TV',
      desc: 'No tener modo lento. Desde el 23 de febrero de 2026 es la única forma de saltárselo.' },
    { key: 'MANAGE_THREADS', section: 'text', label: 'Gestionar hilos', verified: true, scope: 'T', twoFA: true,
      desc: 'Borrar y archivar hilos, y ver todos los hilos privados.' },
    { key: 'READ_MESSAGE_HISTORY', section: 'text', label: 'Leer el historial de mensajes', verified: true, scope: 'TV',
      desc: 'Ver mensajes anteriores. Sin esto, solo se ven los nuevos.' },
    { key: 'SEND_TTS_MESSAGES', section: 'text', label: 'Enviar mensajes de texto a voz', verified: false, scope: 'TV',
      desc: 'Usar /tts para que Discord lea el mensaje en voz alta.' },
    { key: 'SEND_VOICE_MESSAGES', section: 'text', label: 'Enviar mensajes de voz', verified: false, scope: 'TV',
      desc: 'Mandar notas de voz.' },
    { key: 'SEND_POLLS', section: 'text', label: 'Crear encuestas', verified: true, scope: 'TV',
      desc: 'Publicar encuestas.' },

    // --- voz
    { key: 'CONNECT', section: 'voice', label: 'Conectar', verified: true, scope: 'V',
      desc: 'Entrar al canal de voz. Si se niega, casi todo lo demás del canal deja de aplicar.' },
    { key: 'SPEAK', section: 'voice', label: 'Hablar', verified: true, scope: 'V',
      desc: 'Hablar en el canal. Los bots de música también lo necesitan para que se escuche.' },
    { key: 'STREAM', section: 'voice', label: 'Vídeo', verified: false, scope: 'V',
      desc: 'Compartir pantalla o cámara (Go Live).' },
    { key: 'USE_SOUNDBOARD', section: 'voice', label: 'Usar el panel de sonidos', verified: false, scope: 'V',
      desc: 'Reproducir sonidos del panel en el canal.' },
    { key: 'USE_EXTERNAL_SOUNDS', section: 'voice', label: 'Usar sonidos externos', verified: false, scope: 'V',
      desc: 'Usar sonidos del panel de otros servers.' },
    { key: 'USE_VAD', section: 'voice', label: 'Usar Actividad de voz', verified: true, scope: 'V',
      desc: 'Hablar sin pulsar para hablar. Si se niega, deben usar pulsar para hablar.' },
    { key: 'PRIORITY_SPEAKER', section: 'voice', label: 'Prioridad de palabra', verified: false, scope: 'V',
      desc: 'Bajar el volumen de los demás mientras habla.' },
    { key: 'MUTE_MEMBERS', section: 'voice', label: 'Silenciar miembros', verified: true, scope: 'V',
      desc: 'Silenciar a otros en voz.' },
    { key: 'DEAFEN_MEMBERS', section: 'voice', label: 'Ensordecer miembros', verified: true, scope: 'V',
      desc: 'Hacer que otros no escuchen en voz.' },
    { key: 'MOVE_MEMBERS', section: 'voice', label: 'Mover miembros', verified: true, scope: 'V',
      desc: 'Mover a alguien que ya está conectado a voz hacia otro canal (aunque ese canal no le deje conectar).' },
    { key: 'SET_VOICE_CHANNEL_STATUS', section: 'voice', label: 'Establece un estado para el canal de voz', verified: true, scope: 'V',
      desc: 'Poner el texto de estado del canal de voz. Desde octubre de 2026 funciona aunque no tenga Conectar, si ya está dentro.' },

    // --- apps
    { key: 'USE_APPLICATION_COMMANDS', section: 'apps', label: 'Utilizar comandos de aplicación', verified: true, scope: 'TV',
      desc: 'Usar comandos / de bots, como /play.' },
    { key: 'USE_EMBEDDED_ACTIVITIES', section: 'apps', label: 'Usar actividades', verified: false, scope: 'TV',
      desc: 'Iniciar juegos y actividades dentro de Discord.' },
    { key: 'USE_EXTERNAL_APPS', section: 'apps', label: 'Usar aplicaciones externas', verified: false, scope: 'TV',
      desc: 'Que las apps instaladas por el usuario (no por el server) respondan en público.' },

    // --- eventos
    { key: 'CREATE_EVENTS', section: 'events', label: 'Crear eventos', verified: true, scope: 'V',
      desc: 'Crear eventos programados y editar los propios.' },
    { key: 'MANAGE_EVENTS', section: 'events', label: 'Administrar eventos', verified: true, scope: 'V',
      desc: 'Editar o borrar eventos de cualquiera.' },

    // --- avanzados
    { key: 'ADMINISTRATOR', section: 'advanced', label: 'Administrador', verified: true, twoFA: true,
      desc: 'Todos los permisos y se salta los permisos de cada canal. Solo el owner debería tenerlo.' }
  ]
};
