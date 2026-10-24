/* =========================================================
   CONTENIDO DEL MANUAL
   - {S} se reemplaza por el nombre del servidor que guardes en la página.
   - **texto** = negritas · `texto` = código.
   - Cada paso: t (título), where (dónde), what (qué hacer),
     check (cómo comprobar), warn (aviso), copy (texto con botón Copiar).
   ========================================================= */
'use strict';

window.MANUAL = {
  levels: [
    /* ---------------------------------------------------- 01 */
    {
      title: 'Cuentas seguras',
      desc: 'La cuenta del owner es la llave de {S}: si se pierde, se pierde el server. Protégela antes de crear nada.',
      intro: 'Haz esto desde Discord de escritorio en la PC. Varias pantallas de las siguientes fases son más cómodas ahí, y algunas solo existen ahí o en los paneles web de los bots.',
      steps: [
        { t: 'Activa la verificación en dos pasos (2FA)',
          where: 'Ajustes de usuario (engrane junto a tu nombre) › **Mi cuenta** › sección **Contraseña y autenticación**.',
          what: 'Toca **Habilitar aplicación de autenticación** y escanea el código con Google Authenticator, Microsoft Authenticator o Authy.',
          check: 'La sección dice que la autenticación de dos factores está activada.',
          warn: 'Más adelante se pedirá 2FA a todos los que moderen. Si el owner no lo tiene activado, no podrá activar ese requisito.' },
        { t: 'Guarda los códigos de respaldo',
          where: 'Misma sección › **Ver códigos de respaldo**.',
          what: 'Guárdalos fuera del teléfono: en un gestor de contraseñas o impresos.',
          check: 'Puedes encontrar los códigos sin abrir Discord.',
          warn: 'Si pierdes el teléfono y no tienes estos códigos, puedes quedarte sin cuenta y sin server.' },
        { t: 'Activa el Modo desarrollador',
          where: 'Ajustes de usuario › **Avanzado** › **Modo desarrollador**.',
          what: 'Enciéndelo. Sirve para copiar IDs de usuarios, roles y canales con clic derecho.',
          check: 'Clic derecho sobre cualquier persona muestra **Copiar ID de usuario**.' }
      ],
      tips: [
        'Usa una app de autenticación, no SMS: es más segura y no depende de tu línea.',
        'Anota quién es el owner de {S}. Si algún día se necesita soporte de Discord, lo van a preguntar.'
      ]
    },

    /* ---------------------------------------------------- 02 */
    {
      title: 'Crear el servidor',
      desc: 'Quien crea el server queda como owner. Después se invita al resto del equipo y cada quien recibe su rol.',
      steps: [
        { t: 'Crea el servidor',
          where: 'Barra izquierda de Discord › botón **+** (Añadir un servidor).',
          what: 'Elige **Crear el mío** › **Para un club o una comunidad**. Escribe el nombre **{S}** y toca **Crear**.',
          check: 'El icono nuevo aparece en tu barra izquierda.' },
        { t: 'Sube el icono',
          where: 'Ajustes del servidor › **Información general** (Perfil del servidor).',
          what: 'Sube una imagen cuadrada de **512 × 512 px** o más, en PNG o JPG.',
          check: 'El icono se ve nítido en la barra izquierda.' },
        { t: 'Borra los canales de ejemplo',
          where: 'Lista de canales.',
          what: 'Clic derecho en cada canal que Discord creó solo › **Eliminar canal**. Los armamos bien en la fase de Canales.',
          check: 'Solo queda la estructura vacía (o nada).' },
        { t: 'Crea la invitación permanente',
          where: 'Clic derecho en el icono del server › **Invitar gente** › **Editar enlace de invitación**.',
          what: '**Caducar después de: Nunca** y **Número máximo de usos: Sin límite** › **Generar un nuevo enlace**. Copia el enlace.',
          check: 'Debajo del enlace dice que no caduca.',
          warn: 'Este es el enlace que va en la descripción de los streams de YouTube y TikTok. Guárdalo.' },
        { t: 'Invita al equipo',
          where: 'Comparte el enlace con el streamer y con quienes vayan a moderar.',
          what: 'Cuando entren, todavía no les des roles: se crean en la fase de Roles.',
          check: 'Aparecen en la lista de miembros.' }
      ],
      tips: [
        'El nombre del server se puede cambiar cuando quieras en Información general; nada de lo que configures se rompe.',
        'Si algún día el enlace se usa para spam, bórralo en Ajustes del servidor › **Invitaciones** y genera otro.'
      ]
    },

    /* ---------------------------------------------------- 03 */
    {
      title: 'Activar Comunidad',
      desc: 'Comunidad desbloquea el Onboarding (la lista de juegos), los canales de anuncios y los foros.',
      steps: [
        { t: 'Crea dos canales que te va a pedir',
          where: 'Lista de canales › **+** › Canal de texto.',
          what: 'Crea `reglas` y `mods-avisos`. Pueden estar vacíos por ahora.',
          check: 'Ves #reglas y #mods-avisos en la lista.' },
        { t: 'Abre el asistente de Comunidad',
          where: 'Ajustes del servidor › **Habilitar comunidad** › **Empezar**.',
          what: 'Sigue las pantallas en orden.',
          check: 'Se abre el asistente de tres pasos.' },
        { t: 'Paso de seguridad',
          where: 'Primera pantalla del asistente.',
          what: 'Acepta **correo verificado** para los miembros y el **filtro de contenido explícito para todos los miembros**.',
          check: 'Ambas casillas quedan marcadas y te deja continuar.' },
        { t: 'Elige los canales',
          where: 'Segunda pantalla.',
          what: '**#reglas** como canal de reglas y **#mods-avisos** como canal de actualizaciones de la comunidad (ahí llegan avisos de Discord solo para el staff).',
          check: 'Ambos canales aparecen seleccionados.' },
        { t: 'Termina y sube la verificación',
          where: 'Acepta los términos y toca **Finalizar**. Luego: Ajustes del servidor › **Seguridad** (o **Moderación**) › **Nivel de verificación**.',
          what: 'Elige **Medio**: la cuenta debe tener más de 5 minutos en Discord para escribir.',
          check: 'En Ajustes del servidor aparece la sección **Comunidad** con Información general, Incorporación y más.',
          warn: 'El nombre exacto de la sección de seguridad cambia según la versión de Discord; busca «Nivel de verificación».' }
      ],
      tips: [
        'El nivel Medio frena cuentas desechables recién creadas, que son las que se usan en los raids.',
        'Si alguna vez desactivas Comunidad, se apaga el Onboarding: no lo hagas con el server en uso.'
      ]
    },

    /* ---------------------------------------------------- 04 */
    {
      title: 'Roles y jerarquía',
      desc: 'El orden es poder: un rol solo puede manejar a los que están debajo de él, y el color del nombre lo pone el rol coloreado más alto.',
      intro: 'Crea cada rol en Ajustes del servidor › **Roles** › **Crear rol**. Al final los ordenas arrastrándolos. Este es el orden final, de arriba hacia abajo:',
      table: {
        head: ['Orden', 'Rol', 'Color', 'Separado', 'Para qué'],
        rows: [
          ['1', 'Mods', 'Azul', 'Sí', 'Moderadores de confianza'],
          ['2', 'Bot DasodiLives', 'Automático', 'No', 'Lo crea Discord al invitar el bot (fase Bot propio)'],
          ['3', 'EN VIVO', 'Rojo', 'Sí', 'Lo pone y quita el bot mientras el streamer transmite'],
          ['4', 'Streamer', 'Morado', 'No', 'La cuenta del streamer'],
          ['5', 'Roles de otros bots', 'Automático', 'No', 'Koya o ProBot, Carl-bot, Jockie Music'],
          ['6', 'Alertas', 'Sin color', 'No', 'Quien lo tenga recibe el aviso de directo'],
          ['7', 'Un rol por juego', 'Sin color o suave', 'No', 'Etiquetas que la gente elige al entrar']
        ]
      },
      steps: [
        { t: 'Crea el rol Mods',
          where: 'Roles › **Crear rol** › pestaña **Mostrar**, luego pestaña **Permisos**.',
          what: 'Nombre `Mods`, color azul, enciende **Mostrar a los miembros del rol por separado**. En Permisos enciende solo: **Gestionar mensajes**, **Expulsar miembros**, **Banear miembros**, **Aislar temporalmente a miembros**, **Mover miembros**, **Silenciar miembros**, **Ensordecer miembros** y **Ver registro de auditoría**.',
          check: 'Administrador, Gestionar servidor y Gestionar roles quedan apagados.',
          warn: 'Nunca le des Administrador a nadie: con ese permiso pueden borrar el server entero.' },
        { t: 'Crea el rol EN VIVO',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `EN VIVO`, color rojo, enciende **Mostrar por separado**. Deja apagado **Permitir que cualquiera @mencione este rol**. En Permisos toca **Borrar permisos**.',
          check: 'El rol no tiene ningún permiso encendido.' },
        { t: 'Crea el rol Streamer',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `Streamer`, color morado, **sin** mostrar por separado. En Permisos: **Borrar permisos** y luego enciende **Mover miembros**, **Silenciar miembros**, **Gestionar mensajes** y **Prioridad de palabra**.',
          check: 'Solo esos cuatro permisos (más los básicos) quedan encendidos.',
          warn: 'No se muestra separado a propósito: si lo estuviera, taparía el grupo EN VIVO mientras transmite.' },
        { t: 'Crea el rol Alertas',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `Alertas`, sin color, sin separar, **no mencionable** y **Borrar permisos**.',
          check: 'Aparece en la lista sin color.',
          warn: 'No hace falta que sea mencionable: el webhook de las alertas puede notificarlo igual, y así nadie más puede hacer spam con ese ping.' },
        { t: 'Crea un rol por cada juego',
          where: 'Roles › **Crear rol**, una vez por juego.',
          what: 'Nombre del juego (por ejemplo `KOF XV`), sin separar, no mencionable, **Borrar permisos**. Empiecen con los que más juegan; se agregan más cuando quieran.',
          check: 'Cada juego tiene su rol sin permisos.',
          warn: 'Para agregar un juego después: crea el rol aquí y luego súmalo como opción en la fase de Onboarding.' },
        { t: 'Ordena los roles',
          where: 'Ajustes del servidor › **Roles**.',
          what: 'Arrastra los roles al orden de la tabla. El del bot DasodiLives lo subirás cuando lo invites.',
          check: 'La lista coincide con la tabla de arriba.' },
        { t: 'Asigna el rol Streamer',
          where: 'Clic derecho en su nombre › **Roles**.',
          what: 'En la cuenta del streamer, marca **Streamer**. El owner no necesita ningún rol: ya tiene todos los permisos.',
          check: 'Al abrir su perfil se ve el rol Streamer.' }
      ],
      tips: [
        'EN VIVO va arriba de Streamer para que, mientras transmite, el streamer aparezca hasta arriba de la lista con el nombre en rojo. Al terminar, vuelve solo a su lugar.',
        'Si un bot dice que no tiene permiso para un rol, casi siempre es el orden: su rol debe estar arriba del rol que intenta manejar.'
      ]
    },

    /* ---------------------------------------------------- 05 */
    {
      title: 'Canales',
      desc: 'Información, comunidad, en vivo, voz y staff, cada uno con sus permisos.',
      intro: 'Crea las categorías con clic derecho en la lista de canales › **Crear categoría**, y los canales con el **+** junto a cada categoría. Los permisos se cambian en **Editar canal** › **Permisos**.',
      table: {
        head: ['Categoría', 'Canal', 'Tipo', 'Ajuste clave'],
        rows: [
          ['Información', '#reglas', 'Texto', 'Solo lectura'],
          ['Información', '#bienvenida', 'Texto', 'Solo lectura; ahí sale la tarjeta de bienvenida'],
          ['Información', '#streams', 'Anuncios', 'Solo lectura; ahí llegan las alertas de DasodiLives'],
          ['Información', '#anuncios', 'Anuncios', 'Solo escriben Streamer y Mods'],
          ['Comunidad', '#general', 'Texto', 'Abierto'],
          ['Comunidad', '#clips', 'Foro', 'Una etiqueta por juego'],
          ['Comunidad', '#memes', 'Texto', 'Abierto'],
          ['En vivo', '#chat-en-vivo', 'Texto', 'Modo lento de 10 s'],
          ['En vivo', 'Sala de espera', 'Voz', 'Abierto'],
          ['En vivo', 'En vivo con (nombre)', 'Voz', 'Visible, pero nadie entra solo'],
          ['Voz', 'Charla 1, Charla 2', 'Voz', 'Abiertos'],
          ['Voz', 'Música', 'Voz', 'Abierto; ahí suele estar el bot de música'],
          ['Staff', '#mods-avisos, #logs, #pruebas-bot', 'Texto', 'Privados: solo Mods']
        ]
      },
      steps: [
        { t: 'Crea las cinco categorías',
          where: 'Clic derecho en un espacio vacío de la lista › **Crear categoría**.',
          what: 'Información, Comunidad, En vivo, Voz y Staff. Mueve #reglas y #mods-avisos a la suya.',
          check: 'Las cinco categorías se ven en orden.' },
        { t: 'Crea todos los canales de la tabla',
          where: '**+** junto a cada categoría.',
          what: 'Elige el tipo correcto: Texto, Anuncios, Foro o Voz. Así los canales nacen sincronizados con su categoría.',
          check: 'La lista coincide con la tabla.' },
        { t: 'Solo lectura en #reglas, #bienvenida y #streams',
          where: 'Editar canal › **Permisos** › rol **@everyone**.',
          what: '**Enviar mensajes** y **Crear hilos públicos** en rojo (✕). **Añadir reacciones** en verde.',
          check: 'Con una cuenta secundaria no puedes escribir en esos canales.' },
        { t: '#anuncios solo para Streamer y Mods',
          where: 'Editar canal › **Permisos**.',
          what: '@everyone con **Enviar mensajes** en rojo. Agrega los roles **Streamer** y **Mods** con **Enviar mensajes** en verde.',
          check: 'Una cuenta con rol Streamer puede escribir ahí; una cuenta normal no.' },
        { t: 'Canal de voz con acceso controlado',
          where: 'Editar canal «En vivo con (nombre)» › **Permisos**.',
          what: '@everyone: **Ver canal** en verde y **Conectar** en rojo. Agrega **Streamer** y **Mods** con **Conectar**, **Hablar** y **Mover miembros** en verde.',
          check: 'Una cuenta normal ve el canal pero no puede entrar.',
          warn: 'Para meter a alguien: arrastra su nombre desde Sala de espera al canal en vivo, o clic derecho en su nombre › **Mover a**. Para sacarlo: clic derecho › **Desconectar**.' },
        { t: 'Modo lento en #chat-en-vivo',
          where: 'Editar canal › **Información general** › **Modo lento**.',
          what: 'Ponlo en **10 segundos**. Streamer y Mods no se ven afectados.',
          check: 'Al escribir con una cuenta normal aparece la cuenta regresiva.' },
        { t: 'Categoría Staff privada',
          where: 'Clic derecho en la categoría Staff › **Editar categoría** › **Permisos**.',
          what: '@everyone con **Ver canal** en rojo. Agrega **Mods** con **Ver canal** en verde. Los canales de dentro lo heredan.',
          check: 'Una cuenta normal no ve la categoría Staff.' },
        { t: 'Etiquetas por juego en #clips',
          where: 'Editar canal #clips › **Etiquetas**.',
          what: 'Crea una etiqueta por juego (las mismas que sus roles). Para sumar un juego después, agrega su etiqueta aquí.',
          check: 'Al crear una publicación en #clips aparecen las etiquetas.' }
      ],
      tips: [
        '«Sincronizado» significa que el canal copia los permisos de su categoría. Si cambias algo solo en un canal, deja de estar sincronizado: es normal.',
        'Sala de espera + canal en vivo es la forma más limpia de controlar quién habla en el stream sin andar dando y quitando roles.'
      ]
    },

    /* ---------------------------------------------------- 06 */
    {
      title: 'Onboarding',
      desc: 'La pantalla de preguntas al entrar. Las respuestas dan roles solas, y esos roles se ven al abrir el perfil.',
      steps: [
        { t: 'Abre la Incorporación',
          where: 'Ajustes del servidor › **Incorporación** (Onboarding).',
          what: 'Toca **Empezar** o **Configurar**.',
          check: 'Ves las secciones de canales predeterminados y preguntas.' },
        { t: 'Canales predeterminados',
          where: 'Sección **Canales predeterminados**.',
          what: 'Marca #reglas, #bienvenida, #streams, #anuncios, #general, #clips, #memes, #chat-en-vivo y los canales de voz.',
          check: 'Discord no muestra error.',
          warn: 'Discord pide un mínimo de 7 canales y que en varios de ellos @everyone pueda escribir. Si marca error, suma más canales abiertos.' },
        { t: 'Pregunta de juegos',
          where: 'Sección **Preguntas** › **Añadir pregunta**.',
          what: 'Texto: «¿Qué juegos juegas?». Activa **selección múltiple**, no obligatoria. Crea una opción por juego (con emoji) y asígnale su rol.',
          check: 'Cada opción tiene su rol de juego asignado.',
          warn: 'Si son muchos juegos, divide en dos preguntas por género (por ejemplo Pelea y Shooters). Para sumar un juego después, agrégalo como opción aquí.' },
        { t: 'Pregunta de alertas',
          where: '**Añadir pregunta**.',
          what: 'Texto: «¿Te aviso cuando empiece el stream?». **Una sola respuesta**. Opción «Sí, avísame» con el rol **Alertas**; opción «No, gracias» sin rol.',
          check: 'La opción «Sí» tiene el rol Alertas.' },
        { t: 'Muestra las preguntas antes de entrar',
          where: 'Ajustes de la pregunta.',
          what: 'Activa que se muestren **antes de unirse**, para que elijan desde el primer momento.',
          check: 'En la vista previa, las preguntas salen antes de entrar al server.' },
        { t: 'Guía del servidor y activar',
          where: 'Sección **Guía del servidor** (opcional) y botón **Activar** o **Guardar**.',
          what: 'Mensaje de bienvenida del streamer y tres tareas: «Lee las reglas», «Elige tus juegos», «Preséntate en #general». Luego activa.',
          check: 'Una cuenta secundaria nueva ve las preguntas al entrar.' }
      ],
      tips: [
        'Cualquiera puede cambiar sus juegos o quitarse las alertas después en **Canales y roles**, arriba de la lista de canales. No necesitas bot para esto.',
        'Pocas opciones por pregunta se leen mejor en el celular.'
      ]
    },

    /* ---------------------------------------------------- 07 */
    {
      title: 'Bienvenida',
      desc: 'La tarjeta con foto circular, «BIENVENID@» en grande y el nombre. Elige un bot: Koya o ProBot, no los dos.',
      intro: 'Para el estilo clásico de tarjeta (BIENVENID@, nombre y «Al servidor…»), elige **Koya**: su fondo propio es gratis en el diseño Classic. Elige **ProBot** si ya lo conoces o prefieres su editor.',
      table: {
        head: ['Qué comparas', 'Koya', 'ProBot'],
        rows: [
          ['Tarjeta con foto y nombre', 'Gratis (diseño Classic)', 'Gratis'],
          ['Fondo propio', 'Gratis en Classic', 'Básico gratis; fondos, fuentes y diseños pulidos reportados como Premium'],
          ['Editor avanzado', 'Premium', 'Premium'],
          ['Extras útiles', 'Roles al entrar, roles por botones, alertas de redes, tickets, niveles', 'Moderación, comandos propios, niveles (parte pasó a Premium en 2026)'],
          ['Español', 'Sí', 'Sí']
        ]
      },
      steps: [
        { t: 'Activa el mensaje nativo de Discord',
          where: 'Ajustes del servidor › **Información general** › **Canal de mensajes del sistema**.',
          what: 'Elige **#bienvenida** y enciende **Enviar un mensaje de bienvenida aleatorio cuando alguien se une**.',
          check: 'Al entrar alguien aparece una línea tipo «¡Miren quién llegó!» con flecha verde. Esa línea es de Discord, no del bot.' },
        { t: 'Elige e invita UN bot',
          where: 'koya.gg o probot.io (o su página en top.gg).',
          what: 'Toca **Invite** / **Add to Discord**, elige {S} y en la pantalla de permisos **quita Administrador**.',
          check: 'El bot aparece en la lista de miembros.',
          warn: 'Si invitas los dos, cada persona recibirá dos tarjetas.' },
        { t: 'Dale permiso de escribir en #bienvenida',
          where: 'Editar canal #bienvenida › **Permisos** › agrega el rol del bot.',
          what: '**Ver canal**, **Enviar mensajes** y **Adjuntar archivos** en verde.',
          check: 'El rol del bot aparece en la lista de permisos del canal.' },
        { t: 'Si elegiste Koya: configura la tarjeta',
          where: 'Panel de Koya › **Welcome**.',
          what: 'Canal **#bienvenida**, activa la **tarjeta de bienvenida** con diseño **Classic**. Fondo: una imagen oscura del tono de Discord o con la estética del canal. Título `BIENVENID@`; debajo, la variable del nombre de usuario que ofrece el panel; subtítulo `AL SERVIDOR {S}`. Fuente gruesa.',
          check: 'La vista previa del panel muestra la tarjeta con la foto, BIENVENID@ y el nombre.',
          copy: 'AL SERVIDOR {S}' },
        { t: 'Si elegiste ProBot: configura la tarjeta',
          where: 'probot.io › tu server › módulo de **Bienvenida** (Welcome & Goodbye).',
          what: 'Actívalo, canal **#bienvenida**, activa la **imagen de bienvenida**. Fondo de unos 1024 × 450 px; avatar grande y centrado; nombre con fuente grande.',
          check: 'La vista previa muestra avatar y nombre en grande.' },
        { t: 'Prueba la bienvenida',
          where: 'Una cuenta secundaria (o la vista previa del panel).',
          what: 'Entra a {S} con la cuenta secundaria.',
          check: 'Sale la línea nativa y, debajo, la tarjeta del bot.' }
      ],
      tips: [
        'Los paneles de los bots cambian de nombre seguido. Si no ves el botón exacto, busca la sección equivalente.',
        'Parte de la comparativa de ProBot viene de un bot competidor: confirma en su panel qué es gratis.'
      ]
    },

    /* ---------------------------------------------------- 08 */
    {
      title: 'Bots de apoyo',
      desc: 'Registros de moderación con Carl-bot y música por comando con Jockie Music.',
      steps: [
        { t: 'Invita a Carl-bot',
          where: 'carl.gg › **Invite**.',
          what: 'Elige {S} y quita Administrador si lo pide.',
          check: 'Carl-bot aparece en la lista de miembros.' },
        { t: 'Activa los registros',
          where: 'Panel de carl.gg › **Logging**.',
          what: 'Manda a **#logs**: mensajes borrados y editados, entradas y salidas, y baneos.',
          check: 'Borra un mensaje de prueba y aparece el registro en #logs.' },
        { t: 'Invita a Jockie Music',
          where: 'jockiemusic.com › **Invite**.',
          what: 'Elige {S}. Si quieren dos fiestas a la vez, invita también una segunda instancia (Jockie Music 1, 2 o 3).',
          check: 'Jockie aparece en la lista de miembros.' },
        { t: 'Prueba la música',
          where: 'Entra a un canal de voz y escribe en cualquier chat.',
          what: 'Escribe `/play` y el nombre de una canción. El bot entra al canal donde estás.',
          check: 'Suena la canción.',
          warn: 'Jockie **no reproduce YouTube**: busca desde las plataformas que sí admite, como Spotify, Deezer, Apple Music o SoundCloud. Los bots que retransmiten YouTube son los que han ido cerrando.',
          copy: '/play' },
        { t: 'Ubica sus roles',
          where: 'Ajustes del servidor › **Roles**.',
          what: 'Deja los roles de Carl-bot y Jockie en la posición 5 de la tabla de Roles.',
          check: 'Están debajo de Streamer y arriba de Alertas.' }
      ],
      tips: [
        'Escribe `/` y elige Jockie Music para ver todos sus comandos sin memorizarlos.',
        'Los roles por reacción de Carl-bot son opcionales: los juegos ya los cubre el Onboarding.'
      ]
    },

    /* ---------------------------------------------------- 09 */
    {
      title: 'Seguridad',
      desc: 'Un server de streamer recibe spam y raids tarde o temprano. Esto los frena sin bots extra.',
      steps: [
        { t: 'Activa AutoMod',
          where: 'Ajustes del servidor › **AutoMod**.',
          what: 'Activa **Bloquear spam sospechoso**, **Bloquear menciones excesivas** (por ejemplo, más de 5 por mensaje) y el filtro de **Palabras marcadas comúnmente**. Envía las alertas a **#logs**.',
          check: 'Las tres reglas aparecen como activas.' },
        { t: 'Pide 2FA para moderar',
          where: 'Ajustes del servidor › **Seguridad** (o Moderación).',
          what: 'Enciende el requisito de **autenticación de dos factores para acciones de moderación**.',
          check: 'El ajuste queda activado.',
          warn: 'Los Mods y el streamer deben activar 2FA en su cuenta, o no podrán expulsar ni borrar mensajes.' },
        { t: 'Recorta los permisos de @everyone',
          where: 'Ajustes del servidor › **Roles** › **@everyone**.',
          what: 'Apaga **Mencionar @everyone, @here y todos los roles**, cualquier permiso que empiece con **Gestionar** y **Crear expresiones**. Deja Ver canales, Enviar mensajes, Conectar y Hablar.',
          check: 'Una cuenta normal no puede usar @everyone.' },
        { t: 'Nadie con Administrador',
          where: 'Ajustes del servidor › **Roles**, rol por rol.',
          what: 'Revisa que ningún rol tenga **Administrador**. Si un Mod necesita algo, dale ese permiso concreto.',
          check: 'Solo el owner tiene control total.' },
        { t: 'Aprende a pausar invitaciones',
          where: 'Ajustes del servidor › **Invitaciones** › **Pausar invitaciones**.',
          what: 'No lo actives ahora: solo ubícalo. Es tu freno de emergencia en un raid.',
          check: 'Sabes dónde está el botón.' }
      ],
      tips: [
        'Revisa #logs la primera semana para ajustar el filtro de palabras.',
        'Ante un raid: pausa invitaciones, sube la verificación a Alta y luego limpia con calma.'
      ]
    },

    /* ---------------------------------------------------- 10 */
    {
      title: 'Bot propio y webhooks',
      desc: 'Lo que necesita DasodiLives: el token de un bot privado, dos webhooks y el ID de usuario del streamer.',
      steps: [
        { t: 'Crea la aplicación',
          where: 'discord.com/developers/applications › **New Application**.',
          what: 'Nombre `DasodiLives`, acepta los términos. En **General Information** sube el mismo icono del server.',
          check: 'La aplicación aparece en tu lista.' },
        { t: 'Configura el bot',
          where: 'Sección **Bot** de la aplicación.',
          what: 'Apaga **Public Bot** (así solo quien creó la aplicación puede invitarlo). Deja **apagados** los tres Privileged Gateway Intents: no los necesita.',
          check: 'Public Bot está apagado y los intents también.' },
        { t: 'Saca el token',
          where: 'Sección **Bot** › **Reset Token**.',
          what: 'Confirma y copia el token. Discord lo muestra **una sola vez**. Guárdalo en un gestor de contraseñas.',
          check: 'Tienes el token guardado fuera de Discord.',
          warn: 'Con el token, cualquiera controla el bot. Nunca por chat, nunca en GitHub. Si se filtra, vuelve a tocar Reset Token.' },
        { t: 'No lo invites todavía',
          where: '—',
          what: 'El instalador de DasodiLives te da el botón de invitación con el permiso justo (**Gestionar roles**).',
          check: 'El bot aún no está en {S}; es correcto.' },
        { t: 'Crea el webhook de pruebas',
          where: 'Editar canal **#pruebas-bot** › **Integraciones** › **Webhooks** › **Nuevo webhook**.',
          what: 'Nómbralo `DasodiLives`, súbele el icono y toca **Copiar URL del webhook**.',
          check: 'La URL empieza con `https://discord.com/api/webhooks/`.' },
        { t: 'Crea el webhook real',
          where: 'Lo mismo, en **#streams**.',
          what: 'Copia también su URL y guárdala junto al token.',
          check: 'Tienes dos URLs distintas: pruebas y streams.',
          warn: 'Cada URL es una llave de su canal. Si se filtra, bórrala en esa misma pantalla y crea otra.' },
        { t: 'Copia el ID del streamer',
          where: 'Clic derecho en su nombre › **Copiar ID de usuario**.',
          what: 'Es un número de unos 18 dígitos.',
          check: 'Lo tienes pegado junto a lo demás.' }
      ],
      tips: [
        'El bot solo pone y quita un rol. No lee mensajes ni necesita intents, así que el cambio de intents privilegiados de junio de 2026 no le afecta.',
        'DasodiLives usa una cuenta de bot oficial y un webhook, que es lo permitido. Nunca uses el token de una cuenta personal: los self-bots están prohibidos.'
      ]
    },

    /* ---------------------------------------------------- 11 */
    {
      title: 'Instalar DasodiLives',
      desc: 'En la PC desde donde se transmite, con la sesión de Windows del streamer. Primero con el webhook de pruebas.',
      steps: [
        { t: 'Desbloquea el zip',
          where: 'Clic derecho en DasodiLives.zip › **Propiedades**.',
          what: 'Marca **Desbloquear** › Aceptar. Así Windows no frena los scripts.',
          check: 'La casilla Desbloquear desaparece al volver a abrir Propiedades.' },
        { t: 'Extrae la carpeta completa',
          where: 'Clic derecho › **Extraer todo**.',
          what: 'No lo abras desde dentro del zip.',
          check: 'Ves Instalar DasodiLives.cmd y los dos .ps1 en una carpeta normal.' },
        { t: 'Abre el instalador',
          where: 'Doble clic en **Instalar DasodiLives.cmd**.',
          what: 'Revisión del equipo: debe encontrar Discord, OBS Studio y TikTok LIVE Studio.',
          check: 'Las palomitas verdes de Discord y al menos una plataforma.' },
        { t: 'Canal de alertas',
          where: 'Paso «¿En qué canal salen las alertas?».',
          what: 'Pega el webhook de **#pruebas-bot** y toca **Comprobar**.',
          check: 'Dice que el webhook funciona.' },
        { t: 'Bot y roles',
          where: 'Paso «Rol EN VIVO y aviso».',
          what: 'Pega el token y toca **Comprobar**. Si dice que el bot no está en el server, toca **Invitar el bot a tu server**, autoriza y vuelve a Comprobar. Luego elige **Alertas** como rol del aviso, **EN VIVO** como rol en vivo y pega el ID del streamer.',
          check: 'Las tres comprobaciones salen en verde.',
          warn: 'Si avisa que el bot está debajo de EN VIVO, sube el rol del bot en Ajustes del servidor › Roles y vuelve a comprobar.' },
        { t: 'Datos del stream e instalación',
          where: 'Pasos «Datos del stream» y «Confirmar».',
          what: 'Nombre del streamer, enlace de YouTube y usuario de TikTok. Toca **Instalar**. Si OBS está abierto, te pedirá cerrarlo un momento.',
          check: 'Aparece y se borra solo un mensaje de prueba en #pruebas-bot.' },
        { t: 'Prueba con un directo',
          where: 'PC del streamer, con Discord abierto. Date el rol Alertas para recibir el aviso.',
          what: 'Inicia en OBS una transmisión no listada; luego sal en vivo en LIVE Studio; luego detén todo.',
          check: 'YouTube: alerta en unos 10 s. TikTok: unos 20 a 30 s (o la misma alerta cambia a YouTube + TikTok). Fin: la alerta cambia a «Stream finalizado» sin notificar, y se quita el rol.' },
        { t: 'Pasa a producción',
          where: 'Abre otra vez el instalador › **Reparar o actualizar**.',
          what: 'En Canal de alertas, borra la URL y pega la de **#streams**. Termina el asistente.',
          check: 'El mensaje de prueba sale ahora en #streams.' }
      ],
      tips: [
        'Si algo no sale, el registro está en `%LOCALAPPDATA%\\DasodiLives\\logs\\monitor.log`. No incluye secretos: puedes compartirlo para revisarlo.',
        'Si se transmite con Discord cerrado, no sale alerta: así se diseñó.'
      ]
    },

    /* ---------------------------------------------------- 12 */
    {
      title: 'DasodiLives a fondo',
      desc: 'Qué hace exactamente el monitor de transmisiones, dónde vive y cómo quitarlo por completo.',
      intro: 'DasodiLives son dos scripts de PowerShell: el **instalador** (con ventanas) y el **monitor** (oculto). El monitor corre en la PC del streamer, nunca en un servidor.',
      table: {
        head: ['Pieza', 'Dónde vive', 'Qué hace'],
        rows: [
          ['Tarea programada', 'Programador de tareas › DasodiLives', 'Arranca el monitor oculto al iniciar sesión en Windows'],
          ['Alternativa de arranque', 'Carpeta Inicio › DasodiLives.lnk', 'Solo si Windows no dejó crear la tarea'],
          ['Monitor', '%LOCALAPPDATA%\\DasodiLives\\DasodiLives_Monitor.ps1', 'Vigila OBS y LIVE Studio cada 5 s'],
          ['Configuración', '…\\DasodiLives\\config.json', 'Nombre, enlaces, roles y tiempos (sin secretos)'],
          ['Llaves', '…\\DasodiLives\\secrets.dat', 'Webhook, token y contraseña de OBS, cifrados con DPAPI'],
          ['Sesión', '…\\DasodiLives\\state.json', 'El directo en curso, para sobrevivir a un reinicio'],
          ['Registro', '…\\DasodiLives\\logs\\monitor.log', 'Qué detectó y qué publicó, sin secretos'],
          ['Ajuste en OBS', '%APPDATA%\\obs-studio\\plugin_config\\obs-websocket\\config.json', 'Conexión interna activada, con contraseña y sin avisos']
        ]
      },
      steps: [
        { t: 'Cómo arranca',
          where: 'Al iniciar sesión en Windows.',
          what: 'La tarea lanza PowerShell sin ventana. El monitor se queda dormido y revisa cada 10 s si Discord está abierto. Si Discord se cierra en pleno directo, termina esa sesión antes de dormirse.',
          check: 'En el registro verás «Discord abierto: vigilando transmisiones».' },
        { t: 'Cómo detecta YouTube',
          where: 'OBS Studio.',
          what: 'Le pregunta a OBS por su conexión interna (WebSocket) si está transmitiendo. Confirma el inicio en unos 5 s y el fin tras 30 s sin señal, para no cortar por una reconexión. Si esa conexión falla, usa un respaldo: OBS abierto con conexión de subida activa.',
          check: 'En el registro: «Conectado a OBS por WebSocket».' },
        { t: 'Cómo detecta TikTok',
          where: 'TikTok LIVE Studio.',
          what: 'Mide el tráfico de los propios procesos de LIVE Studio. Si sube más de 1.2 Mbps durante 20 s, está en vivo; si baja durante 90 s, terminó. Así una descarga de Steam no dispara alertas falsas.',
          check: 'En el registro: «TikTok en vivo» al empezar.' },
        { t: 'Qué publica',
          where: 'Canal del webhook (#streams).',
          what: 'Al empezar: un mensaje con ping al rol Alertas, fecha y hora de inicio (cada quien la ve en su zona horaria) y enlaces; además pone el rol EN VIVO. Si entra la segunda plataforma, edita el mismo mensaje. Al terminar: lo edita a «Stream finalizado» con la duración, sin notificar, y quita el rol.',
          check: 'Un solo mensaje por directo en #streams.' },
        { t: 'Desinstalar con el instalador',
          where: 'Abre **Instalar DasodiLives.cmd** › **Desinstalar**.',
          what: 'Detiene el monitor, quita el arranque automático, cierra cualquier alerta pendiente, restaura la configuración de OBS (con OBS cerrado) y borra la carpeta con las llaves.',
          check: 'La carpeta %LOCALAPPDATA%\\DasodiLives ya no existe.' },
        { t: 'Desinstalar a mano (sin instalador)',
          where: 'Windows.',
          what: '1) Win + R › `taskschd.msc` › Biblioteca › borra **DasodiLives**. 2) Win + R › `shell:startup` › borra **DasodiLives.lnk** si existe. 3) Reinicia o cierra sesión para detener el monitor. 4) Win + R › `%LOCALAPPDATA%\\DasodiLives` › borra la carpeta. 5) Opcional, en OBS: Herramientas › Configuración del servidor WebSocket › desactívalo.',
          check: 'Tras reiniciar no aparece ningún proceso de DasodiLives y la carpeta no existe.',
          copy: '%LOCALAPPDATA%\\DasodiLives' },
        { t: 'Cierra la puerta en Discord',
          where: 'Discord y el portal de desarrolladores.',
          what: 'Borra los webhooks (Editar canal › Integraciones › Webhooks). En el portal, toca **Reset Token** o borra la aplicación. Quita el rol EN VIVO al streamer si quedó puesto.',
          check: 'El bot ya no aparece en la lista de miembros.' }
      ],
      tips: [
        'secrets.dat solo se puede descifrar con la cuenta de Windows que lo creó. Si alguien lo copia a otra PC, no le sirve.',
        'Para cambiar cualquier dato (webhook, roles, enlaces) no reinstales: usa **Reparar o actualizar**.'
      ]
    }
  ],

  /* ======================================================
     EXTRAS (sin checklist)
     ====================================================== */
  extras: [
    {
      title: 'Reglas (plantilla)',
      desc: 'Una base lista para pegar en #reglas. Ajústenla a su gusto.',
      items: [
        { q: 'Plantilla completa',
          a: 'Toca Copiar y pégala en #reglas. Las reglas cortas se leen; las largas no.',
          copy: '📜 REGLAS DE {S}\n\n1. Respeto ante todo. Nada de insultos, acoso ni discriminación.\n2. Sin spam ni autopromoción sin permiso de los Mods.\n3. Nada de contenido NSFW, gore ni ilegal.\n4. Cada tema en su canal: clips en #clips, memes en #memes.\n5. En el chat en vivo, sigue las indicaciones del streamer y los Mods.\n6. No compartas datos personales tuyos ni de otros.\n7. Se aplican las Normas de la comunidad de Discord: discord.com/guidelines\n\nRomper las reglas puede llevar a aislamiento, expulsión o baneo. ¡Diviértete!' },
        { q: '¿Dónde se pegan?',
          a: 'Escribe la plantilla en #reglas con la cuenta del owner, que puede escribir ahí aunque el canal esté en solo lectura.' }
      ]
    },
    {
      title: 'Comandos útiles',
      desc: 'Lo que más vas a usar en el día a día.',
      items: [
        { q: 'Música: reproducir', a: 'Entra a un canal de voz y escribe esto con el nombre de la canción. Busca en Spotify, Deezer, Apple Music o SoundCloud (no YouTube).', copy: '/play' },
        { q: 'Música: ver todos los comandos', a: 'Escribe / y toca el icono de Jockie Music: aparece la lista completa con descripción.' },
        { q: 'Mover a alguien al canal en vivo', a: 'Arrastra su nombre desde Sala de espera, o clic derecho en su nombre › Mover a.' },
        { q: 'Aislar a alguien un rato', a: 'Clic derecho en su nombre › Aislar temporalmente › elige el tiempo.' },
        { q: 'Ver quién hizo qué', a: 'Ajustes del servidor › Registro de auditoría, o el canal #logs de Carl-bot.' }
      ]
    },
    {
      title: 'Solución de problemas',
      desc: 'Lo que suele fallar y cómo arreglarlo.',
      items: [
        { q: 'El bot dice que no tiene permisos', a: 'Casi siempre es el orden de roles: el rol del bot debe estar arriba del rol que intenta manejar. Ajustes del servidor › Roles › arrástralo.' },
        { q: 'No aparece la tarjeta de bienvenida', a: 'Revisa que el bot tenga Ver canal, Enviar mensajes y Adjuntar archivos en #bienvenida, y que solo haya un bot de bienvenida activo.' },
        { q: 'El Onboarding no deja activar', a: 'Faltan canales predeterminados o canales donde @everyone pueda escribir. Suma #general, #memes y #chat-en-vivo.' },
        { q: 'La alerta de DasodiLives no sale', a: 'Discord debe estar abierto en la PC del streamer. Revisa %LOCALAPPDATA%\\DasodiLives\\logs\\monitor.log: si dice que el webhook es inválido, usa Reparar con uno nuevo.' },
        { q: 'TikTok no se detecta', a: 'El instalador debe haber encontrado TikTok LIVE Studio. Si lo instalaste después, corre Reparar. Si la conexión es muy lenta, el umbral de 1.2 Mbps se puede bajar en config.json (MinUploadMbps).' },
        { q: 'YouTube tarda o no se detecta', a: 'Corre Reparar con OBS cerrado para que active su conexión interna. Si se omitió ese paso, funciona en modo respaldo y es menos preciso.' },
        { q: 'Jockie no encuentra una canción', a: 'No busca en YouTube. Prueba con el nombre exacto o pega un enlace de Spotify.' }
      ]
    },
    {
      title: 'Plan de emergencia',
      desc: 'Qué hacer, en orden, cuando algo sale mal.',
      items: [
        { q: 'Raid (llega gente a hacer spam)', a: '1) Ajustes del servidor › Invitaciones › Pausar invitaciones. 2) Sube el nivel de verificación a Alto. 3) Banea desde la lista de miembros (puedes seleccionar varios). 4) Cuando pase, reactiva invitaciones y regresa la verificación a Medio.' },
        { q: 'Se filtró el token del bot', a: 'Portal de desarrolladores › tu aplicación › Bot › Reset Token. Luego abre el instalador › Reparar y pega el nuevo.' },
        { q: 'Se filtró un webhook', a: 'Editar canal › Integraciones › Webhooks › bórralo y crea otro. Luego instalador › Reparar con la URL nueva.' },
        { q: 'Un Mod abusa de sus permisos', a: 'Quítale el rol Mods (clic derecho › Roles) y revisa el Registro de auditoría para deshacer lo que hizo.' },
        { q: 'Perdiste acceso a tu cuenta', a: 'Usa tus códigos de respaldo del 2FA para entrar. Sin ellos, contacta al soporte de Discord: dis.gd/contact.' }
      ]
    },
    {
      title: 'Glosario',
      desc: 'Las palabras raras, en simple.',
      items: [
        { q: 'Owner', a: 'El dueño del server. Tiene todos los permisos y no se le pueden quitar.' },
        { q: 'Rol', a: 'Etiqueta que da color, permisos y lugar en la lista de miembros. Se ve en el perfil.' },
        { q: 'Jerarquía', a: 'El orden de los roles. Un rol solo puede manejar a los que están debajo de él.' },
        { q: 'Webhook', a: 'Enlace secreto de un canal que deja a un programa publicar mensajes ahí, sin bot ni cuenta.' },
        { q: 'Token', a: 'La contraseña de un bot. Quien la tenga, controla el bot.' },
        { q: 'Onboarding (Incorporación)', a: 'Las preguntas que ve la gente al entrar y que le dan roles solos.' },
        { q: 'AutoMod', a: 'El moderador automático integrado de Discord: bloquea spam y palabras antes de que se publiquen.' },
        { q: '2FA', a: 'Verificación en dos pasos: además de la contraseña, un código de una app.' },
        { q: 'DPAPI', a: 'El cifrado de Windows que usa DasodiLives: solo tu cuenta de Windows puede abrir lo cifrado.' }
      ]
    },
    {
      title: 'Enlaces oficiales',
      desc: 'Siempre invita y configura desde aquí.',
      items: [
        { q: 'Portal de desarrolladores de Discord', a: 'Para el bot propio.', link: 'https://discord.com/developers/applications' },
        { q: 'Documentación para desarrolladores', a: 'Desde 2026 vive en docs.discord.com.', link: 'https://docs.discord.com' },
        { q: 'Normas de la comunidad de Discord', a: 'Lo que aplica a todo server.', link: 'https://discord.com/guidelines' },
        { q: 'Koya', a: 'Bienvenida con tarjeta.', link: 'https://koya.gg' },
        { q: 'ProBot', a: 'Bienvenida con imagen y moderación.', link: 'https://probot.io' },
        { q: 'Carl-bot', a: 'Registros y roles.', link: 'https://carl.gg' },
        { q: 'Jockie Music', a: 'Música por comando.', link: 'https://www.jockiemusic.com' }
      ]
    }
  ]
};
