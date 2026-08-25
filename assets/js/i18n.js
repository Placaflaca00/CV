/* =============================================================================
   Bilingual EN/ES toggle — vanilla JS, no dependencies.
   English lives in the HTML (source of truth); this file holds the Spanish
   strings. Elements opt in with data-i18n="key"; the original English markup
   is cached on the element the first time we swap, so toggling back is exact.
   ========================================================================== */
(function () {
  "use strict";

  var STORE = "site-lang";
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- Spanish dictionary (innerHTML per data-i18n key) ------------------- */
  var ES = {
    /* Shared chrome */
    "skip": "Saltar al contenido",
    "nav.about": "<i>01</i> Sobre mí",
    "nav.stack": "<i>04</i> Stack",
    "nav.work": "<i>03</i> Proyectos",
    "nav.exp": "<i>02</i> Experiencia",
    "nav.contact": "<i>05</i> Contacto",
    "status.open": '<span class="status__dot" aria-hidden="true"></span> Abierto a ofertas',
    "status.avail": '<span class="status__dot" aria-hidden="true"></span> Disponible para trabajar',
    "foot.note": 'Diseñado y programado por Mohamad — <span data-year>2026</span>.',
    "foot.top": 'Volver arriba <svg class="ico" aria-hidden="true"><use href="#ui-arrow-up"/></svg>',
    "back.all": '<svg class="ico" aria-hidden="true"><use href="#ui-arrow-left"/></svg> Todos los proyectos',
    "back.btn": '<svg class="ico" aria-hidden="true"><use href="#ui-arrow-left"/></svg> Volver a los proyectos',
    "back.exp": '<svg class="ico" aria-hidden="true"><use href="#ui-arrow-left"/></svg> Toda la experiencia',
    "back.expbtn": '<svg class="ico" aria-hidden="true"><use href="#ui-arrow-left"/></svg> Volver a experiencia',
    "ov.h2": "Resumen",
    "res.h2": "Resultados",
    "gh.src": '<svg class="brand-ico" aria-hidden="true"><use href="#ti-github"/></svg> Código en GitHub',
    "tag.synth": "Datos sintéticos",
    "tag.research": "Investigación",
    "work.read": 'Leer caso de estudio <svg class="ico" aria-hidden="true"><use href="#ui-arrow-up-right"/></svg>',

    /* ------------------------------ index ------------------------------- */
    "ix.title": "Mohamad Kassem Moussa — Ingeniero ML / MLOps",
    "ix.hero.eyebrow": "Ingeniero ML / MLOps · Paraguay",
    "ix.hero.title": '<span class="line">Construyo sistemas ML</span><span class="line">que <span class="grad-text">no se caen</span>&nbsp;—</span><span class="line">no solo dan buen score.</span>',
    "ix.hero.lead": 'Soy <b>Mohamad</b> — entreno modelos donde todavía no existen los datos, y los mantengo funcionando una vez que salen: ONNX en <b>AWS Lambda</b>, CI/CD y ciclo de reentrenamiento. Me importa lo que pasa <b>después</b> de que el modelo converge — latencia, costo, drift.',
    "ix.hero.cta1": 'Ver mi trabajo <svg class="ico" aria-hidden="true"><use href="#ui-arrow-down"/></svg>',
    "ix.hero.cta2": 'Currículum <svg class="ico" aria-hidden="true"><use href="#ui-external"/></svg>',
    "ix.hero.avail": '<span class="status__dot" aria-hidden="true"></span> Actualmente buscando trabajo — busco roles de ML Engineer',
    "ix.hero.scroll": 'Desliza <svg class="ico" aria-hidden="true"><use href="#ui-arrow-down"/></svg>',
    "ix.term.comment": "// lo que estoy construyendo ahora",
    "ix.about.h2": "Sobre mí",
    "ix.about.p1": 'Diseño y construyo sistemas de machine learning: <strong>pipelines de datos sintéticos</strong> que eliminan cuellos de botella de etiquetado, y <strong>endpoints de inferencia serverless</strong> que se monitorean y reentrenan solos. Que el modelo converja es la parte fácil; a mí me importa lo que viene después.',
    "ix.about.p2": 'Con una beca de investigación en <strong>Itaipu Parquetec</strong> desarrollé un <a class="ulink" href="transmission-cv.html">proyecto de inspección con drones para Itaipú</a> — un dataset sintético de 50 mil imágenes y pipelines de segmentación con Detectron2 + SAM2. En <a class="ulink" href="atacado-connect.html">Atacado Connect</a> llevé a producción un asistente de ventas con LLM como ingeniero de IA. Mis proyectos propios también corren en producción: un <a class="ulink" href="conocetuave.html">clasificador de cantos de aves en AWS Lambda</a> y una CNN multitarea para <a class="ulink" href="xrd-thesis.html">identificación de fases por XRD</a>.',
    "ix.about.p3": '<strong>Actualmente estoy buscando trabajo.</strong> Lo que más quiero hacer es ML engineering; en IA aplicada ya tengo experiencia llevando cosas a producción.',
    "ix.facts": '<div><dt>Ubicación</dt><dd>Ciudad del Este, Paraguay (GMT&minus;3) · Abierto a remoto</dd></div><div><dt>Enfoque</dt><dd>MLOps · Visión por computadora · Datos sintéticos</dd></div><div><dt>Actualmente</dt><dd><span class="grad-text">Buscando mi próximo trabajo</span></dd></div><div><dt>Herramientas</dt><dd>PyTorch · ONNX · AWS · Docker</dd></div><div><dt>Estado</dt><dd><span class="ok">●</span> Abierto a roles de ML / IA</dd></div>',
    "ix.skills.intro": "Empiezo por lo que la mayoría de los portfolios de ML omite: llevar los modelos a producción y mantenerlos ahí. Este es el stack con el que realmente trabajo.",
    "ix.sk1": "Serving y despliegue",
    "ix.sk2": "Cloud y MLOps",
    "ix.sk3": "ML y deep learning",
    "ix.sk4": "Datos y demos",
    "ix.stack.title": "Stack de todos los días",
    "ix.work.h2": "Proyectos destacados",
    "ix.p1.eyebrow": "Destacado · MLOps · 2026",
    "ix.p1.title": "ConoceTuAve — Clasificador de cantos de aves en producción",
    "ix.p1.desc": 'Un clasificador de cantos de aves <b>desplegado de punta a punta en AWS Lambda</b> (ONNX, ECR + API Gateway) con <b>CI/CD por OIDC</b>, monitoreo en CloudWatch y un ciclo de reentrenamiento con consentimiento. <b>94.6%</b> de accuracy top-1, <b>+9.8pp</b> sobre una línea base justa de BirdNET.',
    "ix.p1.tag": "Audio → 20 especies",
    "ix.p2.eyebrow": "Destacado · Visión por computadora · 2024–2026",
    "ix.p2.title": "CV con drones — Detección de componentes en líneas de transmisión",
    "ix.p2.desc": 'Un sistema de <b>segmentación de instancias de 18 clases</b> (SAM2 + Detectron2) que detecta herrajes eléctricos en imágenes de dron — <b>70.1%</b> de box mAP, entrenado con un <b>dataset sintético de 50 mil imágenes</b> con máscaras autogeneradas. Pasantía de investigación en Itaipu Parquetec.',
    "ix.p2.tag": "CV con drones · 18 clases",
    "ix.p3.eyebrow": "Destacado · Tesis · 2025",
    "ix.p3.title": "Identificación de fases por XRD — Tesis de deep learning",
    "ix.p3.desc": 'Una CNN 1D multitarea que lee un patrón de difracción de rayos X y predice compuesto, sistema cristalino y parámetros de celda — <b>~89%</b> de accuracy de compuesto, entrenada <b>solo con espectros sintéticos</b> (cero dependencia de datos reales). Publicada como app de Streamlit.',
    "ix.exp.h2": "Experiencia",
    "ix.e0.role": 'Ingeniero de IA <span class="at">@ <a class="ulink" href="atacado-connect.html">Atacado Connect</a></span>',
    "ix.e0.list": '<li>Llevé a <b>producción un asistente de ventas interno con LLM</b> para un equipo comercial mayorista — búsqueda en lenguaje natural sobre un catálogo de <b>22.400 productos</b>, respondiendo con SKU, precio y stock reales.</li><li>Hice fine-tuning de <b>Qwen3-8B con QLoRA</b> sobre 2.172 trayectorias curadas de uso de herramientas: un benchmark de 60 casos reservados pasó de <b>88,3% a 95,0%</b> sin fallos críticos.</li><li>Serví el modelo yo mismo en <b>vLLM</b> (FP8, prefix caching) sobre una sola RTX 5090 —<b>p50 de 2,2s</b> en 309 turnos de producción— y construí el gate de despliegue que <b>bloqueó 2 de 5 versiones</b> antes de producción.</li>',
    "ix.e0.cta": "Leer el caso de estudio &rarr;",
    "ix.e1.role": 'Becario en IA / Visión por Computadora <span class="at">@ Itaipu Parquetec</span>',
    "ix.e1.list": '<li>Desarrollé un <b>proyecto de inspección de líneas de transmisión con drones para Itaipú</b>, sobre un dataset sintético de <b>50 mil imágenes</b> con máscaras de instancia autogeneradas con Detectron2 + SAM2 — sin anotación manual píxel a píxel a escala.</li><li>Hice fine-tuning de un modelo de segmentación de instancias de 18 clases hasta <b>70.1% de box mAP</b> / 64.5% de mask mAP en un set reservado de 10 mil imágenes.</li><li>Prototipé un motor de georreferenciación (GPS y orientación del dron) y una herramienta de anotación basada en SAM2 para imágenes y video.</li>',
    "ix.e1.cta": "Leer el caso de estudio &rarr;",
    "ix.e2.role": 'Ingeniería de Sistemas <span class="at">@ Facultad Politécnica, UNE</span>',
    "ix.e2.list": '<li>Tesis de grado: <b>identificación automática de fases cristalinas por XRD</b> con deep learning — <a class="ulink" href="xrd-thesis.html">ver caso de estudio</a>.</li><li>Enfoque en machine learning, visión por computadora e ingeniería de datos aplicada.</li>',
    "ix.cert.h2": "Certificaciones",
    "ix.cert.verify": "Verificar en Certiport",
    "ix.cert.hint": "Un click — el enlace lleva el código, así que responde la base de datos de Certiport al entrar: no hay formulario que llenar. La miniatura es el certificado.",
    "ix.c.eyebrow": '<span class="tnum">05</span> &middot; ¿Qué sigue?',
    "ix.c.title": "Pongamos un modelo en producción.",
    "ix.c.lead": 'Actualmente estoy buscando trabajo — sobre todo roles de ML Engineer. La forma más rápida de contactarme es por email; suelo responder en el día.',
    "ix.c.btn": '<svg class="ico" aria-hidden="true"><use href="#ui-mail"/></svg> Hablemos',
    "contact.copy": "Copiar",
    "ix.foot.built": "Hecho desde cero con HTML, CSS y JS vanilla.",

    /* --------------------------- conocetuave ----------------------------- */
    "cb.title": "ConoceTuAve — Caso de estudio · Mohamad",
    "cb.eyebrow": "Caso de estudio · ML en producción y MLOps",
    "cb.h1": 'ConoceTuAve — un clasificador <span class="grad-text">regional de cantos de aves</span>',
    "cb.lead": 'Un clasificador de audio de dos etapas para <b>20 especies de aves paraguayas</b> — embeddings congelados de BirdNET&nbsp;V2.4 hacia una cabeza con fine-tuning — llevado hasta producción en AWS Lambda, con demo pública y un pipeline de reentrenamiento con revisión humana.',
    "cb.meta": '<div><dt>Año</dt><dd class="tnum">2026</dd></div><div><dt>Tipo</dt><dd>Proyecto personal · MLOps de punta a punta</dd></div><div><dt>Rol</dt><dd>Solo — datos, modelo e infra</dd></div><div><dt>Stack</dt><dd>PyTorch Lightning · ONNX · AWS Lambda</dd></div>',
    "cb.try": '<svg class="ico" aria-hidden="true"><use href="#ui-play"/></svg> Probar la app',
    "cb.points": '<li><b>Construí un clasificador de audio de dos etapas</b> (embeddings 1024-d congelados de BirdNET&nbsp;V2.4 → cabeza MLP con fine-tuning) para <b>20 especies de aves paraguayas</b>, alcanzando <b>94.6% / 81.3%</b> de accuracy top-1 en los sets de prueba limpio / difícil fuera de distribución (559 clips reservados, cero solapamiento train/test).</li><li><b>Superé por +8–10pp de accuracy balanceada a una línea base justa de BirdNET</b> con el mismo espacio de etiquetas, en ambas particiones — recuperando especies regionales raras (ñandú, Pipile, <i>Calidris canutus</i>) que BirdNET no logra separar ni siquiera restringido a las mismas 20 clases.</li><li><b>Desplegué a producción como AWS Lambda en contenedor</b> (ECR + API Gateway HTTP API) sirviendo inferencia en <b>~128 ms</b> / <b>~1.15 s</b> de punta a punta, con predicciones bit a bit idénticas a local (cero drift de contenedorización).</li><li><b>Ingenié el ciclo completo datos → modelo → servicio:</b> QA de audio automatizado, auditoría de ruido de etiquetas contrastada con BirdNET como oráculo externo, export a ONNX, CI/CD con GitHub Actions (OIDC), monitoreo en CloudWatch y una demo pública en Gradio sobre HuggingFace Spaces.</li><li><b>Endurecí la confiabilidad:</b> mitigación de cold starts (precalentamiento con EventBridge + reintentos del cliente), validación de entrada anti-abuso de 4 capas, y un ciclo de feedback DynamoDB → S3 con consentimiento que alimenta un pipeline de reentrenamiento con revisión humana.</li>',
    "cb.head": '<div class="kick">ML en producción · MLOps · Paraguay</div><h1 class="title">ConoceTuAve — un clasificador <em>regional de cantos de aves</em></h1><p class="sub">Clasificador de audio de dos etapas: embeddings congelados de <b>BirdNET&nbsp;V2.4</b> &rarr; una cabeza MLP con fine-tuning sobre <b>20 especies paraguayas</b>, desplegado en AWS Lambda. Comparado contra una <b>línea base justa de BirdNET con el mismo espacio de etiquetas</b> (sus logits restringidos a las mismas 20 clases) &mdash; no solo el modelo de fábrica.</p>',
    "cb.grid": '<div class="card acc"><div class="v">94.6<span>%</span></div><div class="l">Accuracy top-1<br>test limpio (n=351)</div></div><div class="card acc"><div class="v">81.3<span>%</span></div><div class="l">Accuracy top-1<br>difícil / OOD (n=208)</div></div><div class="card edge"><div class="v">+9.8<span>pp</span></div><div class="l">Mejora de acc. balanceada vs.<br>línea base justa de BirdNET</div></div><div class="card "><div class="v">559<span></span></div><div class="l">Clips reservados<br>0 solapamiento train/test</div></div>',
    "cb.b1h": "Mano a mano &middot; test difícil",
    "cb.b1n": "Resultado por especie vs. la línea base justa en las 20 especies (partición difícil / OOD).",
    "cb.h2h": '<div class="win"><div class="n">7</div><div class="k">gana la cabeza</div></div><div class="tie"><div class="n">9</div><div class="k">empates</div></div><div class="loss"><div class="n">4</div><div class="k">gana la base</div></div>',
    "cb.honest": 'Mi peor caso, dicho de entrada: el <b>chorlo gris</b> <span class="mono">(Pluvialis squatarola)</span> en audio difícil &mdash; la cabeza con fine-tuning logra <b>67%</b> vs. 93% de la línea base. Limitación conocida, la próxima en la lista de mejoras.',
    "cb.b2h": "Recuperando especies regionales raras &middot; test difícil",
    "cb.b2n": "Donde gana la cabeza está todo el punto del proyecto: especies sudamericanas que BirdNET no puede separar <i>ni siquiera restringido</i> al espacio de etiquetas correcto.",
    "cb.legend": '<span><i class="bn"></i>BirdNET (línea base justa)</span><span><i class="pp"></i>cabeza con fine-tuning</span>',
    "cb.sp1": "Ñandú",
    "cb.sp2": "Jabirú",
    "cb.sp4": "Playero rojizo",
    "cb.footnote": '559 clips reservados · IC del 95% ±<b>5.3pp</b> (difícil) · lo por-especie es orientativo (n pequeño en clases raras)',
    "cb.foot.built": "Caso de estudio · Clasificador de cantos ConoceTuAve.",
    "cb.calls.h2": "Escuchalo funcionar",
    "cb.calls.intro": "Cinco grabaciones reales de la suite de smoke tests del proyecto — los mismos clips que CI reproduce en cada deploy. Cada uno muestra lo que el modelo desplegado devolvió para ese archivo, de mayor a menor confianza.",
    "cb.calls.top1": "top-1 del modelo",
    "cb.calls.audio": "Audio",
    "cb.calls.photo": "Foto",
    "cb.n.toco": "Tucán toco",
    "cb.n.chaja": "Chajá",
    "cb.n.paloma": "Paloma doméstica",
    "cb.n.jabiru": "Jabirú",
    "cb.n.nandu": "Ñandú",
    "cb.calls.note": 'Las cinco son predicciones top-1 correctas, registradas por la suite de smoke tests contra el checkpoint <span class="mono">wa-drop3-v1</span> (macro-F1 de validación 0.909). El ñandú es el caso honesto: especie correcta, pero apenas <b>65%</b> de confianza sobre una grabación de campo de 87 segundos. Grabaciones de <a href="https://xeno-canto.org" target="_blank" rel="noopener">xeno-canto</a> vía GBIF; fotos de colaboradores de iNaturalist — cada una bajo la licencia indicada, reutilizadas aquí sin fines comerciales y con atribución.',

    /* -------------------------- transmission-cv --------------------------- */
    "pt.title": "CV con drones en líneas de transmisión — Caso de estudio · Mohamad",
    "pt.eyebrow": "Caso de estudio · Visión por computadora · Pasantía de investigación",
    "pt.h1": '<span class="grad-text">Detección de componentes</span> en líneas de alta tensión con drones',
    "pt.lead": 'Un sistema de <b>segmentación de instancias de 18 clases</b> (SAM2 de Meta + Detectron2) que detecta y geolocaliza herrajes eléctricos en líneas de alta tensión a partir de imágenes de dron — entrenado con un <b>dataset sintético con máscaras autogeneradas</b>, en Itaipu Parquetec.',
    "pt.meta": '<div><dt>Año</dt><dd class="tnum">2024 — 2026</dd></div><div><dt>Tipo</dt><dd>Pasantía de investigación · Itaipu Parquetec</dd></div><div><dt>Rol</dt><dd>Pasante de investigación ML / CV</dd></div><div><dt>Stack</dt><dd>SAM2 · Detectron2 · PyTorch</dd></div>',
    "pt.points": '<li><b>Investigué y seleccioné el stack de modelos</b> (SAM2 de Meta + Detectron2) para un sistema automatizado con drones que detecta y geolocaliza componentes eléctricos en líneas de transmisión de alta tensión.</li><li><b>Ingenié un pipeline de generación de datos sintéticos</b> que compone instancias de componentes con máscaras de segmentación autogeneradas, produciendo un <b>dataset de 50 mil imágenes</b> (40K train / 10K test) — eliminando la anotación manual píxel a píxel a escala.</li><li><b>Hice fine-tuning de un modelo Detectron2 de segmentación de instancias de 18 clases</b> sobre el set sintético, alcanzando <b>70.1% de box mAP</b> (84.1% AP50) y <b>64.5% de mask mAP</b> en un set de prueba reservado de 10 mil imágenes.</li><li><b>Construí una herramienta interactiva de anotación basada en SAM2</b> para imágenes y video, para arrancar el flujo inicial de etiquetado.</li><li><b>Diseñé y prototipé el motor de georreferenciación:</b> a partir del GPS del dron DJI y sus metadatos de orientación localiza cada componente detectado y resuelve su línea de transmisión y el vano torre a torre (5–7 conductores por vano). El frontend/backend de producción lo construyó el equipo de ingeniería.</li>',
    "pt.shots.h2": "Detecciones de muestra",
    "pt.shots.intro": "Salida real del modelo sobre imágenes de campo reservadas — máscaras de instancia y cajas de detección dibujadas por el modelo Detectron2 con fine-tuning sobre fotos de dron de líneas de transmisión en servicio.",
    "pt.fig1": '<b>Espaçador</b> (espaciador) — máscara de instancia + caja de detección en un vano multiconductor.',
    "pt.fig2": '<b>Conector</b> — 99% de confianza donde una grapa une conductores que se cruzan.',
    "pt.fig3": '<b>Connector2</b> — 99% de confianza, segmentación de instancias sobre un conductor simple.',
    "pt.head": '<div class="kick">Visión por computadora · Itaipu Parquetec</div><h1 class="title"><em>Detección de componentes</em> en líneas<br>de alta tensión, con drones</h1><p class="sub">Un sistema de <b>segmentación de instancias de 18 clases</b> (Meta <b>SAM2</b> + <b>Detectron2</b>) que detecta y segmenta herrajes eléctricos en líneas de alta tensión desde imágenes de dron, con fine-tuning sobre un <b>dataset sintético con máscaras autogeneradas</b>.</p>',
    "pt.grid": '<div class="card acc"><div class="v">70.1<span>%</span></div><div class="l">Box mAP<br>IoU 0.50:0.95</div></div><div class="card acc"><div class="v">64.5<span>%</span></div><div class="l">Mask mAP<br>segmentación de instancias</div></div><div class="card edge"><div class="v">50K<span></span></div><div class="l">Dataset sintético<br>máscaras autogeneradas</div></div><div class="card "><div class="v">18<span></span></div><div class="l">Clases de componentes<br>detectadas + segmentadas</div></div>',
    "pt.b1h": "Precisión de detección por umbral de IoU",
    "pt.b1n": "mAP estilo COCO para detección (caja) y segmentación de instancias (máscara), sobre un set de prueba sintético reservado de 10 mil imágenes.",
    "pt.legend": '<span><i class="box"></i>caja delimitadora</span><span><i class="msk"></i>máscara de segmentación</span>',
    "pt.b2h": "Pipeline de datos",
    "pt.b2n": "La escasez de etiquetas se resolvió generando datos de entrenamiento con máscaras creadas automáticamente &mdash; sin anotación manual píxel a píxel a escala.",
    "pt.flow": '<div class="node"><div class="nt">Base · imágenes reales</div><div class="nv">1,006 <small>imágenes anotadas → 2,895 aumentadas</small></div></div><div class="arrow">▼</div><div class="node mid"><div class="nt">Generación sintética · auto-máscaras</div><div class="nv">instancias compuestas + máscaras píxel-perfect</div></div><div class="arrow">▼</div><div class="node"><div class="nt">Dataset de fine-tuning</div><div class="nv">50K <small>imágenes — 40K train / 10K test</small></div></div>',
    "pt.cls": "18 clases de componentes",
    "pt.chip.dji": "Metadatos geoespaciales DJI",
    "pt.footnote": 'evaluado en <b>10 mil imágenes sintéticas reservadas</b> · la validación en campo la lleva el equipo de ingeniería de producción',
    "pt.foot.built": "Caso de estudio · CV con drones en líneas de transmisión.",

    /* -------------------------- atacado-connect --------------------------- */
    "ac.title": "Asistente de ventas con LLM en Atacado Connect — Caso de estudio · Mohamad",
    "ac.eyebrow": "Caso de estudio · Ingeniero de IA · E-commerce mayorista",
    "ac.h1": 'Un asistente de ventas con LLM, <span class="grad-text">en producción</span> en un piso de ventas mayorista',
    "ac.lead": 'Dos meses en <b>Atacado Connect</b> como único ingeniero de IA: un asistente interno que entiende al vendedor en lenguaje natural — <i>«el cliente quiere algo gamer entre 200 y 300»</i> — y responde <b>solo con productos reales</b>, cada uno con su SKU, precio y stock. Un <b>Qwen3-8B fine-tuneado</b> servido por mí en una sola RTX&nbsp;5090, búsqueda léxica sobre un catálogo de <b>~20 mil SKUs</b>, y el sistema de evaluación que aprobaba cada release — incluidas las dos versiones que rechazó.',
    "ac.brandmeta": '<b>Ingeniero de IA</b><br />Jun — Jul 2026 · Paraguay',
    "ac.meta": '<div><dt>Año</dt><dd class="tnum">2026</dd></div><div><dt>Tipo</dt><dd>Ingeniero de IA · contrato de 2 meses</dd></div><div><dt>Rol</dt><dd>Autor único — datos, búsqueda, fine-tuning, serving, app</dd></div><div><dt>Stack</dt><dd>Qwen3-8B · QLoRA · vLLM · FastAPI · SQLite</dd></div>',
    "ac.points": '<li><b>Llevé a producción un agente de ventas con LLM</b> para un equipo comercial mayorista — búsqueda en lenguaje natural sobre un catálogo de <b>22.400 productos</b>, respondiendo con SKUs, precios y stock reales, sin inventar nunca un producto ni una fecha de llegada.</li><li><b>Fine-tuning de Qwen3-8B con QLoRA</b> (LoRA r=32; <b>87M de parámetros entrenables, el 1,05%</b> del modelo) sobre <b>2.172 trayectorias curadas multi-turno con uso de herramientas</b>, subiendo un benchmark de 60 casos reservados de <b>88,3% a 95,0% sin fallos críticos</b> — y reduciendo la dependencia del andamiaje, la brecha entre el agente con guardias y el modelo pelado, <b>de 21,6 a 6,7 puntos</b>.</li><li><b>Construí el gate de despliegue</b> — 60 casos reservados sobre 17 dimensiones, correctores 100% mecánicos, ponderación por fallo crítico y <b>aborto automático si un caso se filtró al entrenamiento</b> — y lo corrí sobre cinco versiones fine-tuneadas. <b>Bloqueó dos de mis propios modelos</b>, con el análisis causal que justifica cada decisión.</li><li><b>Diseñé un benchmark de búsqueda auto-verificable</b>: <b>26.594 consultas generadas sobre 8.605 productos</b>, donde el propio producto es la verdad de referencia — cero anotación humana, unos <b>4 dólares</b> de costo.</li><li><b>Serví el modelo yo mismo en vLLM</b> (FP8, prefix caching, contexto de 16K) en una sola RTX 5090: <b>p50 de 2,2s punta a punta a 128,7 tok/s</b> en 309 turnos reales de producción, y <b>80 loops de agente concurrentes a 2,71 q/s sin un solo error</b> en pruebas de carga.</li><li><b>Autor único de todo el stack</b> — limpieza de datos, motor de búsqueda, pipeline de fine-tuning, serving, backend y frontend: <b>278 commits y ~60 mil líneas escritas a mano en siete semanas</b>, con 23 scripts de test offline y ~600 aserciones.</li>',
    "ac.proj.h2": "Dos productos",
    "ac.p1.status": "En producción",
    "ac.p1.title": "Asistente interno para el piso de ventas",
    "ac.p1.desc": 'Un chat que los vendedores usan con el cliente en la línea. Lee el pedido en español o portugués, busca en el catálogo en vivo y responde <b>solo con productos reales</b> — SKU, precio y stock en cada renglón.',
    "ac.p1.feat": '<li>Loop de agente con uso de herramientas, agnóstico del proveedor — el mismo código corre contra el modelo local o contra una API frontier, que es lo único que hace honesta la comparación.</li><li><b>16 guardias de respuesta con nombre</b> revisan la respuesta ya escrita contra lo que las herramientas realmente devolvieron: SKUs inventados, precios copiados de otro producto, recomendaciones sin stock.</li><li>Búsqueda léxica (SQLite FTS5/BM25) con filtros determinísticos por atributo para RAM, almacenamiento, pulgadas y batería.</li><li>Respuestas en streaming, panel de administración, cola de revisión y una radiografía paso a paso del pipeline interno para depurar.</li>',
    "ac.p1.foot": "Desplegado en un equipo de ~70 vendedores · 56 lo usaron · pico de 28 en un día",
    "ac.p2.status": "Construido · sin desplegar",
    "ac.p2.title": "Buscador con IA para la tienda pública",
    "ac.p2.desc": 'La versión de cara al cliente del mismo cerebro: escribís <i>«quiero un notebook»</i> en el sitio público y devuelve fichas de producto reales en vez de una página de resultados por palabra clave. Construido sobre el <b>mismo modelo fine-tuneado y el mismo motor de búsqueda</b> que el asistente interno.',
    "ac.p2.feat": '<li>Búsqueda en lenguaje natural que devuelve fichas de producto, no una lista de links.</li><li>Comparación lado a lado de dos productos y sus características.</li><li>Agregar al carrito y guardar en favoritos, directo desde la respuesta.</li><li>Links para compartir un producto o el carrito entero.</li><li>Entrada por voz — un Whisper large-v3-turbo compartiendo la misma GPU que el modelo de lenguaje.</li>',
    "ac.p2.foot": "Terminado y entregado · no salió a producción durante el contrato",
    "ac.grid": '<div class="card acc"><div class="v">95,0<span>%</span></div><div class="l">Benchmark reservado<br>0 fallos críticos</div></div><div class="card acc"><div class="v">96,0<span>%</span></div><div class="l">Recall real de búsqueda<br>25.787 consultas juzgadas</div></div><div class="card edge"><div class="v">2,2<span>s</span></div><div class="l">p50 en producción<br>309 turnos reales</div></div><div class="card"><div class="v">80<span></span></div><div class="l">Loops concurrentes<br>0 errores, prueba de carga</div></div>',
    "ac.b1h": "El gate de despliegue",
    "ac.b1n": 'Cada versión fine-tuneada corrió los mismos 60 casos reservados en dos modos: dentro del agente con guardias, y como <b>modelo pelado sin andamiaje</b>. Un solo fallo crítico — un SKU inventado, negar una venta con stock real, un jailbreak que cae — marca la versión como no apta sin importar su puntaje.',
    "ac.legend": '<span><i class="ag"></i>dentro del agente</span><span><i class="bare"></i>modelo pelado</span>',
    "ac.gate": '<div class="grow"><span class="gv">ft-v1</span><div class="gbars"><div class="gbar"><div class="gtrack"><div class="gfill ag" style="--w:88.3%"></div></div><span class="gnum">88,3</span></div><div class="gbar"><div class="gtrack"><div class="gfill bare" style="--w:66.7%"></div></div><span class="gnum">66,7</span></div></div><span class="gverdict">3 críticos</span></div><div class="grow"><span class="gv">ft-v2</span><div class="gbars"><div class="gbar"><div class="gtrack"><div class="gfill ag" style="--w:88.3%"></div></div><span class="gnum">88,3</span></div><div class="gbar"><div class="gtrack"><div class="gfill bare" style="--w:70.0%"></div></div><span class="gnum">70,0</span></div></div><span class="gverdict">2 críticos</span></div><div class="grow pass"><span class="gv">ft-v3</span><div class="gbars"><div class="gbar"><div class="gtrack"><div class="gfill ag" style="--w:95.0%"></div></div><span class="gnum">95,0</span></div><div class="gbar"><div class="gtrack"><div class="gfill bare" style="--w:88.3%"></div></div><span class="gnum">88,3</span></div></div><span class="gverdict">desplegado</span></div><div class="grow"><span class="gv">ft-v4</span><div class="gbars"><div class="gbar"><div class="gtrack"><div class="gfill ag" style="--w:90.0%"></div></div><span class="gnum">90,0</span></div><div class="gbar"><div class="gtrack"><div class="gfill bare" style="--w:90.0%"></div></div><span class="gnum">90,0</span></div></div><span class="gverdict">bloqueado</span></div><div class="grow"><span class="gv">ft-v4.1</span><div class="gbars"><div class="gbar"><div class="gtrack"><div class="gfill ag" style="--w:90.0%"></div></div><span class="gnum">90,0</span></div><div class="gbar"><div class="gtrack"><div class="gfill bare" style="--w:85.0%"></div></div><span class="gnum">85,0</span></div></div><span class="gverdict">bloqueado</span></div>',
    "ac.b2h": "Cuando el bug era la métrica",
    "ac.b2n": 'Mi banco de búsqueda reportaba <b>90,7% de recall</b> y casi me paso una semana arreglando el motor. En vez de eso audité el instrumento: un <b>juez LLM ciego</b> que ve la consulta y los productos devueltos pero <b>nunca la etiqueta esperada</b> — porque la etiqueta era justo lo que yo sospechaba que estaba mal.',
    "ac.flow": '<div class="node"><div class="nt">El banco reportaba</div><div class="nv">90,7% <small>de recall — 2.396 fallos declarados</small></div></div><div class="arrow">▼</div><div class="node mid"><div class="nt">Juez ciego · etiqueta oculta</div><div class="nv"><b>1.286 de 2.396 fallos (54%) eran falsos</b><small> — un motor correcto castigado por una taxonomía vieja</small></div></div><div class="arrow">▼</div><div class="node"><div class="nt">Recall real</div><div class="nv">96,0% <small>sobre 25.787 consultas evaluadas</small></div></div>',
    "ac.footnote": 'benchmark n=60 reservados, corrido en dos modos · el recall es sobre un banco <b>sintético</b>, no sobre tráfico de producción etiquetado',
    "ac.notes.h2": "Lo que realmente aprendí",
    "ac.notes.intro": 'La mayoría de los resultados de los que estoy más orgulloso son negativos, y medidos. Cada uno de estos es una decisión de <i>no</i> desplegar algo, respaldada por un número.',
    "ac.n1": '<dt>Bloqueé dos de mis propios modelos</dt><dd>Las versiones 4 y 4.1 puntuaban mejor <b>como modelos sueltos</b> y peor <b>dentro del agente de producción</b>, con una regresión repetible de jailbreak en portugués. Ese patrón me dijo que la palanca «mezclar y reentrenar» estaba agotada, no mal calibrada — así que escribí por qué en vez de desplegar un número más alto.</dd>',
    "ac.n2": '<dt>Maté una función antes de construirla</dt><dd>Calculé primero el techo de un re-ranker neuronal: <b>+0,3 puntos</b>. <b>El 96% de los fallos no tenía el producto correcto en ningún lugar del top-50</b> — era un problema de recall, no de ranking. El re-ranker nunca se construyó.</dd>',
    "ac.n3": '<dt>Corrí GRPO y falló — con números</dt><dd>120 pasos, 7,6M de tokens: <b>el 85,8% de los pasos tuvo varianza de reward cero</b>, o sea que no había gradiente de política en absoluto, con el 53,7% de las completions cortadas y un KL de referencia distinto de cero que delataba la política de referencia equivocada. Aguas arriba, un screening de 665 prompts mostró que <b>el 66,9% ya salía bien 8 de 8 veces</b> — el entrenamiento supervisado había saturado la señal que el RL necesitaba. Frené el pipeline en su compuerta de datos en vez de gastar GPU.</dd>',
    "ac.n4": '<dt>Los embeddings fueron un «no» medido</dt><dd>Corrí <code>multilingual-e5-large</code> (1024 dim) sobre <b>ONNX, sin PyTorch</b>, y recomendé no adoptarlo. El espacio vectorial agrupa por <b>marca al 95%</b> (18% por azar — ×5,3) pero por <b>RAM solo al 59%</b> (34% por azar — ×1,7): organiza por fabricante, no por especificación. Sobre specs numéricas exactas llegaba a <b>50% de precisión@10 contra el 100%</b> del filtro determinístico que ya tenía. También demostré que <b>no hacía falta una base vectorial</b>: buscar en 22.427 vectores toma <b>2,2&nbsp;ms con numpy</b>. Sin FAISS, sin Chroma.</dd>',
    "ac.n5": '<dt>El cuello de botella real era la adopción, no el modelo</dt><dd>Instrumentar las guardias me dijo algo que no quería escuchar: <b>6 votos humanos sobre 327 respuestas</b>. Con esa poca señal no podía saber si algún cambio ayudaba, así que dejé de desplegar cambios de modelo y lo dije. Saber que una métrica es demasiado fina para actuar sobre ella vale más que otro punto de benchmark.</dd>',
    "ac.cn.h2": "Con qué trabajé",
    "ac.cn.intro": "Todo lo de abajo es algo que el código realmente usa o mide — no es una lista de lecturas.",
    "ac.cn.g1h": "LLMs y entrenamiento",
    "ac.cn.g1": '<li>Atención en Transformers</li><li>QLoRA / rank del LoRA / ratio de parámetros entrenables</li><li>Enmascarado de labels (<code>train_on_responses_only</code>) y su verificación</li><li>Paridad de chat template entre entrenar y servir</li><li>Rejection sampling (RFT / STaR)</li><li>LLM como juez, con separación generador&nbsp;&ne;&nbsp;juez</li><li>Chequeos de contaminación train/test</li><li>GRPO, KTO, DAPO</li><li>Varianza de reward y política de referencia del KL</li>',
    "ac.cn.g2h": "Serving e inferencia",
    "ac.cn.g2": '<li>vLLM</li><li>Continuous batching</li><li>PagedAttention</li><li>Prefix caching</li><li>Dimensionado de KV cache</li><li>Cuantización FP8 y 4-bit</li><li>CUDA graphs contra eager</li><li>Control de concurrencia</li>',
    "ac.cn.g3h": "Búsqueda",
    "ac.cn.g3": '<li>BM25 / FTS5 con pesos por columna</li><li>Filtros determinísticos por atributo</li><li>Embeddings — coherencia de clusters, PCA / dimensionalidad efectiva</li><li>RAG</li><li>CAG (cache-augmented generation)</li><li>Tool calling</li><li>Salida estructurada / decodificación restringida</li>',
    "ac.cn.g4h": "Evaluación",
    "ac.cn.g4": '<li>Benchmarks auto-verificables</li><li>Jueces ciegos</li><li>Bootstrap pareado e intervalos de confianza al 95%</li><li>Test de McNemar</li><li>Gates de despliegue con severidad ponderada</li>',
    "ac.src.h2": "Código",
    "ac.src.intro": 'El catálogo, los precios, los historiales de chat y los pesos del modelo de la empresa son suyos y no se publican. Lo que sí es público es una <b>plantilla saneada y reutilizable</b> del sistema que construí — el loop del agente, las guardias, el motor de búsqueda, el pipeline completo de fine-tuning y evaluación, y los post-mortems — sin ningún rastro de datos reales.',
    "ac.foot.built": "Caso de estudio · Asistente de ventas con LLM en Atacado Connect.",

    /* ----------------------------- xrd-thesis ----------------------------- */
    "xr.title": "Identificación de fases por XRD — Caso de estudio · Mohamad",
    "xr.eyebrow": "Caso de estudio · Tesis de grado",
    "xr.h1": 'Identificación automática de <span class="grad-text">fases cristalinas</span> a partir de patrones XRD',
    "xr.lead": 'Una única red neuronal que lee un patrón de difracción de rayos X en crudo e identifica el material de un solo paso — su <b>compuesto</b>, <b>sistema cristalino</b> y <b>geometría de celda unitaria</b> — entrenada íntegramente con datos sintéticos.',
    "xr.meta": '<div><dt>Año</dt><dd class="tnum">2025</dd></div><div><dt>Tipo</dt><dd>Tesis de grado</dd></div><div><dt>Rol</dt><dd>Solo — datos, modelo y app</dd></div><div><dt>Stack</dt><dd>TensorFlow · PyMatGen · Streamlit</dd></div>',
    "xr.try": '<svg class="ico" aria-hidden="true"><use href="#ui-play"/></svg> Probar la app de Streamlit',
    "xr.points": '<li><b>Construí una CNN 1D multitarea</b> que predice compuesto químico, sistema cristalino y parámetros de celda unitaria a partir de un único patrón de difracción de rayos X — alcanzando <b>89% de accuracy de compuesto</b> (18 clases) y <b>98% de accuracy de sistema cristalino</b> (6 clases) sobre <b>94 muestras de prueba reservadas, sin fuga de datos</b>.</li><li><b>Ingenié un dataset de entrenamiento totalmente sintético</b> para superar la escasez de datos etiquetados: difractogramas simulados desde archivos cristalográficos CIF con <b>PyMatGen</b> (ley de Bragg + factores de estructura), escalando <b>317 patrones base a ~2,000</b> con un pipeline de aumentado específico del dominio — corrimiento angular, ensanchamiento de picos, deriva de línea base y ruido gaussiano.</li><li><b>Diagnostiqué y eliminé muestras mal etiquetadas</b> (Fe₂O₃ marcado como cúbico en vez de su verdadera fase trigonal) que corrompían los límites de clase y deprimían la accuracy — una auditoría manual de ruido de etiquetas que mejoró los resultados de forma material.</li><li><b>Unifiqué cabezas de clasificación y regresión</b> con pesos de pérdida enmascarados por tarea (longitudes de celda <b>~0.38&nbsp;Å de MAE</b>, monoclínico <b>β ~2.0°</b>), y publiqué una <b>app de Streamlit</b> interactiva con confianzas por tarea en tiempo real.</li>',
    "xr.head": '<div class="kick">Tesis de grado &middot; Deep Learning</div><h1 class="title">Identificación automática de <em>fases cristalinas</em><br>a partir de patrones XRD</h1><p class="sub">Una CNN 1D multitarea que predice compuesto químico, sistema cristalino y parámetros de celda unitaria desde un único patrón de difracción de rayos X &mdash; entrenada con <b>difractogramas sintéticos</b> simulados desde archivos CIF cristalográficos (radiación Cu&nbsp;K&alpha;). Evaluada en <b>94 muestras reservadas</b> sin fuga de datos.</p>',
    "xr.grid": '<div class="card acc"><div class="v">89.4<span>%</span></div><div class="l">Accuracy de compuesto<br>18 clases</div></div>\n            <div class="card acc"><div class="v">97.9<span>%</span></div><div class="l">Accuracy de sistema cristalino<br>6 clases</div></div>\n            <div class="card"><div class="v">0.38<span>Å</span></div><div class="l">MAE de longitud de celda<br>cabeza de regresión</div></div>\n            <div class="card"><div class="v">97<span>%</span></div><div class="l">Confianza media<br>de predicción</div></div>',
    "xr.b1h": "Accuracy por sistema cristalino",
    "xr.bar1": "cúbico",
    "xr.bar4": "monoclínico",
    "xr.bar5": "ortorrómbico",
    "xr.b2h": "Parámetros de celda: predicho vs. real",
    "xr.figA": 'parámetro&nbsp;<b>a</b>',
    "xr.figB": 'parámetro&nbsp;<b>b</b>',
    "xr.figC": 'parámetro&nbsp;<b>c</b>',
    "xr.chip.cnn": "CNN 1D · multitarea",
    "xr.footnote": 'línea punteada = <b>predicción perfecta</b> (y = x)',
    "xr.foot.built": "Caso de estudio · Identificación de fases por XRD."
  };

  /* --- Spanish hrefs (data-i18n-href) ------------------------------------
     The English href lives in the HTML; this is the Spanish counterpart.
     Used for the CV button: EN page -> English PDF, ES page -> Spanish PDF. */
  var HREF_ES = {
    "cv.pdf": "assets/cv/Mohamad-Kassem-Moussa-CV-ES.pdf"
  };

  /* --- Spanish aria-labels (data-i18n-aria) ------------------------------ */
  var ARIA_ES = {
    "aria.menu": "Abrir menú",
    "aria.resume": "Abrir currículum (PDF)",
    "aria.copy": "Copiar dirección de email",
    "aria.zoom": "Abrir imagen a tamaño completo",
    "aria.playCall": "Reproducir el canto",
    "aria.zoomCert": "Abrir el certificado a tamaño completo",
    "aria.verify": "Verificar esta credencial en Certiport",
    "aria.copyCode": "Copiar el código de la credencial",
    "aria.seek": "Buscar en el audio",
    "aria.lightboxClose": "Cerrar imagen"
  };

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);

    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (el.__en === undefined) el.__en = el.innerHTML;
      if (lang === "es") {
        if (ES[key] !== undefined) el.innerHTML = ES[key];
      } else {
        el.innerHTML = el.__en;
      }
    });

    $$("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (el.__enAria === undefined) el.__enAria = el.getAttribute("aria-label") || "";
      if (lang === "es") {
        if (ARIA_ES[key] !== undefined) el.setAttribute("aria-label", ARIA_ES[key]);
      } else {
        el.setAttribute("aria-label", el.__enAria);
      }
    });

    $$("[data-i18n-href]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-href");
      if (el.__enHref === undefined) el.__enHref = el.getAttribute("href") || "";
      if (lang === "es" && HREF_ES[key] !== undefined) {
        el.setAttribute("href", HREF_ES[key]);
      } else {
        el.setAttribute("href", el.__enHref);
      }
    });

    $$(".lang-toggle").forEach(function (btn) {
      btn.classList.toggle("is-es", lang === "es");
      btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    });

    try { localStorage.setItem(STORE, lang); } catch (e) { /* private mode */ }
  }

  function saved() {
    try { return localStorage.getItem(STORE) === "es" ? "es" : "en"; } catch (e) { return "en"; }
  }

  function init() {
    if (saved() === "es") apply("es");
    $$(".lang-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(document.documentElement.lang === "es" ? "en" : "es");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
