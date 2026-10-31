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
      intro: 'Haz esto desde Discord de escritorio en la PC. Varias pantallas de las siguientes fases son más cómodas ahí, y algunas solo existen ahí o en los paneles web de los bots. Así se reparte el equipo en todo el manual:',
      table: {
        head: ['Rol en el equipo', 'Quién es', 'Qué puede hacer'],
        rows: [
          ['Owner', 'Quien creó el server', 'Todo, incluido borrar el server. Ve todos los canales y no se le puede quitar nada.'],
          ['Administradores', 'Quienes moderan', 'Moderar, mover gente en voz y revisar registros. **Sin** el permiso de Discord «Administrador».'],
          ['Streamer', 'Quien transmite', 'Mover gente en voz, gestionar mensajes y aparecer EN VIVO mientras transmite.']
        ]
      },
      steps: [
        { id: 'cuentas-1', t: 'Activa la verificación en dos pasos (2FA)',
          where: 'Ajustes de usuario (engrane junto a tu nombre) › **Mi cuenta** › sección **Contraseña y autenticación**.',
          what: 'Toca **Habilitar aplicación de autenticación** y escanea el código con Google Authenticator, Microsoft Authenticator o Authy.',
          check: 'La sección dice que la autenticación de dos factores está activada.',
          warn: 'Más adelante se pedirá 2FA a todos los que moderen. Si el owner no lo tiene activado, no podrá activar ese requisito.' },
        { id: 'cuentas-2', t: 'Guarda los códigos de respaldo',
          where: 'Misma sección › **Ver códigos de respaldo**.',
          what: 'Guárdalos fuera del teléfono: en un gestor de contraseñas o impresos.',
          check: 'Puedes encontrar los códigos sin abrir Discord.',
          warn: 'Si pierdes el teléfono y no tienes estos códigos, puedes quedarte sin cuenta y sin server.' },
        { id: 'cuentas-3', t: 'Activa el Modo desarrollador',
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
        { id: 'crear-1', t: 'Crea el servidor',
          where: 'Barra izquierda de Discord › botón **+** (Añadir un servidor).',
          what: 'Elige **Crear el mío** › **Para un club o una comunidad**. Escribe el nombre **{S}** y toca **Crear**.',
          check: 'El icono nuevo aparece en tu barra izquierda.' },
        { id: 'crear-2', t: 'Sube el icono',
          where: 'Ajustes del servidor › **Información general** (Perfil del servidor).',
          what: 'Sube una imagen cuadrada de **512 × 512 px** o más, en PNG o JPG.',
          check: 'El icono se ve nítido en la barra izquierda.' },
        { id: 'crear-3', t: 'Borra los canales de ejemplo',
          where: 'Lista de canales.',
          what: 'Clic derecho en cada canal que Discord creó solo › **Eliminar canal**. Los armamos bien en la fase de Canales.',
          check: 'Solo queda la estructura vacía (o nada).' },
        { id: 'crear-4', t: 'Crea la invitación permanente',
          where: 'Clic derecho en el icono del server › **Invitar gente** › **Editar enlace de invitación**.',
          what: '**Caducar después de: Nunca** y **Número máximo de usos: Sin límite** › **Generar un nuevo enlace**. Copia el enlace.',
          check: 'Debajo del enlace dice que no caduca.',
          warn: 'Este es el enlace que va en la descripción de los streams de YouTube y TikTok. Guárdalo.' },
        { id: 'crear-5', t: 'Invita al equipo',
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
        { id: 'comunidad-1', t: 'Crea dos canales que te va a pedir',
          where: 'Lista de canales › **+** › Canal de texto.',
          what: 'Crea `reglas` y `mods-avisos`. Pueden estar vacíos por ahora.',
          check: 'Ves #reglas y #mods-avisos en la lista.' },
        { id: 'comunidad-2', t: 'Abre el asistente de Comunidad',
          where: 'Ajustes del servidor › **Habilitar comunidad** › **Empezar**.',
          what: 'Sigue las pantallas en orden.',
          check: 'Se abre el asistente de tres pasos.' },
        { id: 'comunidad-3', t: 'Paso de seguridad',
          where: 'Primera pantalla del asistente.',
          what: 'Acepta **correo verificado** para los miembros y el **filtro de contenido explícito para todos los miembros**.',
          check: 'Ambas casillas quedan marcadas y te deja continuar.' },
        { id: 'comunidad-4', t: 'Elige los canales',
          where: 'Segunda pantalla.',
          what: '**#reglas** como canal de reglas y **#mods-avisos** como canal de actualizaciones de la comunidad (ahí llegan avisos de Discord solo para el staff).',
          check: 'Ambos canales aparecen seleccionados.' },
        { id: 'comunidad-5', t: 'Termina y sube la verificación',
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
          ['1', 'Administradores', 'Azul', 'Sí', 'Quienes moderan el server'],
          ['2', 'Bot DasodiLives', 'Automático', 'No', 'Lo crea Discord al invitar el bot (fase Bot propio)'],
          ['3', 'EN VIVO', 'Rojo', 'Sí', 'Lo pone y quita el bot mientras el streamer transmite'],
          ['4', 'Streamer', 'Morado', 'No', 'La cuenta del streamer'],
          ['5', 'Roles de otros bots', 'Automático', 'No', 'Koya o ProBot, Carl-bot, Jockie Music'],
          ['6', 'Alertas', 'Sin color', 'No', 'Quien lo tenga recibe el aviso de directo'],
          ['7', 'Un rol por juego', 'Sin color o suave', 'No', 'Etiquetas que la gente elige al entrar']
        ]
      },
      steps: [
        { id: 'roles-1', t: 'Crea el rol Administradores',
          where: 'Roles › **Crear rol** › pestaña **Mostrar**, luego pestaña **Permisos**.',
          what: 'Nombre `Administradores`, color azul, enciende **Mostrar a los miembros del rol por separado**. En Permisos enciende solo: **Gestionar mensajes**, **Expulsar miembros**, **Banear miembros**, **Aislar temporalmente a miembros**, **Mover miembros**, **Silenciar miembros**, **Ensordecer miembros**, **Ver registro de auditoría**, **Fijar mensajes** y **Omitir modo lento**.',
          check: 'Administrador, Gestionar servidor y Gestionar roles quedan apagados.',
          warn: 'El rol se llama **Administradores**, pero **no** lleva el permiso de Discord llamado **Administrador**. Ese permiso da control total, incluso borrar el server; nadie más que el owner debe tenerlo.' },
        { id: 'roles-2', t: 'Crea el rol EN VIVO',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `EN VIVO`, color rojo, enciende **Mostrar por separado**. Deja apagado **Permitir que cualquiera @mencione este rol**. En Permisos toca **Borrar permisos**.',
          check: 'El rol no tiene ningún permiso encendido.' },
        { id: 'roles-3', t: 'Crea el rol Streamer',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `Streamer`, color morado, **sin** mostrar por separado. En Permisos: **Borrar permisos** y luego enciende **Mover miembros**, **Silenciar miembros**, **Gestionar mensajes**, **Prioridad de palabra**, **Fijar mensajes** y **Omitir modo lento**.',
          check: 'Solo esos seis permisos (más los básicos) quedan encendidos.',
          warn: 'No se muestra separado a propósito: si lo estuviera, taparía el grupo EN VIVO mientras transmite.' },
        { id: 'roles-4', t: 'Crea el rol Alertas',
          where: 'Roles › **Crear rol**.',
          what: 'Nombre `Alertas`, sin color, sin separar, **no mencionable** y **Borrar permisos**.',
          check: 'Aparece en la lista sin color.',
          warn: 'No hace falta que sea mencionable: el webhook de las alertas puede notificarlo igual, y así nadie más puede hacer spam con ese ping.' },
        { id: 'roles-5', t: 'Crea un rol por cada juego',
          where: 'Roles › **Crear rol**, una vez por juego.',
          what: 'Nombre del juego (por ejemplo `KOF XV`), sin separar, no mencionable, **Borrar permisos**. Empiecen con los que más juegan; se agregan más cuando quieran.',
          check: 'Cada juego tiene su rol sin permisos.',
          warn: 'Para agregar un juego después: crea el rol aquí y luego súmalo como opción en la fase de Onboarding.' },
        { id: 'roles-6', t: 'Ordena los roles',
          where: 'Ajustes del servidor › **Roles**.',
          what: 'Arrastra los roles al orden de la tabla. El del bot DasodiLives lo subirás cuando lo invites.',
          check: 'La lista coincide con la tabla de arriba.' },
        { id: 'roles-7', t: 'Asigna el rol Streamer',
          where: 'Clic derecho en su nombre › **Roles**.',
          what: 'En la cuenta del streamer, marca **Streamer**. El owner no necesita ningún rol: ya tiene todos los permisos.',
          check: 'Al abrir su perfil se ve el rol Streamer.' }
      ],
      tips: [
        'EN VIVO va arriba de Streamer para que, mientras transmite, el streamer aparezca hasta arriba de la lista con el nombre en rojo. Al terminar, vuelve solo a su lugar.',
        'Si un bot dice que no tiene permiso para un rol, casi siempre es el orden: su rol debe estar arriba del rol que intenta manejar.',
        'Desde febrero de 2026, **Fijar mensajes** y **Omitir modo lento** son permisos aparte: **Gestionar mensajes** ya no los incluye.'
      ]
    },

    /* ---------------------------------------------------- 05 */
    {
      title: 'Canales',
      desc: 'Información, comunidad, en vivo, voz y staff, cada uno con sus permisos.',
      intro: 'Crea las categorías con clic derecho en la lista de canales › **Crear categoría**, y los canales con el **+** junto a cada categoría. Los permisos se cambian en **Editar canal** › **Permisos**. Cada tipo de canal tiene su color en este manual: {T:Texto} para conversación, {T:Anuncios} para avisos que se pueden seguir, {T:Foro} para publicaciones con etiquetas y {T:Voz} para hablar.',
      table: {
        head: ['Categoría', 'Canal', 'Tipo', 'Ajuste clave'],
        rows: [
          ['Información', '#reglas', 'Texto', 'Solo lectura'],
          ['Información', '#bienvenida', 'Texto', 'Solo lectura; ahí sale la tarjeta de bienvenida'],
          ['Información', '#streams', 'Anuncios', 'Solo lectura; ahí llegan las alertas de DasodiLives'],
          ['Información', '#anuncios', 'Anuncios', 'Solo escriben Streamer y Administradores'],
          ['Comunidad', '#general', 'Texto', 'Abierto'],
          ['Comunidad', '#clips', 'Foro', 'Una etiqueta por juego'],
          ['Comunidad', '#memes', 'Texto', 'Abierto'],
          ['En vivo', '#chat-en-vivo', 'Texto', 'Modo lento de 10 s'],
          ['En vivo', 'Sala de espera', 'Voz', 'Abierto'],
          ['En vivo', 'En vivo con (nombre)', 'Voz', 'Visible, pero nadie entra solo'],
          ['Voz', 'Charla 1, Charla 2', 'Voz', 'Abiertos'],
          ['Voz', 'Música', 'Voz', 'Abierto; ahí suele estar el bot de música'],
          ['Staff', '#mods-avisos, #logs, #pruebas-bot', 'Texto', 'Privados: solo Administradores']
        ]
      },
      steps: [
        { id: 'canales-1', t: 'Crea las cinco categorías',
          where: 'Clic derecho en un espacio vacío de la lista › **Crear categoría**.',
          what: 'Información, Comunidad, En vivo, Voz y Staff. Mueve #reglas y #mods-avisos a la suya.',
          check: 'Las cinco categorías se ven en orden.' },
        { id: 'canales-2', t: 'Crea todos los canales de la tabla',
          where: '**+** junto a cada categoría.',
          what: 'Elige el tipo correcto en la ventana de creación: {T:Texto}, {T:Anuncios}, {T:Foro} o {T:Voz}. Así los canales nacen sincronizados con su categoría.',
          check: 'La lista coincide con la tabla.',
          warn: 'El tipo no se puede cambiar después, salvo de {T:Texto} a {T:Anuncios} y al revés. Si te equivocas, crea el canal de nuevo con el tipo correcto. {T:Foro} y {T:Anuncios} solo aparecen con Comunidad activa.' },
        { id: 'canales-3', t: 'Solo lectura en #reglas, #bienvenida y #streams',
          where: 'Editar canal › **Permisos** › rol **@everyone**.',
          what: '**Enviar mensajes** y **Crear hilos públicos** en rojo (✕). **Añadir reacciones** en verde.',
          check: 'Con una cuenta secundaria no puedes escribir en esos canales.' },
        { id: 'canales-4', t: '#anuncios solo para Streamer y Administradores',
          where: 'Editar canal › **Permisos**.',
          what: '@everyone con **Enviar mensajes** en rojo. Agrega los roles **Streamer** y **Administradores** con **Enviar mensajes** en verde.',
          check: 'Una cuenta con rol Streamer puede escribir ahí; una cuenta normal no.' },
        { id: 'canales-5', t: 'Canal de voz con acceso controlado',
          where: 'Editar canal «En vivo con (nombre)» › **Permisos**.',
          what: '@everyone: **Ver canal** en verde y **Conectar** en rojo. Agrega **Streamer** y **Administradores** con **Conectar**, **Hablar** y **Mover miembros** en verde.',
          check: 'Una cuenta normal ve el canal pero no puede entrar.',
          warn: 'Para meter a alguien: arrastra su nombre desde Sala de espera al canal en vivo, o clic derecho en su nombre › **Mover a**. Para sacarlo: clic derecho › **Desconectar**.' },
        { id: 'canales-6', t: 'Modo lento en #chat-en-vivo',
          where: 'Editar canal › **Información general** › **Modo lento**.',
          what: 'Ponlo en **10 segundos**.',
          check: 'Al escribir con una cuenta normal aparece la cuenta regresiva.',
          warn: 'Desde el 23 de febrero de 2026, solo se salta el modo lento quien tenga el permiso **Omitir modo lento** (`BYPASS_SLOWMODE`); **Gestionar mensajes** ya no basta. Por eso los roles Streamer y Administradores lo llevan encendido.' },
        { id: 'canales-7', t: 'Categoría Staff privada',
          where: 'Clic derecho en la categoría Staff › **Editar categoría** › **Permisos**.',
          what: '@everyone con **Ver canal** en rojo. Agrega **Administradores** con **Ver canal** en verde. Los canales de dentro lo heredan.',
          check: 'Una cuenta normal no ve la categoría Staff.' },
        { id: 'canales-8', t: 'Etiquetas por juego en #clips',
          where: 'Editar canal #clips › **Vista general** › sección **Etiquetas** › **Añadir etiqueta**.',
          what: 'Crea una etiqueta por juego, con su nombre y un emoji (las mismas que sus roles). Para sumar un juego después, agrega su etiqueta aquí.',
          check: 'Al crear una publicación en #clips aparecen las etiquetas para elegir.',
          warn: '#clips debe ser {T:Foro}: los canales de {T:Texto} no tienen etiquetas y no se pueden convertir. Si lo creaste como texto, crea un foro nuevo y borra el viejo, o renómbralo a `clips-viejo` si quieres conservar sus mensajes (no se pasan al foro).' }
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
      intro: '**Onboarding** (en español, **Incorporación**) es lo primero que ve alguien al entrar a {S}: unas preguntas como «¿Qué juegos juegas?» o «¿Te aviso cuando empiece el stream?». Cada respuesta le da roles y le muestra canales automáticamente, sin bots. Tiene tres partes: **Canales predeterminados** (lo que todos ven al llegar), **Preguntas** (lo que eligen) y la **Guía del servidor** (bienvenida y primeras tareas). **Solo existe con Comunidad activa:** si en Ajustes del servidor todavía aparece «Activa la comunidad», la Incorporación no sale en el menú.',
      steps: [
        { id: 'onboarding-1', t: 'Abre la Incorporación',
          where: 'Ajustes del servidor › sección **Comunidad** › **Incorporación** (Onboarding). La sección Comunidad aparece en el menú solo después de activarla.',
          what: 'Toca **Empezar** o **Configurar**.',
          check: 'Ves las secciones de canales predeterminados y preguntas.',
          warn: 'Si no la encuentras, revisa el menú de Ajustes: si dice «Activa la comunidad», primero completa el nivel **Activar Comunidad**. También hace falta ser owner o tener los permisos **Gestionar servidor** y **Gestionar roles**.' },
        { id: 'onboarding-2', t: 'Canales predeterminados',
          where: 'Sección **Canales predeterminados**.',
          what: 'Marca #reglas, #bienvenida, #streams, #anuncios, #general, #clips, #memes, #chat-en-vivo y los canales de voz.',
          check: 'Discord no muestra error.',
          warn: 'Discord pide un mínimo de 7 canales y que en varios de ellos @everyone pueda escribir. Si marca error, suma más canales abiertos.' },
        { id: 'onboarding-3', t: 'Pregunta de juegos',
          where: 'Sección **Preguntas** › **Añadir pregunta**.',
          what: 'Texto: «¿Qué juegos juegas?». Activa **selección múltiple**, no obligatoria. Crea una opción por juego (con emoji) y asígnale su rol.',
          check: 'Cada opción tiene su rol de juego asignado.',
          warn: 'Si son muchos juegos, divide en dos preguntas por género (por ejemplo Pelea y Shooters). Para sumar un juego después, agrégalo como opción aquí.' },
        { id: 'onboarding-4', t: 'Pregunta de alertas',
          where: '**Añadir pregunta**.',
          what: 'Texto: «¿Te aviso cuando empiece el stream?». **Una sola respuesta**. Opción «Sí, avísame» con el rol **Alertas**; opción «No, gracias» sin rol.',
          check: 'La opción «Sí» tiene el rol Alertas.' },
        { id: 'onboarding-5', t: 'Muestra las preguntas antes de entrar',
          where: 'Ajustes de la pregunta.',
          what: 'Activa que se muestren **antes de unirse**, para que elijan desde el primer momento.',
          check: 'En la vista previa, las preguntas salen antes de entrar al server.' },
        { id: 'onboarding-6', t: 'Guía del servidor y activar',
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
        { id: 'bienvenida-1', t: 'Activa el mensaje nativo de Discord',
          where: 'Ajustes del servidor › **Información general** › **Canal de mensajes del sistema**.',
          what: 'Elige **#bienvenida** y enciende **Enviar un mensaje de bienvenida aleatorio cuando alguien se une**.',
          check: 'Al entrar alguien aparece una línea tipo «¡Miren quién llegó!» con flecha verde. Esa línea es de Discord, no del bot.' },
        { id: 'bienvenida-2', t: 'Elige e invita UN bot (Koya recomendado)',
          where: '**koya.gg** › **Add to Discord**. También desde Discord: Ajustes del servidor › **Directorio de apps** › busca «Koya» › **Agregar app**. (ProBot: probot.io › **Add to Discord**, mismos permisos.)',
          what: '1) Inicia sesión con tu cuenta de Discord si lo pide.\n2) En **Agregar al servidor**, elige **{S}** y toca **Continuar**.\n3) En la pantalla de permisos deja marcados **solo**: **Ver canales**, **Enviar mensajes**, **Insertar enlaces**, **Adjuntar archivos** (la tarjeta es una imagen), **Leer el historial de mensajes** y **Utilizar comandos de aplicación**.\n4) **Desmarca todo lo demás**, sobre todo **Administrador**, **Gestionar servidor**, **Gestionar roles**, **Gestionar canales**, **Banear**, **Expulsar** y **Mencionar a @everyone, @here y a todos los roles**.\n5) Toca **Autorizar** y completa la verificación si aparece. Te manda a su panel web.',
          check: 'El bot aparece en la lista de miembros con su etiqueta APP, y su rol en Ajustes del servidor › Roles solo tiene esos permisos.',
          warn: 'Invita **solo uno**: con Koya y ProBot a la vez, cada persona recibe dos tarjetas. Si algún día quieren los roles automáticos de Koya, ahí sí necesitará **Gestionar roles**, con su rol arriba de los roles que vaya a dar; con el Onboarding no hace falta.' },
        { id: 'bienvenida-3', t: 'Dale permiso de escribir en #bienvenida',
          where: 'Editar canal #bienvenida › **Permisos** › agrega el rol del bot.',
          what: '**Ver canal**, **Enviar mensajes** y **Adjuntar archivos** en verde.',
          check: 'El rol del bot aparece en la lista de permisos del canal.' },
        { id: 'bienvenida-4', t: 'Si elegiste Koya: configura la tarjeta',
          where: 'Panel de Koya › **Welcome**.',
          what: 'Canal **#bienvenida**, activa la **tarjeta de bienvenida** con diseño **Classic**. Fondo: una imagen oscura del tono de Discord o con la estética del canal. Título `BIENVENID@`; debajo, la variable del nombre de usuario que ofrece el panel; subtítulo `AL SERVIDOR {S}`. Fuente gruesa.',
          check: 'La vista previa del panel muestra la tarjeta con la foto, BIENVENID@ y el nombre.',
          copy: 'AL SERVIDOR {S}' },
        { id: 'bienvenida-5', t: 'Si elegiste ProBot: configura la tarjeta',
          where: 'probot.io › tu server › módulo de **Bienvenida** (Welcome & Goodbye).',
          what: 'Actívalo, canal **#bienvenida**, activa la **imagen de bienvenida**. Fondo de unos 1024 × 450 px; avatar grande y centrado; nombre con fuente grande.',
          check: 'La vista previa muestra avatar y nombre en grande.' },
        { id: 'tarjeta-1', t: 'Diseña el fondo: medida y herramienta',
          where: 'Canva (gratis, en el navegador) o Photopea (gratis, parecido a Photoshop).',
          what: 'Usa la medida que indique el panel del bot. Si no indica ninguna, crea un lienzo horizontal de **1024 × 450 px** (en Canva: Crear diseño › Tamaño personalizado). Pon de fondo arte del canal o del juego principal y, encima, una capa negra al **40–60 %** de opacidad para que el texto se lea.',
          check: 'El fondo se ve oscuro y parejo en el centro.' },
        { id: 'tarjeta-2', t: 'Respeta la zona segura',
          where: 'El centro del lienzo.',
          what: 'El bot dibuja encima el **avatar en círculo** y **tres líneas de texto** (BIENVENID@, nombre y subtítulo), centrados. Deja esa franja central limpia: nada de caras, letras ni detalles fuertes ahí. Pon los adornos (personajes, logos, destellos) en los bordes izquierdo y derecho.',
          check: 'Si imaginas un círculo y tres renglones en el centro, no tapan nada importante.',
          warn: 'Evita fondos muy claros o con mucho detalle en el centro: el texto blanco del bot desaparece.' },
        { id: 'tarjeta-3', t: 'Exporta y prueba con nombres largos',
          where: 'Canva › Compartir › Descargar (o Photopea › Archivo › Exportar como).',
          what: 'Exporta en **PNG** o **JPG** y súbelo como fondo en el panel del bot. En la vista previa prueba con un nombre largo para ver si cabe.',
          check: 'Un nombre largo se lee completo y no choca con los adornos.' },
        { id: 'bienvenida-6', t: 'Prueba la bienvenida',
          where: 'Una cuenta secundaria (o la vista previa del panel).',
          what: 'Entra a {S} con la cuenta secundaria.',
          check: 'Sale la línea nativa y, debajo, la tarjeta del bot.' }
      ],
      tips: [
        'Los paneles de los bots cambian de nombre seguido. Si no ves el botón exacto, busca la sección equivalente.',
        'Parte de la comparativa de ProBot viene de un bot competidor: confirma en su panel qué es gratis.'
      ]
    },

    /* ---------------------------------------------------- Expresiones */
    {
      title: 'Expresiones',
      desc: 'Emojis, stickers y sonidos propios de {S}. Le dan identidad al server y a los streams.',
      intro: 'Todo se sube en Ajustes del servidor, sección **Expresión**: **Emojis**, **Stickers** y **Panel de sonidos**. Cuántos caben depende del nivel de mejoras (boosts) del server:',
      table: {
        head: ['Nivel de mejoras', 'Emojis', 'Stickers', 'Sonidos'],
        rows: [
          ['Sin mejoras', '50 estáticos + 50 animados', '5', '8'],
          ['Nivel 1 (2 mejoras)', '100 + 100', '15', '24'],
          ['Nivel 2 (7 mejoras)', '150 + 150', '30', '36'],
          ['Nivel 3 (14 mejoras)', '250 + 250', '60', '48']
        ]
      },
      steps: [
        { id: 'expresiones-1', t: 'Sube emojis',
          where: 'Ajustes del servidor › **Emojis** › **Subir emoji**.',
          what: 'Imagen cuadrada de **128 × 128 px**, de **256 KB** como máximo, en PNG, JPG, GIF (animado) o WebP. Usa fondo transparente. Ponles nombres cortos y claros, por ejemplo `gg`, `kof_win`, `dasodi_hype`.',
          check: 'Al escribir `:` y el nombre en el chat, aparece el emoji.',
          warn: 'Se ven chiquitos (32 px en el chat): usa diseños simples y gruesos.' },
        { id: 'expresiones-2', t: 'Sube stickers',
          where: 'Ajustes del servidor › **Stickers** › **Subir sticker**.',
          what: 'Imagen de **exactamente 320 × 320 px**, de **512 KB** como máximo, en PNG o APNG (animado). Elige un nombre y un emoji relacionado: así aparece en las sugerencias.',
          check: 'El sticker aparece en el menú de stickers del chat.',
          warn: 'Un sticker no se puede editar después de subirlo: para cambiarlo hay que borrarlo y subirlo otra vez.' },
        { id: 'expresiones-3', t: 'Sube sonidos al panel',
          where: 'Ajustes del servidor › **Panel de sonidos** › **Subir sonido**.',
          what: 'Audio **MP3 u OGG**, de **512 KB** y **5 segundos** como máximo (el editor deja recortar). Ponle nombre, un emoji y el volumen. Sirven en canales de voz: frases del streamer, efectos de juego, el sonido de victoria.',
          check: 'En un canal de voz, el botón del panel de sonidos muestra el sonido nuevo y suena.',
          warn: 'Baja el volumen de los sonidos fuertes: suenan para todos en el canal de voz.' },
        { id: 'expresiones-4', t: 'Da permiso a quienes los administran',
          where: 'Ajustes del servidor › **Roles** › **Administradores** › Permisos.',
          what: 'Enciende **Crear expresiones** y **Gestionar expresiones**. El primero deja subir; el segundo, editar o borrar las de otros.',
          check: 'Un Administrador ve el botón Subir en Emojis, Stickers y Panel de sonidos.' },
        { id: 'expresiones-5', t: 'Decide si se permiten las de otros servers',
          where: 'Ajustes del servidor › **Roles** › **@everyone** › Permisos.',
          what: '**Usar emojis externos**, **Usar stickers externos** y **Usar sonidos externos** dejan usar expresiones de otros servers (para quien tenga Nitro). Déjalos encendidos para un ambiente relajado, o apágalos si quieres que solo se usen las de {S}.',
          check: 'La opción queda como la acordaron el owner y los Administradores.' }
      ],
      tips: [
        'Los emojis, stickers y sonidos propios los puede usar cualquier miembro dentro de {S}, sin Nitro.',
        'Si el server pierde un nivel de mejoras, Discord no borra nada: solo bloquea los que pasen del nuevo límite hasta recuperar el nivel.',
        'Para quitar fondos a una imagen rápido: la herramienta de quitar fondo de Canva o Photopea.'
      ]
    },

    /* ---------------------------------------------------- 08 */
    {
      title: 'Bots de apoyo',
      desc: 'Registros de moderación con Carl-bot y música por comando con Jockie Music.',
      intro: 'Un **bot** es una cuenta automática que vive en los servidores de quien lo creó, no en tu PC. Entra a {S} con un rol propio y solo puede hacer lo que permitan sus permisos y la posición de su rol. Por eso al invitarlo se revisan sus permisos y se le quita **Administrador**. Estos son los bots del manual:',
      table: {
        head: ['Bot', 'Para qué', 'Permisos que necesita', 'Dónde se configura'],
        rows: [
          ['Koya o ProBot', 'Tarjeta de bienvenida', 'Ver canal, Enviar mensajes y Adjuntar archivos en #bienvenida', 'Su panel web'],
          ['Carl-bot', 'Registros de moderación', 'Ver canales, Ver registro de auditoría, Enviar mensajes en #logs', 'carl.gg'],
          ['Jockie Music', 'Música en voz', 'Conectar y Hablar en canales de voz', 'Comandos `/` en el chat'],
          ['DasodiLives', 'Rol EN VIVO', 'Solo Gestionar roles, con su rol encima de EN VIVO', 'Instalador en la PC del streamer']
        ]
      },
      steps: [
        { id: 'bots-1', t: 'Invita a Carl-bot',
          where: '**carl.gg** › **Invite** (o Ajustes del servidor › **Directorio de apps** › busca «Carl-bot»).',
          what: '1) Elige **{S}** y toca **Continuar**.\n2) En la lista de permisos deja marcados **solo**: **Ver canales**, **Leer el historial de mensajes** (para saber qué decía un mensaje borrado), **Ver registro de auditoría** (para saber quién lo borró), **Enviar mensajes**, **Insertar enlaces**, **Adjuntar archivos** y **Utilizar comandos de aplicación**.\n3) **Desmarca todo lo demás**: Gestionar servidor, Gestionar roles, Gestionar canales, Expulsar, Banear, Moderar miembros, Gestionar webhooks, Gestionar mensajes, Mencionar a @everyone, Conectar, Hablar y el resto.\n4) Toca **Autorizar**. Te manda a carl.gg para el asistente inicial.',
          check: 'Carl-bot aparece en la lista de miembros y su rol solo tiene esos permisos.',
          warn: 'Las sanciones las hacen los Administradores, no el bot: por eso no lleva permisos de expulsar, banear ni moderar. Si algún día usan sus roles por reacción, se le agrega **Gestionar roles** en ese momento.' },
        { id: 'carl-asistente', t: 'Completa el asistente de Carl-bot',
          where: 'carl.gg › **Quick setup** (se abre solo al invitarlo; son 5 pasos).',
          what: '1) **General**: deja solo el prefijo `?` y borra `!` (otros bots lo usan). Carl-bot ya funciona con comandos `/`.\n2) **Welcome message**: elige **None**. La bienvenida ya la dan Discord y Koya.\n3) **Reaction roles**: no elijas plantilla, toca **Next**. Los roles ya los da el Onboarding.\n4) **Moderation**: en **Mute Role** no elijas nada (ni «Create one for me»): Discord ya trae Aislar temporalmente. En **modlogs** elige **#logs**.\n5) **Automod**: elige **Off/Custom**. Ya está activo el AutoMod de Discord.',
          check: 'El asistente termina sin pedir permisos extra.',
          warn: 'Si algún paso no te deja avanzar sin elegir algo, no aceptes crear roles ni darle permisos: cierra el asistente y configura lo que falte desde el panel de carl.gg.' },
        { id: 'bots-2', t: 'Activa los registros',
          where: 'carl.gg › menú izquierdo › despliega **MODERATION** › **Logging**. (No confundir con **Weblogs**: ese solo registra cambios hechos en el panel.)',
          what: '1) **Default log channel**: **#logs**. Deja los demás canales en «No channel selected» para que todo caiga ahí.\n2) **Ignored channels**: **#logs** y **#pruebas-bot**.\n3) Enciende: **Deleted**, **Edited** y **Purged messages**; **Members joining** y **leaving**; en Server events, creación, cambios y borrado de **canales** y **roles**, **Server updates** y **Emoji changes**; en Member events, **Role updates**, **Name changes**, **bans**, **unbans**, **timeout** y **remove timeout**.\n4) Deja apagados **Avatar changes** y todos los **Voice events**: generan mucho ruido en un server de streams.',
          check: 'Escribe un mensaje en #general, edítalo y bórralo: en #logs aparecen dos registros (antes/después y el mensaje borrado).',
          warn: 'Si no aparece nada, el rol de carl-bot necesita **Ver canal**, **Enviar mensajes** e **Insertar enlaces** en #logs. Si #logs está en la categoría privada Staff, agrégale ese permiso al rol de carl-bot ahí.' },
        { id: 'bots-3', t: 'Invita a Jockie Music',
          where: 'jockiemusic.com › **Invite**.',
          what: 'Elige {S}. Si quieren dos fiestas a la vez, invita también una segunda instancia (Jockie Music 1, 2 o 3).',
          check: 'Jockie aparece en la lista de miembros.' },
        { id: 'bots-4', t: 'Prueba la música',
          where: 'Entra a un canal de voz y escribe en cualquier chat.',
          what: 'Escribe `/play` y el nombre de una canción. El bot entra al canal donde estás.',
          check: 'Suena la canción.',
          warn: 'Jockie **no reproduce YouTube**: busca desde las plataformas que sí admite, como Spotify, Deezer, Apple Music o SoundCloud. Los bots que retransmiten YouTube son los que han ido cerrando.',
          copy: '/play' },
        { id: 'bots-5', t: 'Ubica sus roles',
          where: 'Ajustes del servidor › **Roles**.',
          what: 'Deja los roles de Carl-bot y Jockie en la posición 5 de la tabla de Roles.',
          check: 'Están debajo de Streamer y arriba de Alertas.' },
        { id: 'bots-6', t: 'Quita un bot que ya no usen',
          where: 'Ajustes del servidor › **Integraciones** › sección de bots y apps › el bot.',
          what: 'Toca **Expulsar** o **Eliminar** (según la versión). También funciona clic derecho en el bot en la lista de miembros › **Expulsar**. Revisa después que no haya quedado su rol vacío en Roles.',
          check: 'El bot ya no aparece en la lista de miembros.',
          warn: 'Un bot olvidado con permisos es una puerta abierta. Quiten los que no usen.' }
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
        { id: 'seguridad-1', t: 'Activa AutoMod',
          where: 'Ajustes del servidor › **AutoMod**.',
          what: 'Activa **Bloquear spam sospechoso**, **Bloquear menciones excesivas** (por ejemplo, más de 5 por mensaje) y el filtro de **Palabras marcadas comúnmente**. Envía las alertas a **#logs**.',
          check: 'Las tres reglas aparecen como activas.' },
        { id: 'seguridad-2', t: 'Pide 2FA para moderar',
          where: 'Ajustes del servidor › **Seguridad** (o Moderación).',
          what: 'Enciende el requisito de **autenticación de dos factores para acciones de moderación**.',
          check: 'El ajuste queda activado.',
          warn: 'Los Administradores y el streamer deben activar 2FA en su cuenta, o no podrán expulsar ni borrar mensajes.' },
        { id: 'seguridad-3', t: 'Recorta los permisos de @everyone',
          where: 'Ajustes del servidor › **Roles** › **@everyone**.',
          what: 'Apaga **Mencionar @everyone, @here y todos los roles**, cualquier permiso que empiece con **Gestionar** y **Crear expresiones**. Deja Ver canales, Enviar mensajes, Conectar y Hablar.',
          check: 'Una cuenta normal no puede usar @everyone.' },
        { id: 'seguridad-4', t: 'Nadie con el permiso Administrador',
          where: 'Ajustes del servidor › **Roles**, rol por rol.',
          what: 'Revisa que ningún rol tenga el permiso **Administrador** (ni siquiera el rol Administradores). Si alguien necesita algo, dale ese permiso concreto.',
          check: 'Solo el owner tiene control total.' },
        { id: 'seguridad-5', t: 'Aprende a pausar invitaciones',
          where: 'Ajustes del servidor › **Invitaciones** › **Pausar invitaciones**.',
          what: 'No lo actives ahora: solo ubícalo. Es tu freno de emergencia en un raid.',
          check: 'Sabes dónde está el botón.' },
        { id: 'seguridad-6', t: 'Respalda la estructura con una plantilla',
          where: 'Ajustes del servidor › **Plantilla del servidor**.',
          what: 'Escribe un título (por ejemplo `{S} respaldo`) y toca **Generar plantilla**. Copia el enlace y guárdalo junto al token y los webhooks. Copia roles, permisos, canales y ajustes; **no** copia mensajes, miembros, bots ni emojis.',
          check: 'Tienes guardado un enlace `discord.new/…`.',
          warn: 'Cuando cambien roles o canales, entra de nuevo y toca **Sincronizar plantilla** para que el respaldo esté al día.' },
        { id: 'seguridad-7', t: 'Define quién responde si el owner no está',
          where: 'Acuerdo entre el owner y los Administradores.',
          what: 'Elijan a un Administrador de confianza, con 2FA activo, como contacto principal. Si algún día el owner deja de administrar, puede pasar la propiedad: Ajustes del servidor › **Miembros** › menú de esa persona › **Transferir propiedad**.',
          check: 'Todos saben a quién acudir si algo grave pasa y el owner no responde.',
          warn: 'Transferir la propiedad es definitivo: solo la persona nueva puede devolverla.' }
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
      intro: 'Un **webhook** es un enlace secreto que pertenece a **un solo canal**: quien tenga el enlace puede publicar mensajes ahí, sin cuenta y sin bot. DasodiLives lo usa para publicar la alerta y luego editarla. El **bot** lo usa solo para poner y quitar el rol EN VIVO, porque un webhook no puede tocar roles. La diferencia:',
      table: {
        head: ['', 'Webhook', 'Bot'],
        rows: [
          ['Qué es', 'Un enlace de un canal que solo publica', 'Una cuenta automática con rol y permisos'],
          ['Qué puede hacer', 'Publicar, editar y borrar **sus propios** mensajes en ese canal', 'Lo que permitan sus permisos (aquí, solo Gestionar roles)'],
          ['Necesita estar encendido', 'No', 'No en este caso: DasodiLives lo llama solo cuando hace falta'],
          ['Si se filtra', 'Cualquiera puede publicar en ese canal', 'Cualquiera puede controlar el bot'],
          ['Cómo se anula', 'Se borra el webhook y se crea otro', 'Reset Token en el portal de desarrolladores']
        ]
      },
      steps: [
        { id: 'botpropio-1', t: 'Crea la aplicación',
          where: 'discord.com/developers/applications › **New Application**.',
          what: 'Nombre `DasodiLives`, acepta los términos. En **General Information** sube el mismo icono del server.',
          check: 'La aplicación aparece en tu lista.' },
        { id: 'botpropio-2', t: 'Configura el bot',
          where: 'Sección **Bot** de la aplicación.',
          what: 'Apaga **Public Bot** (así solo quien creó la aplicación puede invitarlo). Deja **apagados** los tres Privileged Gateway Intents: no los necesita.',
          check: 'Public Bot está apagado y los intents también.' },
        { id: 'botpropio-3', t: 'Saca el token',
          where: 'Sección **Bot** › **Reset Token**.',
          what: 'Confirma y copia el token. Discord lo muestra **una sola vez**. Guárdalo en un gestor de contraseñas.',
          check: 'Tienes el token guardado fuera de Discord.',
          warn: 'Con el token, cualquiera controla el bot. Nunca por chat, nunca en GitHub. Si se filtra, vuelve a tocar Reset Token.' },
        { id: 'botpropio-4', t: 'No lo invites todavía',
          where: '—',
          what: 'El instalador de DasodiLives te da el botón de invitación con el permiso justo (**Gestionar roles**).',
          check: 'El bot aún no está en {S}; es correcto.' },
        { id: 'botpropio-5', t: 'Crea el webhook de pruebas',
          where: 'Editar canal **#pruebas-bot** › **Integraciones** › **Webhooks** › **Nuevo webhook**.',
          what: 'Nómbralo `DasodiLives`, súbele el icono y toca **Copiar URL del webhook**.',
          check: 'La URL empieza con `https://discord.com/api/webhooks/`.' },
        { id: 'botpropio-6', t: 'Crea el webhook real',
          where: 'Lo mismo, en **#streams**.',
          what: 'Copia también su URL y guárdala junto al token.',
          check: 'Tienes dos URLs distintas: pruebas y streams.',
          warn: 'Cada URL es una llave de su canal. Si se filtra, bórrala en esa misma pantalla y crea otra.' },
        { id: 'botpropio-7', t: 'Copia el ID del streamer',
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
      intro: '**DasodiLives no se instala en el server: es una tarea de Windows en la PC del streamer.** Discord solo recibe lo que esa PC le manda. Si la PC está apagada o Discord está cerrado en ella, no sale ninguna alerta. Qué corre dónde:',
      table: {
        head: ['Pieza', 'Dónde vive', 'Cuándo trabaja'],
        rows: [
          ['Instalar DasodiLives.cmd + Setup', 'Carpeta extraída del zip, en la PC del streamer', 'Solo cuando la abres: instalar, reparar o desinstalar'],
          ['Monitor', 'PC del streamer, en %LOCALAPPDATA%\\DasodiLives', 'Solo, oculto, cada vez que se inicia sesión en Windows'],
          ['Tarea programada', 'Programador de tareas de Windows', 'Al iniciar sesión: arranca el monitor'],
          ['Webhook', 'Canal #streams, en Discord', 'Cuando el monitor publica o edita la alerta'],
          ['Bot DasodiLives', 'Discord (no corre en ningún lado)', 'Cuando el monitor pide poner o quitar el rol EN VIVO']
        ]
      },
      steps: [
        { id: 'instalar-1', t: 'Desbloquea el zip',
          where: 'Clic derecho en DasodiLives.zip › **Propiedades**.',
          what: 'Marca **Desbloquear** › Aceptar. Así Windows no frena los scripts.',
          check: 'La casilla Desbloquear desaparece al volver a abrir Propiedades.' },
        { id: 'instalar-2', t: 'Extrae la carpeta completa',
          where: 'Clic derecho › **Extraer todo**.',
          what: 'No lo abras desde dentro del zip.',
          check: 'Ves Instalar DasodiLives.cmd y los dos .ps1 en una carpeta normal.' },
        { id: 'instalar-3', t: 'Abre el instalador',
          where: 'Doble clic en **Instalar DasodiLives.cmd**.',
          what: 'Revisión del equipo: debe encontrar Discord, OBS Studio y TikTok LIVE Studio.',
          check: 'Las palomitas verdes de Discord y al menos una plataforma.' },
        { id: 'instalar-4', t: 'Canal de alertas',
          where: 'Paso «¿En qué canal salen las alertas?».',
          what: 'Pega el webhook de **#pruebas-bot** y toca **Comprobar**.',
          check: 'Dice que el webhook funciona.' },
        { id: 'instalar-5', t: 'Bot y roles',
          where: 'Paso «Rol EN VIVO y aviso».',
          what: 'Pega el token y toca **Comprobar**. Si dice que el bot no está en el server, toca **Invitar el bot a tu server**, autoriza y vuelve a Comprobar. Luego elige **Alertas** como rol del aviso, **EN VIVO** como rol en vivo y pega el ID del streamer.',
          check: 'Las tres comprobaciones salen en verde.',
          warn: 'Si avisa que el bot está debajo de EN VIVO, sube el rol del bot en Ajustes del servidor › Roles y vuelve a comprobar.' },
        { id: 'instalar-6', t: 'Datos del stream e instalación',
          where: 'Pasos «Datos del stream» y «Confirmar».',
          what: 'Nombre del streamer, enlace de YouTube y usuario de TikTok. Toca **Instalar**. Si OBS está abierto, te pedirá cerrarlo un momento.',
          check: 'Aparece y se borra solo un mensaje de prueba en #pruebas-bot.' },
        { id: 'instalar-7', t: 'Prueba con un directo',
          where: 'PC del streamer, con Discord abierto. Date el rol Alertas para recibir el aviso.',
          what: 'Inicia en OBS una transmisión no listada; luego sal en vivo en LIVE Studio; luego detén todo.',
          check: 'YouTube: alerta en unos 10 s. TikTok: unos 20 a 30 s (o la misma alerta cambia a YouTube + TikTok). Fin: la alerta cambia a «Stream finalizado» sin notificar, y se quita el rol.' },
        { id: 'instalar-8', t: 'Pasa a producción',
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
        { id: 'fondo-1', t: 'Cómo arranca',
          where: 'Al iniciar sesión en Windows.',
          what: 'La tarea lanza PowerShell sin ventana. El monitor se queda dormido y revisa cada 10 s si Discord está abierto. Si Discord se cierra en pleno directo, termina esa sesión antes de dormirse.',
          check: 'En el registro verás «Discord abierto: vigilando transmisiones».' },
        { id: 'fondo-2', t: 'Cómo detecta YouTube',
          where: 'OBS Studio.',
          what: 'Le pregunta a OBS por su conexión interna (WebSocket) si está transmitiendo. Confirma el inicio en unos 5 s y el fin tras 30 s sin señal, para no cortar por una reconexión. Si esa conexión falla, usa un respaldo: OBS abierto con conexión de subida activa.',
          check: 'En el registro: «Conectado a OBS por WebSocket».' },
        { id: 'fondo-3', t: 'Cómo detecta TikTok',
          where: 'TikTok LIVE Studio.',
          what: 'Mide el tráfico de los propios procesos de LIVE Studio. Si sube más de 1.2 Mbps durante 20 s, está en vivo; si baja durante 90 s, terminó. Así una descarga de Steam no dispara alertas falsas.',
          check: 'En el registro: «TikTok en vivo» al empezar.' },
        { id: 'fondo-4', t: 'Qué publica',
          where: 'Canal del webhook (#streams).',
          what: 'Al empezar: un mensaje con ping al rol Alertas, fecha y hora de inicio (cada quien la ve en su zona horaria) y enlaces; además pone el rol EN VIVO. Si entra la segunda plataforma, edita el mismo mensaje. Al terminar: lo edita a «Stream finalizado» con la duración, sin notificar, y quita el rol.',
          check: 'Un solo mensaje por directo en #streams.' },
        { id: 'fondo-5', t: 'Desinstalar con el instalador',
          where: 'Abre **Instalar DasodiLives.cmd** › **Desinstalar**.',
          what: 'Detiene el monitor, quita el arranque automático, cierra cualquier alerta pendiente, restaura la configuración de OBS (con OBS cerrado) y borra la carpeta con las llaves.',
          check: 'La carpeta %LOCALAPPDATA%\\DasodiLives ya no existe.' },
        { id: 'fondo-6', t: 'Desinstalar a mano (sin instalador)',
          where: 'Windows.',
          what: '1) Win + R › `taskschd.msc` › Biblioteca › borra **DasodiLives**. 2) Win + R › `shell:startup` › borra **DasodiLives.lnk** si existe. 3) Reinicia o cierra sesión para detener el monitor. 4) Win + R › `%LOCALAPPDATA%\\DasodiLives` › borra la carpeta. 5) Opcional, en OBS: Herramientas › Configuración del servidor WebSocket › desactívalo.',
          check: 'Tras reiniciar no aparece ningún proceso de DasodiLives y la carpeta no existe.',
          copy: '%LOCALAPPDATA%\\DasodiLives' },
        { id: 'fondo-7', t: 'Cierra la puerta en Discord',
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
      title: 'Resumen de avance',
      desc: 'Qué está hecho, qué se descartó y qué falta, nivel por nivel. Se arma solo con lo que marquen en el checklist.',
      summary: true,
      items: []
    },
    {
      title: 'Mapa de Ajustes del servidor',
      desc: 'Para qué sirve cada sección de Ajustes del servidor, en el orden en que aparecen (versión de Discord de octubre de 2026). Se abre con clic en el nombre del server › **Ajustes del servidor**.',
      items: [
        { q: 'Perfil de servidor', a: 'La «carta de presentación» de {S}: nombre, ícono (512 × 512 px o más), cartel de color, descripción, **Rasgos** (hasta 5 etiquetas que describen el server, como «Pelea» o «Streams») y **Juegos jugados**. También tiene **Perfil privado**, que limita quién ve estos datos. Es lo que se ve al abrir una invitación.' },
        { q: 'Etiqueta del servidor', a: 'La etiqueta de hasta **4 caracteres**, con insignia y color, que los miembros pueden mostrar junto a su nombre en todo Discord. Al tocarla, otros ven el perfil de {S}. Se desbloquea con **3 mejoras** y se configura aquí; cada miembro la activa en su perfil.' },
        { q: 'Interacción', a: 'El **canal de mensajes del sistema** (donde sale «¡Miren quién llegó!»), las **notificaciones predeterminadas** para los miembros nuevos (recomendado: **Solo @menciones**, para que nadie silencie el server por ruido) y el **canal de inactividad**, al que se mueve a quien se queda sin hablar en voz.' },
        { q: 'Ventajas de mejora', a: 'Qué desbloquea cada nivel de mejoras (boosts): más espacios de emojis, stickers y sonidos, mejor audio en voz, cartel del server, etiqueta del server, estilos de rol con degradado y más.' },
        { q: 'Emojis, Stickers y Panel de sonidos', a: 'La sección **Expresión**. Ahí se suben los emojis, stickers y sonidos propios. Los pasos, medidas y límites están en el nivel **Expresiones**.' },
        { q: 'Miembros', a: 'La lista de todos los miembros, con sus roles y fecha de entrada. Desde aquí se asignan roles, se expulsa o se banea, se revisan solicitudes de entrada (si usan «Solicitar unirse») y el owner puede **Transferir propiedad**.' },
        { q: 'Roles', a: 'Crear, ordenar y dar permisos a los roles. El orden de la lista es la jerarquía: un rol solo maneja a los que están debajo. Todo el detalle está en el nivel **Roles y jerarquía**.' },
        { q: 'Invitaciones', a: 'Todos los enlaces de invitación activos: quién los creó, cuántos usos llevan y cuándo caducan. Aquí se borra un enlace usado para spam y está el botón **Pausar invitaciones** para emergencias.' },
        { q: 'Acceso', a: 'Cómo puede entrar la gente: **Solo con invitación** (recomendado para {S}), **Solicitar unirse** (llenan un formulario y un Administrador aprueba o rechaza) o **Descubrible** (aparece en la búsqueda pública de Discord).' },
        { q: 'Integraciones', a: 'Los **webhooks** de cada canal, los **bots y apps** instalados (desde aquí se quitan) y las cuentas conectadas, como YouTube o Twitch, para dar roles a suscriptores o miembros.' },
        { q: 'Directorio de apps', a: 'La tienda oficial de apps y bots de Discord. Es una forma segura de encontrar e instalar bots verificados.' },
        { q: 'Configuración de seguridad', a: 'Nivel de verificación, filtro de contenido explícito, 2FA obligatorio para moderar y acciones de emergencia como pausar invitaciones o mensajes directos durante un raid.' },
        { q: 'Registro de auditoría', a: 'El historial de lo que hizo cada quien: quién creó o borró un canal, cambió un rol, expulsó o baneó. Es lo primero que se revisa si algo cambió sin aviso.' },
        { q: 'Baneos', a: 'La lista de cuentas baneadas y el motivo. Desde aquí se quita un baneo.' },
        { q: 'AutoMod', a: 'El moderador automático de Discord: bloquea spam, menciones masivas y palabras antes de que se publiquen. Los pasos están en el nivel **Seguridad**.' },
        { q: 'Activa la comunidad', a: 'Mientras Comunidad no esté activa, aparece esta opción. Al activarla se desbloquean el Onboarding, los canales de {T:Anuncios} y {T:Foro}, y la sección Comunidad (incluida **Presencia web**). Pasos en el nivel **Activar Comunidad**.' },
        { q: 'Plantilla del servidor', a: 'Un respaldo de la estructura: roles, permisos, canales y ajustes, sin mensajes ni miembros. Sirve para reconstruir {S} si algo sale muy mal. Pasos en el nivel **Seguridad**.' },
        { q: 'Eliminar servidor', a: 'Solo el owner lo ve. Borra {S} por completo y **no se puede deshacer**: ni Discord lo recupera.' },
        { q: 'Novedad de noviembre de 2026: presencia web', a: 'A partir del 16 de noviembre de 2026, los servers **Descubribles** tienen una página web pública que puede incluir resúmenes con IA de canales públicos. {S} no se ve afectado si su Acceso es **Solo con invitación**. Si algún día lo hacen descubrible, revisen **Comunidad › Presencia web** para decidir qué se muestra.' }
      ]
    },
    {
      title: 'Guía para Administradores',
      desc: 'Cómo moderar con criterio parejo, para que todos los Administradores apliquen las reglas igual.',
      items: [
        { q: 'La escalera de sanciones', a: '1) Aviso amable en el chat o por mensaje. 2) **Aislar temporalmente** 10 minutos. 3) Aislar 1 hora o 1 día. 4) **Expulsar** (puede volver a entrar con invitación). 5) **Banear** (no puede volver). Spam, contenido ilegal o raids saltan directo a banear.' },
        { q: 'Antes de sancionar', a: 'Lee el contexto completo, no solo el último mensaje. Si estás enojado o involucrado en la discusión, pídele a otro Administrador que lo atienda.' },
        { q: 'Deja registro', a: 'Al aislar, expulsar o banear, escribe siempre el **motivo** en la ventana de la sanción: queda en el Registro de auditoría y los demás saben qué pasó.' },
        { q: 'Durante un directo', a: 'En #chat-en-vivo actúen rápido y en silencio: borra el mensaje y aísla, sin discutir en el chat. Las aclaraciones van por mensaje privado.' },
        { q: 'Lo que un Administrador no hace', a: 'No cambia roles, canales ni permisos del server sin acordarlo con el owner. No comparte capturas de canales privados. No usa sus permisos en discusiones personales.' },
        { q: 'Cuando no sepas qué hacer', a: 'Aísla temporalmente para frenar el problema y avisa al owner. Siempre se puede quitar un aislamiento; un baneo injusto deja mal sabor.' }
      ]
    },
    {
      title: 'Mantenimiento mensual',
      desc: 'Diez minutos al mes para que nada falle en pleno directo.',
      items: [
        { q: 'Revisa los registros', a: 'Da una pasada a #logs y al Registro de auditoría. Busca cambios que nadie recuerde haber hecho.' },
        { q: 'Prueba la alerta de directo', a: 'Haz un directo corto de prueba (puede ser no listado). Si no sale la alerta, revisa `%LOCALAPPDATA%\\DasodiLives\\logs\\monitor.log` en la PC del streamer.' },
        { q: 'Revisa los bots', a: 'Comprueba que la bienvenida, los registros y la música siguen funcionando. Quita los bots que ya no usen.' },
        { q: 'Revisa quién tiene permisos', a: 'En Ajustes › Roles, revisa quién tiene Administradores. Si alguien ya no modera, quítale el rol.' },
        { q: 'Sincroniza la plantilla', a: 'Si cambiaron roles o canales: Ajustes › Plantilla del servidor › **Sincronizar plantilla**.' },
        { q: 'Exporta el progreso del manual', a: 'En el Checklist general, toca **Exportar progreso** y guarda el archivo. Si cambian de PC o navegador, lo importan y no pierden nada.' }
      ]
    },
    {
      title: 'Reglas (plantilla)',
      desc: 'Una base lista para pegar en #reglas. Ajústenla a su gusto.',
      items: [
        { q: 'Plantilla completa',
          a: 'Toca Copiar y pégala en #reglas. Las reglas cortas se leen; las largas no.',
          copy: '📜 REGLAS DE {S}\n\n1. Respeto ante todo. Nada de insultos, acoso ni discriminación.\n2. Sin spam ni autopromoción sin permiso de los Administradores.\n3. Nada de contenido NSFW, gore ni ilegal.\n4. Cada tema en su canal: clips en #clips, memes en #memes.\n5. En el chat en vivo, sigue las indicaciones del streamer y los Mods.\n6. No compartas datos personales tuyos ni de otros.\n7. Se aplican las Normas de la comunidad de Discord: discord.com/guidelines\n\nRomper las reglas puede llevar a aislamiento, expulsión o baneo. ¡Diviértete!' },
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
        { q: 'Un Administrador abusa de sus permisos', a: 'Quítale el rol Administradores (clic derecho › Roles) y revisa el Registro de auditoría para deshacer lo que hizo.' },
        { q: 'El owner no está disponible', a: 'El Administrador de confianza acordado frena el problema (pausar invitaciones, aislar, banear) y deja todo anotado con motivos. Los cambios de estructura esperan al owner.' },
        { q: 'Perdiste acceso a tu cuenta', a: 'Usa tus códigos de respaldo del 2FA para entrar. Sin ellos, contacta al soporte de Discord: dis.gd/contact.' }
      ]
    },
    {
      title: 'Glosario',
      desc: 'Las palabras raras, en simple.',
      items: [
        { q: 'Owner', a: 'El dueño del server. Tiene todos los permisos y no se le pueden quitar.' },
        { q: 'Administradores (rol) vs Administrador (permiso)', a: '**Administradores** es el nombre del rol de quienes moderan {S}. **Administrador** es un permiso de Discord que da control total. En este manual, el rol Administradores **no** lleva ese permiso.' },
        { q: 'Mejoras (boosts)', a: 'Suscripciones que los miembros regalan al server. Al juntar 2, 7 o 14, el server sube de nivel y desbloquea ventajas.' },
        { q: 'Expresiones', a: 'Los emojis, stickers y sonidos propios del server.' },
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
