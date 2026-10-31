/* =========================================================
   MAPA DEL SERVER — vista Discord del manual
   - state: estado inicial ('pending' = pendiente, 'delete' = por borrar).
     El estado real lo cambias tú con los botones de la página.
   - tasks: ids de tareas de content.js (comparten avance con el manual).
   - steps: pasos propios de ese elemento (mismo formato que content.js).
   - {S} = nombre del servidor · {T:Texto} = etiqueta de tipo de canal.
   ========================================================= */
'use strict';

window.SERVER_MAP = {
  categories: [
    /* ---------------------------------------------- sin categoría */
    {
      id: 'sin-categoria', name: null,
      channels: [
        { id: 'reglas-dup', name: 'reglas', type: 'texto', state: 'delete',
          topic: 'Duplicado fuera de categoría.',
          why: 'Hay otro #reglas dentro de **Información**: ese es el bueno (es el que Comunidad usa como canal de reglas). Este sobra y confunde a la gente.',
          steps: [
            { t: 'Revisa que no sea el canal de reglas oficial',
              where: 'Ajustes del servidor › **Comunidad** › **Información general**.',
              what: 'En **Canal de normas o reglas** debe estar el #reglas de la categoría Información. Si aparece este, cámbialo primero al otro.',
              check: 'El canal de reglas configurado es el de Información.' },
            { t: 'Bórralo',
              where: 'Clic derecho en este #reglas (el de arriba, sin categoría) › **Eliminar canal**.',
              what: 'Confirma escribiendo el nombre si Discord lo pide.',
              check: 'Solo queda un #reglas, dentro de Información.' }
          ] },
        { id: 'mods-avisos-dup', name: 'mods-avisos', type: 'texto', state: 'delete',
          topic: 'Duplicado fuera de categoría.',
          why: 'Hay otro #mods-avisos dentro de **Staff**, que es privado. Este, al estar fuera de categoría, podría verlo cualquiera.',
          steps: [
            { t: 'Revisa cuál recibe los avisos de Discord',
              where: 'Ajustes del servidor › **Comunidad** › **Información general**.',
              what: 'En **Canal de actualizaciones de la comunidad** debe estar el #mods-avisos de Staff. Si aparece este, cámbialo primero al otro.',
              check: 'El canal configurado es el de Staff.' },
            { t: 'Bórralo',
              where: 'Clic derecho en este #mods-avisos (sin categoría) › **Eliminar canal**.',
              what: 'Confirma la eliminación.',
              check: 'Solo queda un #mods-avisos, dentro de Staff.' }
          ] }
      ]
    },

    /* ---------------------------------------------- Información */
    {
      id: 'informacion', name: 'Información',
      channels: [
        { id: 'reglas', name: 'reglas', type: 'reglas', state: 'pending',
          topic: 'Las reglas de {S}. Solo lectura.',
          tasks: ['comunidad-1', 'comunidad-4', 'canales-3'],
          steps: [
            { t: 'Crea o ubica el canal',
              where: 'Categoría **Información** › **+**.',
              what: 'Tipo {T:Texto}, nombre `reglas`. Al activar Comunidad, Discord le pone el ícono de reglas.',
              check: 'Se ve con el ícono de libro/reglas en Información.' },
            { t: 'Solo lectura',
              where: 'Editar canal › **Permisos** › **@everyone**.',
              what: '**Enviar mensajes**, **Crear hilos públicos** y **Crear hilos privados** en rojo (✕). **Añadir reacciones** en verde.',
              check: 'Una cuenta normal no puede escribir.' },
            { t: 'Pega las reglas',
              where: 'Escribe en el canal con la cuenta del owner.',
              what: 'Usa la plantilla del extra **Reglas** del manual clásico.',
              check: 'Las reglas están publicadas.' }
          ] },
        { id: 'bienvenida', name: 'bienvenida', type: 'texto', state: 'pending',
          topic: 'Solo Koya publica aquí la tarjeta de bienvenida.',
          tasks: ['canales-3', 'bienvenida-3', 'bienvenida-4', 'bienvenida-6'],
          steps: [
            { t: 'Solo lectura para todos',
              where: 'Editar canal › **Permisos** › **@everyone**.',
              what: 'En rojo (✕): **Enviar mensajes**, **Enviar mensajes en hilos**, **Crear hilos públicos** y **Crear hilos privados**. Si tampoco quieres reacciones, **Añadir reacciones**.',
              check: 'Una cuenta normal no puede escribir ni crear hilos.' },
            { t: 'Solo Koya escribe',
              where: 'Misma pantalla › **+** junto a Roles/Miembros › rol **Koya**.',
              what: 'En verde (✓): **Ver canal**, **Enviar mensajes**, **Adjuntar archivos** e **Insertar enlaces**.',
              check: 'Al entrar alguien nuevo, aparece la tarjeta de Koya.' },
            { t: 'Que nadie más tenga permiso propio',
              where: 'Misma pantalla, lista de roles del canal.',
              what: 'Si **Administradores** o **STREAMERS** aparecen con algo en verde, quítalo. El owner siempre puede escribir; eso no se puede bloquear.',
              check: 'Solo @everyone (en rojo) y Koya (en verde) tienen ajustes en el canal.' },
            { t: 'Decide sobre el mensaje nativo de Discord',
              where: 'Ajustes del servidor › **Interacción** › canal de mensajes del sistema.',
              what: 'El «¡Miren quién llegó…!» lo publica Discord y se salta el bloqueo. Si quieren que **solo Koya** publique aquí, apaga el mensaje de bienvenida aleatorio.',
              check: 'Al entrar alguien, solo sale la tarjeta de Koya (o ambos, si decidieron dejarlo).' }
          ] },
        { id: 'streams', name: 'streams', type: 'anuncios', current: 'texto', state: 'pending',
          topic: 'Aquí llegan las alertas de DasodiLives.',
          tasks: ['canales-3', 'botpropio-6'],
          steps: [
            { t: 'Conviértelo en canal de anuncios',
              where: 'Editar canal › **Vista general**.',
              what: 'Enciende **Canal de anuncios** y guarda. Hoy es {T:Texto}; debe ser {T:Anuncios}. Es la única conversión de tipo que Discord permite.',
              check: 'El ícono cambia de # a megáfono.' },
            { t: 'Solo lectura',
              where: 'Editar canal › **Permisos** › **@everyone**.',
              what: '**Enviar mensajes** y **Crear hilos públicos** en rojo. El webhook de DasodiLives publica aunque esté en solo lectura.',
              check: 'Una cuenta normal no puede escribir.' }
          ] },
        { id: 'anuncios', name: 'anuncios', type: 'anuncios', current: 'texto', state: 'pending',
          topic: 'Avisos del streamer y del equipo.',
          tasks: ['canales-4'],
          steps: [
            { t: 'Conviértelo en canal de anuncios',
              where: 'Editar canal › **Vista general**.',
              what: 'Enciende **Canal de anuncios** y guarda. Hoy es {T:Texto}; debe ser {T:Anuncios}.',
              check: 'El ícono cambia de # a megáfono.' },
            { t: 'Solo escriben Streamer y Administradores',
              where: 'Editar canal › **Permisos**.',
              what: '@everyone: **Enviar mensajes** en rojo. **STREAMERS** y **Administradores**: **Enviar mensajes** en verde.',
              check: 'Una cuenta con rol STREAMERS puede publicar; una cuenta normal no.' }
          ] }
      ]
    },

    /* ---------------------------------------------- Comunidad */
    {
      id: 'comunidad', name: 'Comunidad',
      channels: [
        { id: 'general', name: 'general', type: 'texto', state: 'pending',
          topic: 'La plática general de {S}.',
          tasks: ['canales-2'],
          steps: [
            { t: 'Canal abierto',
              where: 'Categoría **Comunidad** › **+**.',
              what: 'Tipo {T:Texto}, nombre `general`. Sin permisos especiales: hereda los de la categoría.',
              check: 'Cualquier miembro puede escribir.' }
          ] },
        { id: 'clip', name: 'clip', type: 'foro', state: 'pending',
          topic: 'Clips del stream, organizados por juego.',
          tasks: ['canales-8'],
          steps: [
            { t: 'Etiquetas por juego',
              where: 'Editar canal › **Vista general** › sección **Etiquetas** › **Añadir etiqueta**.',
              what: 'Una etiqueta por juego, con emoji: DOOM, BROFORCE, MEGAMAN, LEFT4DEAD2, WARCRAFT3, KOFXV. Para sumar un juego después, agrégala aquí.',
              check: 'Al crear una publicación aparecen las etiquetas.' },
            { t: 'Pide etiqueta al publicar (opcional)',
              where: 'Editar canal › **Vista general**.',
              what: 'Enciende **Requerir etiquetas** para que cada clip quede ordenado por juego.',
              check: 'No deja publicar sin elegir un juego.' }
          ] },
        { id: 'memes', name: 'memes', type: 'texto', state: 'pending',
          topic: 'Memes y risas.',
          tasks: ['canales-2'],
          steps: [
            { t: 'Canal abierto',
              where: 'Categoría **Comunidad** › **+**.',
              what: 'Tipo {T:Texto}, nombre `memes`. Hereda los permisos de la categoría.',
              check: 'Cualquier miembro puede escribir y subir imágenes.' }
          ] },
        { id: 'fotos-michis', name: 'preguntas-fotos-michis', type: 'foro', state: 'pending',
          topic: 'Foro de la comunidad (no viene del manual original).',
          steps: [
            { t: 'Revisa sus ajustes de foro',
              where: 'Editar canal › **Vista general**.',
              what: 'Ponle **directrices de publicación** (qué se sube ahí) y, si quieren orden, etiquetas como «Pregunta» y «Foto».',
              check: 'Al crear una publicación se ven las directrices.' },
            { t: 'Revisa sus permisos',
              where: 'Editar canal › **Permisos**.',
              what: 'Que esté **sincronizado** con la categoría Comunidad, salvo que quieran algo distinto.',
              check: 'Dice «Permisos sincronizados con la categoría: Comunidad».' }
          ] }
      ]
    },

    /* ---------------------------------------------- En Vivo */
    {
      id: 'en-vivo', name: 'En Vivo',
      channels: [
        { id: 'chat-en-vivo', name: 'chat-en-vivo', type: 'texto', state: 'pending',
          topic: 'El chat durante el directo. Modo lento de 10 s.',
          tasks: ['canales-6'],
          steps: [
            { t: 'Modo lento',
              where: 'Editar canal › **Vista general** › **Modo lento**.',
              what: '**10 segundos**.',
              check: 'Con una cuenta normal aparece la cuenta regresiva al escribir.',
              warn: 'Desde el 23 de febrero de 2026, solo se salta el modo lento quien tenga el permiso **Omitir modo lento** (`BYPASS_SLOWMODE`). Gestionar mensajes ya no basta. Se lo damos a STREAMERS y Administradores en sus roles.' },
            { t: 'Aquí se pide entrar a voz',
              where: 'Tema del canal (Vista general › Tema).',
              what: 'Escribe algo como: «¿Quieres entrar al directo? Pídelo aquí y entra a cualquier canal de voz abierto».',
              check: 'El tema se ve arriba del canal.' }
          ] },
        { id: 'sala-espera', name: 'sala de espera', type: 'voz', state: 'delete',
          topic: 'Redundante: se puede mover gente desde cualquier canal de voz abierto.',
          why: 'Discord puede mover a alguien al canal en vivo desde **cualquier** canal de voz donde ya esté conectado, por ejemplo Charla 1. No hace falta un canal especial de espera.',
          steps: [
            { t: 'Bórralo',
              where: 'Clic derecho en **sala de espera** › **Eliminar canal**.',
              what: 'Confirma la eliminación.',
              check: 'Ya no aparece en En Vivo.' }
          ] },
        { id: 'en-vivo-dan', name: 'en vivo con Dan', type: 'voz', state: 'pending',
          topic: 'Voz del directo. Visible para todos, pero solo entra quien el streamer mueva.',
          tasks: ['canales-5'],
          steps: [
            { t: 'Visible pero cerrado',
              where: 'Editar canal › **Permisos** › **@everyone**.',
              what: '**Ver canal** en verde y **Conectar** en rojo.',
              check: 'Una cuenta normal ve el canal pero no puede entrar.' },
            { t: 'El equipo sí entra',
              where: 'Misma pantalla › agrega **STREAMERS** y **Administradores**.',
              what: '**Conectar**, **Hablar** y **Mover miembros** en verde.',
              check: 'El streamer entra y puede mover gente.' },
            { t: 'Cómo meter a alguien',
              where: 'Durante el directo.',
              what: 'La persona lo pide en #chat-en-vivo y entra a un canal de voz abierto (Charla 1). Arrastra su nombre al canal en vivo, o clic derecho › **Mover a**.',
              check: 'La persona aparece dentro del canal en vivo.' }
          ] }
      ]
    },

    /* ---------------------------------------------- Voz */
    {
      id: 'voz', name: 'Voz',
      channels: [
        { id: 'charla-1', name: 'charla 1', type: 'voz', state: 'pending',
          topic: 'Voz abierta. También sirve para esperar a que te muevan al directo.',
          tasks: ['canales-2'],
          steps: [
            { t: 'Canal abierto',
              where: 'Categoría **Voz** › **+**.',
              what: 'Tipo {T:Voz}, nombre `charla 1`. Hereda los permisos de la categoría.',
              check: 'Cualquiera puede entrar y hablar.' }
          ] },
        { id: 'charla-2', name: 'charla 2', type: 'voz', state: 'pending',
          topic: 'Voz abierta.',
          tasks: ['canales-2'],
          steps: [
            { t: 'Canal abierto',
              where: 'Categoría **Voz** › **+**.',
              what: 'Tipo {T:Voz}, nombre `charla 2`. Hereda los permisos de la categoría.',
              check: 'Cualquiera puede entrar y hablar.' }
          ] },
        { id: 'musica-live', name: 'musica/play+cancion', type: 'voz', state: 'pending',
          topic: 'Entras, escribes /play con tu canción y te vas. Sin micrófono.',
          tasks: ['bots-4'],
          steps: [
            { t: 'Todos entran, nadie habla',
              where: 'Editar canal › **Permisos** › **@everyone**.',
              what: '**Conectar** en verde y **Hablar** en rojo. Agrega **STREAMERS** y **Administradores** con **Conectar** y **Hablar** en verde. Agrega también **Jockie Music** y **Jockie Music (1)** con **Conectar** y **Hablar** en verde.',
              check: 'Una cuenta normal entra sin poder activar el micrófono, y la música sí se escucha.',
              warn: 'Si no le das **Hablar** al rol de Jockie en este canal, hereda el rojo de @everyone y la música no suena. También conviene poner en rojo **Usar el panel de sonidos** y **Vídeo** para @everyone.' },
            { t: 'Cualquiera pide canción con /play',
              where: 'Ajustes del servidor › **Integraciones** › **Jockie Music** › permisos de comandos.',
              what: 'Comando `/play`: **@everyone** en verde. Así cualquiera agrega canciones a la cola.',
              check: 'Una cuenta normal, dentro del canal, puede usar /play.' },
            { t: 'Solo el equipo controla la música',
              where: 'Misma pantalla, comando por comando.',
              what: '`/skip`, `/stop`, `/volume` y los demás: **@everyone** en rojo; **STREAMERS** y **Administradores** en verde. Repite en **Jockie Music (1)**.',
              check: 'Una cuenta normal no puede saltar ni parar canciones.' },
            { t: 'Alguien del equipo se queda conectado',
              where: 'Durante el directo.',
              what: 'El streamer (o alguien del equipo) se queda en el canal: si se vacía, Jockie suele salirse y la cola se pierde.',
              check: 'La música sigue aunque quien pidió la canción ya se fue.',
              warn: 'Si pasan música comercial por TikTok, la plataforma puede silenciar o restringir el live.' }
          ] }
      ]
    },

    /* ---------------------------------------------- Staff */
    {
      id: 'staff', name: 'Staff',
      channels: [
        { id: 'mods-avisos', name: 'mods-avisos', type: 'texto', state: 'pending',
          topic: 'Avisos de Discord para el equipo. Privado.',
          tasks: ['comunidad-4', 'canales-7'],
          steps: [
            { t: 'Canal de actualizaciones de la comunidad',
              where: 'Ajustes del servidor › **Comunidad** › **Información general**.',
              what: 'Debe estar seleccionado este #mods-avisos (el de Staff), no el duplicado.',
              check: 'Los avisos de Discord llegan aquí.' },
            { t: 'Privado',
              where: 'Categoría Staff › Editar categoría › **Permisos**.',
              what: '@everyone: **Ver canal** en rojo. **Administradores**: **Ver canal** en verde. Los canales de Staff lo heredan.',
              check: 'Una cuenta normal no ve la categoría Staff.' }
          ] },
        { id: 'logs', name: 'logs', type: 'texto', state: 'pending',
          topic: 'Registros de Carl-bot. Privado.',
          tasks: ['canales-7', 'bots-2'],
          steps: [
            { t: 'Carl-bot puede ver Staff',
              where: 'Categoría **Staff** › Editar categoría › **Permisos** › agrega el rol **carl-bot**.',
              what: '**Ver canal** en verde a nivel de categoría. Los canales de Staff siguen sincronizados y Carl-bot ya puede publicar en #logs (sus otros permisos vienen de su rol).',
              check: 'Al borrar un mensaje de prueba en #general, aparece el registro aquí.' }
          ] },
        { id: 'pruebas-bot', name: 'pruebas-bot', type: 'texto', state: 'pending',
          topic: 'Pruebas de DasodiLives y bots. Privado.',
          tasks: ['canales-7', 'botpropio-5'],
          steps: [
            { t: 'Webhook de pruebas',
              where: 'Editar canal › **Integraciones** › **Webhooks**.',
              what: 'Crea el webhook `DasodiLives` de pruebas (detalle en el nivel Bot propio y webhooks).',
              check: 'Tienes la URL del webhook de pruebas guardada.' }
          ] }
      ]
    }
  ],

  roles: [
    { id: 'rol-everyone', name: '@everyone', color: '#b5bac1', state: 'pending',
      topic: 'Los permisos base de todo el server.',
      tasks: ['seguridad-3'] },
    { id: 'rol-admins', name: 'Administradores', color: '#f1c40f', state: 'pending',
      topic: 'Quienes moderan {S}. Sin el permiso de Discord «Administrador».',
      tasks: ['roles-1', 'seguridad-2', 'expresiones-4'] },
    { id: 'rol-envivo', name: 'EN VIVO', color: '#e74c3c', state: 'pending',
      topic: 'Lo pone y quita DasodiLives mientras se transmite.',
      tasks: ['roles-2'] },
    { id: 'rol-streamers', name: 'STREAMERS', color: '#9b59b6', state: 'pending',
      topic: 'La cuenta del streamer.',
      tasks: ['roles-3', 'roles-7'] },
    { id: 'rol-alertas', name: 'ALERTAS', color: '#c9cdfb', state: 'pending',
      topic: 'Quien lo tiene recibe el aviso de directo.',
      tasks: ['roles-4', 'onboarding-4'] },
    { id: 'rol-juegos', name: 'Roles de juegos', color: '#b5bac1', state: 'pending',
      topic: 'DOOM, BROFORCE, MEGAMAN, LEFT4DEAD2, WARCRAFT3 y KOFXV. Se eligen en el Onboarding.',
      tasks: ['roles-5', 'onboarding-3'] }
  ],

  bots: [
    { id: 'bot-koya', name: 'Koya', color: '#e67e22', state: 'pending',
      topic: 'Tarjeta de bienvenida en #bienvenida.',
      tasks: ['bienvenida-2', 'bienvenida-3', 'bienvenida-4', 'tarjeta-1', 'tarjeta-2', 'tarjeta-3', 'bienvenida-6'] },
    { id: 'bot-carl', name: 'carl-bot', color: '#3498db', state: 'pending',
      topic: 'Registros de moderación en #logs.',
      tasks: ['bots-1', 'carl-asistente', 'bots-2'] },
    { id: 'bot-jockie', name: 'Jockie Music', color: '#1abc9c', state: 'pending',
      topic: 'Música con /play en el canal de música.',
      tasks: ['bots-3', 'bots-4'] },
    { id: 'bot-jockie1', name: 'Jockie Music (1)', color: '#16a085', state: 'pending',
      topic: 'Segunda instancia: música en otro canal al mismo tiempo.',
      tasks: ['bots-3'] },
    { id: 'bot-dasodilives', name: 'DasodiLives', color: '#ff4fa3', state: 'pending',
      topic: 'Pone y quita el rol EN VIVO. Lo controla la PC del streamer.',
      tasks: ['botpropio-1', 'botpropio-2', 'botpropio-3', 'instalar-5'] }
  ]
};

/* =========================================================
   PERMISOS (Fase 2)
   Revisado contra docs.discord.com › Permissions (octubre 2026).
   overwrites = ajustes del canal o categoría (✕ deny / ✓ allow; lo que no aparece queda en ／).
   rolePerms  = permisos del rol a nivel servidor (encendido / apagado).
   ========================================================= */
window.SERVER_PERMS = {
  categories: {
    staff: {
      overwrites: [
        { target: '@everyone', deny: ['VIEW_CHANNEL'] },
        { target: 'Administradores', allow: ['VIEW_CHANNEL'] },
        { target: 'carl-bot', bot: true, allow: ['VIEW_CHANNEL'] }
      ],
      notes: ['Desde el 16 de noviembre de 2026, un bot que no tenga **Ver canal** no ve el canal en absoluto. Por eso carl-bot necesita su permiso aquí para registrar lo que pasa en Staff.']
    }
  },
  channels: {
    'reglas': {
      settings: [['Tipo', 'Texto (canal de reglas de Comunidad)'], ['Tema', 'Las reglas del server']],
      overwrites: [
        { target: '@everyone', allow: ['ADD_REACTIONS'], deny: ['SEND_MESSAGES', 'SEND_MESSAGES_IN_THREADS', 'CREATE_PUBLIC_THREADS', 'CREATE_PRIVATE_THREADS'] }
      ]
    },
    'bienvenida': {
      settings: [['Tipo', 'Texto'], ['Mensajes del sistema', 'Opcional: apagar el mensaje nativo para que solo publique Koya']],
      overwrites: [
        { target: '@everyone', deny: ['SEND_MESSAGES', 'SEND_MESSAGES_IN_THREADS', 'CREATE_PUBLIC_THREADS', 'CREATE_PRIVATE_THREADS'] },
        { target: 'Koya', bot: true, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'EMBED_LINKS'] }
      ],
      notes: ['Negar **Enviar mensajes** a @everyone también bloquea adjuntar, insertar enlaces y mencionar @everyone. Por eso a Koya se le dan explícitamente.',
              'El owner siempre puede escribir; Discord no deja bloquearlo.']
    },
    'streams': {
      settings: [['Tipo', 'Anuncios (hoy es Texto: activar «Canal de anuncios» en Vista general)']],
      overwrites: [
        { target: '@everyone', deny: ['SEND_MESSAGES', 'SEND_MESSAGES_IN_THREADS', 'CREATE_PUBLIC_THREADS'] }
      ],
      notes: ['El webhook de DasodiLives publica aunque @everyone no pueda escribir: los webhooks no dependen de permisos de rol.']
    },
    'anuncios': {
      settings: [['Tipo', 'Anuncios (hoy es Texto: activar «Canal de anuncios» en Vista general)']],
      overwrites: [
        { target: '@everyone', deny: ['SEND_MESSAGES', 'CREATE_PUBLIC_THREADS'] },
        { target: 'STREAMERS', allow: ['SEND_MESSAGES'] },
        { target: 'Administradores', allow: ['SEND_MESSAGES'] }
      ]
    },
    'general': { sync: true, settings: [['Tipo', 'Texto']] },
    'memes': { sync: true, settings: [['Tipo', 'Texto']] },
    'clip': {
      sync: true,
      settings: [['Tipo', 'Foro'], ['Etiquetas', 'Una por juego'], ['Requerir etiquetas', 'Opcional']],
      notes: ['En un foro, **Enviar mensajes** significa crear publicaciones y **Enviar mensajes en hilos** significa responder dentro de ellas. Con la categoría sincronizada, todos pueden hacer ambas cosas.']
    },
    'fotos-michis': { sync: true, settings: [['Tipo', 'Foro']] },
    'chat-en-vivo': {
      sync: true,
      settings: [['Tipo', 'Texto'], ['Modo lento', '10 segundos']],
      notes: ['Quien tenga **Omitir modo lento** en su rol (STREAMERS y Administradores) escribe sin espera. No hace falta ajuste en el canal.']
    },
    'en-vivo-dan': {
      settings: [['Tipo', 'Voz']],
      overwrites: [
        { target: '@everyone', allow: ['VIEW_CHANNEL'], deny: ['CONNECT'] },
        { target: 'STREAMERS', allow: ['CONNECT', 'SPEAK', 'MOVE_MEMBERS'] },
        { target: 'Administradores', allow: ['CONNECT', 'SPEAK', 'MOVE_MEMBERS'] }
      ],
      notes: ['Negar **Conectar** también desactiva lo demás del canal de voz para esa persona.',
              'Para mover a alguien aquí, esa persona ya debe estar conectada a otro canal de voz. Quien la mueve necesita **Mover miembros**; la persona movida no necesita Conectar.']
    },
    'charla-1': { sync: true, settings: [['Tipo', 'Voz']] },
    'charla-2': { sync: true, settings: [['Tipo', 'Voz']] },
    'musica-live': {
      settings: [['Tipo', 'Voz'], ['Uso', 'Entrar, escribir /play y salir']],
      overwrites: [
        { target: '@everyone', allow: ['CONNECT', 'SEND_MESSAGES', 'USE_APPLICATION_COMMANDS'], deny: ['SPEAK', 'STREAM', 'USE_SOUNDBOARD', 'USE_EXTERNAL_SOUNDS', 'USE_EMBEDDED_ACTIVITIES'] },
        { target: 'STREAMERS', allow: ['CONNECT', 'SPEAK'] },
        { target: 'Administradores', allow: ['CONNECT', 'SPEAK'] },
        { target: 'Jockie Music', bot: true, allow: ['CONNECT', 'SPEAK'] },
        { target: 'Jockie Music (1)', bot: true, allow: ['CONNECT', 'SPEAK'] }
      ],
      notes: ['Los ajustes de un rol ganan sobre los de @everyone: por eso Jockie habla aunque @everyone tenga Hablar en rojo.',
              '**Enviar mensajes** aquí es para el chat de texto del propio canal de voz: ahí pueden escribir /play.'],
      commands: [
        { bot: 'Jockie Music y Jockie Music (1)', command: '/play', everyone: 'allow', team: 'allow' },
        { bot: 'Jockie Music y Jockie Music (1)', command: '/skip, /stop, /volume y los demás', everyone: 'deny', team: 'allow' }
      ]
    },
    'mods-avisos': { sync: true, settings: [['Tipo', 'Texto'], ['Uso', 'Canal de actualizaciones de la comunidad']] },
    'logs': { sync: true, settings: [['Tipo', 'Texto'], ['Uso', 'Registros de Carl-bot']] },
    'pruebas-bot': { sync: true, settings: [['Tipo', 'Texto'], ['Uso', 'Webhook de pruebas de DasodiLives']] }
  },
  roles: {
    'rol-everyone': {
      on: ['VIEW_CHANNEL', 'CHANGE_NICKNAME', 'SEND_MESSAGES', 'SEND_MESSAGES_IN_THREADS', 'CREATE_PUBLIC_THREADS', 'EMBED_LINKS', 'ATTACH_FILES',
           'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'READ_MESSAGE_HISTORY', 'SEND_VOICE_MESSAGES', 'SEND_POLLS',
           'CONNECT', 'SPEAK', 'STREAM', 'USE_SOUNDBOARD', 'USE_VAD', 'USE_APPLICATION_COMMANDS', 'USE_EMBEDDED_ACTIVITIES', 'CREATE_INSTANT_INVITE'],
      off: ['MENTION_EVERYONE', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_GUILD', 'MANAGE_GUILD_EXPRESSIONS',
            'CREATE_GUILD_EXPRESSIONS', 'MANAGE_THREADS', 'MANAGE_NICKNAMES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MODERATE_MEMBERS', 'ADMINISTRATOR'],
      notes: ['Son los permisos base de todos. Cada rol suma permisos encima de estos.', '**Crear invitación** es opcional: apágalo si solo el equipo debe invitar.']
    },
    'rol-admins': {
      hoist: true,
      on: ['VIEW_AUDIT_LOG', 'CREATE_GUILD_EXPRESSIONS', 'MANAGE_GUILD_EXPRESSIONS', 'MANAGE_NICKNAMES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MODERATE_MEMBERS',
           'MANAGE_MESSAGES', 'PIN_MESSAGES', 'BYPASS_SLOWMODE', 'MANAGE_THREADS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'CREATE_EVENTS', 'MANAGE_EVENTS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MENTION_EVERYONE'],
      notes: ['Los marcados con **2FA** requieren que quien los use tenga verificación en dos pasos, si el server la exige para moderar.',
              '**Fijar mensajes** y **Omitir modo lento** se encienden aparte desde febrero de 2026.']
    },
    'rol-envivo': { hoist: true, on: [], off: ['ADMINISTRATOR', 'MENTION_EVERYONE'],
      notes: ['Rol solo visual: ningún permiso. Va arriba de STREAMERS y debajo del rol del bot DasodiLives.'] },
    'rol-streamers': {
      on: ['MANAGE_MESSAGES', 'PIN_MESSAGES', 'BYPASS_SLOWMODE', 'PRIORITY_SPEAKER', 'MUTE_MEMBERS', 'MOVE_MEMBERS', 'CREATE_EVENTS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      notes: ['No se muestra separado, para no tapar el grupo EN VIVO.'] },
    'rol-alertas': { on: [], off: ['ADMINISTRATOR', 'MENTION_EVERYONE'], notes: ['Sin permisos. No mencionable: el webhook de alertas puede notificarlo igual.'] },
    'rol-juegos': { on: [], off: ['ADMINISTRATOR'], notes: ['Sin permisos. Para que salgan en el Onboarding, cada rol debe estar como opción de una pregunta.'] }
  },
  bots: {
    'bot-koya': { on: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_APPLICATION_COMMANDS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MODERATE_MEMBERS', 'MENTION_EVERYONE'] },
    'bot-carl': { on: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'USE_APPLICATION_COMMANDS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MODERATE_MEMBERS', 'MENTION_EVERYONE'] },
    'bot-jockie': { on: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'USE_APPLICATION_COMMANDS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MUTE_MEMBERS', 'MOVE_MEMBERS', 'MENTION_EVERYONE'] },
    'bot-jockie1': { on: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'USE_APPLICATION_COMMANDS'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_CHANNELS', 'MUTE_MEMBERS', 'MOVE_MEMBERS', 'MENTION_EVERYONE'] },
    'bot-dasodilives': { on: ['MANAGE_ROLES'],
      off: ['ADMINISTRATOR', 'MANAGE_GUILD', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MENTION_EVERYONE'],
      notes: ['Su rol debe quedar **arriba de EN VIVO**: un bot solo puede dar roles que estén por debajo de su rol más alto.', 'No necesita ver canales: publica por webhook y solo usa la API para el rol.'] }
  }
};
