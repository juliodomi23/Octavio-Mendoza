# PRD - Landing Page CP y PCPLDA Octavio Mendoza

## Información del Proyecto
- **Fecha de creación**: 07 de Junio, 2026
- **Tipo**: Landing Page estática - firma de servicios contables y fiscales
- **URL de preview**: https://4555c1c5-2a06-43a7-8740-6d55ccb6e5a8.preview.emergentagent.com
- **Idioma**: Español

## Datos de la Empresa
- **Nombre**: CP y PCPLDA Octavio Mendoza
- **Slogan**: "Excelencia profesional con ética y responsabilidad"
- **Fundación**: Hace 22 años
- **Socios**: 1 (Octavio Mendoza)
- **Especialidad**: Servicios Contables y Fiscales, PLD, Anticorrupción
- **Oficina**: Calle San Jaime No. 3013, Col. Santa Fe, Chiapa de Corzo, Chiapas
- **WhatsApp**: +52 961 177 0435
- **Email**: octaviomendoza1704@gmail.com
- **Redes sociales**: Ninguna
- **Blog**: Próximamente (para empresarios y emprendedores)

## Paleta de Colores
- **Azul profundo (Brand Secondary)**: #1E3A8A (blue-900)
- **Azul cielo (Brand Primary)**: #0284C7 (sky-600)
- **Celeste (Accent)**: #38BDF8 (sky-400)
- **Blanco (Background)**: #FFFFFF
- **Gris claro (Surface)**: #F8FAFC (slate-50)

## Tipografía
- **Headings**: Outfit (Google Fonts)
- **Body**: IBM Plex Sans (Google Fonts)

## Arquitectura
- **Frontend**: React + Tailwind CSS + Framer Motion
- **Backend**: FastAPI + MongoDB (no activo para el landing page)
- **Hosting**: Emergent

## Secciones Implementadas (✅ Completadas)

### 1. Navbar (Navbar.jsx)
- Navbar fija con glassmorphism al hacer scroll
- Logo "OM" con gradiente azul
- Links de navegación: Inicio, Nosotros, Servicios, Precios, Blog, Contacto
- Botón CTA "Agendar Asesoría" con link a WhatsApp
- Menú responsive para móvil

### 2. Hero (Hero.jsx)
- Background image con overlay oscuro azul
- Slogan principal en grande
- Badge animado con ubicación
- Subtítulo descriptivo
- 2 CTAs: WhatsApp y Nuestros Servicios
- Estadísticas: 22+ años, 8 servicios, PLD, 100% compromiso
- Indicador de scroll animado

### 3. Nosotros (About.jsx)
- Layout dos columnas: texto + imagen con badges flotantes
- Historia y descripción de la firma
- Tarjetas de Misión y Propósito
- Contadores animados con Intersection Observer (22+, 8, 1, 1)

### 4. Valores (Values.jsx)
- Grid de 7 valores con iconos Lucide
- Integridad, Cumplimiento, Prevención, Excelencia, Confidencialidad, Capacitación, Compromiso
- Tarjeta CTA al final del grid

### 5. Servicios (Services.jsx)
- 8 tarjetas expandibles con acordeón
- Descripción + detalles al expandir
- Modalidad de pago en cada tarjeta
- CTA general al final

### 6. Precios (Pricing.jsx)
- 6 tarjetas de modalidades de servicio
- PLD destacada como "Más Solicitado"
- Banner de paquetes combinados con descuento

### 7. Blog (BlogSection.jsx)
- Sección "Próximamente" con diseño atractivo
- Tres tópicos preview: Actualizaciones Fiscales, Para Empresarios, Cumplimiento PLD
- Botón de notificación vía WhatsApp

### 8. Contacto (Contact.jsx)
- Tarjetas de contacto: WhatsApp, Email, Teléfono, Dirección, Horario
- Google Maps embebido (Chiapa de Corzo)

### 9. Footer (Footer.jsx)
- Logo y slogan
- Links de navegación
- Links de servicios
- Información de contacto completa
- Copyright 2026

## Actualización - 07 Jun 2026 (v1.1)
- Logo real de Octavio Mendoza Consultor integrado (Navbar + Footer)
- Hero: foto removida → gradiente azul profundo limpio
- About: foto removida → placeholder para foto profesional futura
- Contacto: simplificado a WhatsApp + Teléfono + dirección (sin mapa)
- Admin Panel: al fondo del footer, contraseña `octavio2026`, permite cambiar logo URL
- Contexto global de logo con localStorage (LogoContext.jsx)

## Backlog (P1/P2)

### P1 - Próximas mejoras
- [ ] Logo real cuando esté disponible (reemplazar iniciales "OM")
- [ ] Blog funcional con publicaciones cuando haya contenido
- [ ] Formulario de contacto con envío de email (usando Resend o SendGrid)
- [ ] Animación más elaborada en el contador de estadísticas

### P2 - Mejoras futuras
- [ ] Sección de testimoniales/casos de éxito
- [ ] Versión PDF del catálogo de servicios descargable
- [ ] Chatbot de WhatsApp integrado
- [ ] SEO optimizado (meta tags, OG tags, schema.org)
- [ ] Google Analytics / Hotjar

## Archivos del Proyecto
```
/app/frontend/src/
├── App.js                              # Router principal
├── App.css                             # CSS global
├── index.css                           # CSS con fonts + variables
├── pages/
│   └── LandingPage.jsx                 # Ensamblador de secciones
└── components/
    └── landing/
        ├── Navbar.jsx                   # Navegación fija
        ├── Hero.jsx                     # Sección hero
        ├── About.jsx                    # Quiénes somos + stats
        ├── Values.jsx                   # Valores corporativos
        ├── Services.jsx                 # 8 servicios expandibles
        ├── Pricing.jsx                  # Modalidades de precios
        ├── BlogSection.jsx              # Blog próximamente
        ├── Contact.jsx                  # Contacto + mapa
        └── Footer.jsx                   # Pie de página
```
