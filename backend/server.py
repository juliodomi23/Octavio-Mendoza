from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ── Models ──────────────────────────────────────────────────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    tags: List[str]
    read_time: int
    author: str
    created_at: str
    image_url: Optional[str] = None


# ── Seed data ────────────────────────────────────────────────────────────────

SEED_POSTS = [
    {
        "id": "1",
        "slug": "cambios-fiscales-2026",
        "title": "Cambios fiscales 2026: Lo que todo empresario debe saber",
        "excerpt": "El SAT implementó modificaciones importantes para personas físicas y morales este año. Conoce las obligaciones clave que no puedes ignorar.",
        "category": "Para Empresarios",
        "tags": ["fiscal", "SAT", "2026", "declaraciones"],
        "read_time": 5,
        "author": "CP Octavio Mendoza",
        "created_at": "2026-05-15T10:00:00Z",
        "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
        "content": """## Cambios fiscales 2026: Lo que todo empresario debe saber

El año 2026 trajo consigo importantes modificaciones en materia fiscal que impactan directamente a personas físicas y morales con actividad empresarial en México. Mantenerse actualizado es fundamental para evitar sanciones y aprovechar los beneficios disponibles.

### 1. Actualización de la Resolución Miscelánea Fiscal (RMF)

La RMF 2026 incorpora cambios en la emisión del CFDI 4.0, reforzando los requisitos de información del receptor y del domicilio fiscal. Toda factura emitida debe incluir el régimen fiscal del cliente, de lo contrario puede ser rechazada por el SAT.

**Lo que debes hacer:** Verifica que tu sistema de facturación esté actualizado a CFDI 4.0 y que cuentes con los datos completos de tus clientes.

### 2. Buzón Tributario obligatorio para todos

A partir de 2026, el Buzón Tributario es de uso obligatorio para TODAS las personas físicas que tributen bajo cualquier régimen. Las notificaciones del SAT llegan exclusivamente por esta vía.

**Acción inmediata:** Activa tu Buzón Tributario en el portal del SAT (sat.gob.mx) y configura al menos un medio de contacto (email o teléfono).

### 3. Régimen Simplificado de Confianza (RESICO): Cambios importantes

El RESICO continúa siendo atractivo, pero hay ajustes en los límites de ingresos y en las actividades permitidas. Algunos contribuyentes podrían verse obligados a cambiar de régimen.

### 4. Deducibilidad de gastos con CFDI

Recuerda que para deducir un gasto, el CFDI debe:
- Estar emitido a tu RFC correcto
- Incluir tu régimen fiscal
- Tener la forma de pago correcta (PUE o PPD)
- Estar relacionado directamente con tu actividad

### 5. Pagos provisionales y declaraciones anuales

Los pagos provisionales deben realizarse a más tardar el día 17 del mes siguiente. La declaración anual de personas físicas vence el 30 de abril; la de personas morales, el 31 de marzo.

---

**¿Tienes dudas sobre cómo aplican estos cambios a tu empresa?**

Contáctanos para una asesoría personalizada. Con más de 22 años de experiencia, te acompañamos en cada obligación fiscal.""",
    },
    {
        "id": "2",
        "slug": "que-es-pld-y-por-que-es-obligatorio",
        "title": "¿Qué es la Prevención de Lavado de Dinero (PLD) y por qué es obligatorio?",
        "excerpt": "La PLD no es opcional: sujetos obligados que no implementan controles enfrentan multas millonarias. Descubre qué implica y cómo cumplir.",
        "category": "Para Fiscalistas",
        "tags": ["PLD", "lavado de dinero", "GAFI", "cumplimiento"],
        "read_time": 7,
        "author": "PCPLDA Octavio Mendoza",
        "created_at": "2026-04-20T09:00:00Z",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
        "content": """## ¿Qué es la Prevención de Lavado de Dinero (PLD) y por qué es obligatorio?

El lavado de dinero es el proceso mediante el cual recursos de origen ilícito se introducen al sistema financiero formal para parecer legítimos. México, como miembro del Grupo de Acción Financiera Internacional (GAFI), está obligado a implementar controles robustos para combatirlo.

### ¿Quiénes son "sujetos obligados"?

La Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI) establece que ciertas actividades son consideradas "vulnerables" y sus titulares son sujetos obligados. Entre ellas:

- **Notarios y fedatarios públicos**
- **Contadores, abogados y auditores** que realizan ciertas actividades
- **Inmobiliarias y desarrolladoras**
- **Joyerías, casas de empeño y antigüedades**
- **Aduaneros y agentes de carga**
- **Casas de cambio y transferencias de fondos**
- **Comercio de vehículos y maquinaria**

### Obligaciones del sujeto obligado

Si tu actividad es considerada vulnerable, debes:

1. **Registrarte ante la SHCP** en el Sistema del Portal PLD
2. **Elaborar un Manual de PLD** con políticas y procedimientos
3. **Nombrar un Oficial de Cumplimiento**
4. **Identificar a tus clientes** mediante el proceso KYC (Know Your Customer)
5. **Presentar avisos** al SAT cuando detectes operaciones sospechosas o en efectivo superiores a ciertos umbrales
6. **Capacitar a tu personal** periódicamente

### Consecuencias de no cumplir

Las multas por incumplimiento van desde **$1,300,000 hasta $65,000,000 de pesos**, además de la posible inhabilitación para ejercer la actividad. En casos graves, puede haber responsabilidad penal.

### ¿Cómo implementar un programa PLD efectivo?

Un programa efectivo debe incluir:

- Análisis de riesgo de la empresa
- Manual de políticas y procedimientos
- Controles internos operativos
- Capacitación del equipo
- Monitoreo y revisión periódica

---

En **CP y PCPLDA Octavio Mendoza** somos especialistas certificados en PLD. Te ayudamos a implementar tu programa de forma correcta y a mantenerte en cumplimiento. Contáctanos para una evaluación sin costo.""",
    },
    {
        "id": "3",
        "slug": "contabilidad-empresarial-base-decisiones",
        "title": "Contabilidad empresarial: La base para tomar mejores decisiones",
        "excerpt": "Una contabilidad ordenada no es un trámite burocrático; es la herramienta más poderosa para conocer la salud de tu negocio y tomar decisiones estratégicas.",
        "category": "Para Empresarios",
        "tags": ["contabilidad", "estados financieros", "finanzas", "PyME"],
        "read_time": 4,
        "author": "CP Octavio Mendoza",
        "created_at": "2026-03-10T11:00:00Z",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70",
        "content": """## Contabilidad empresarial: La base para tomar mejores decisiones

Muchos empresarios ven la contabilidad como una obligación fiscal más, un gasto necesario para "cumplir con Hacienda". Esta visión limita enormemente el potencial de la información financiera para transformar los resultados del negocio.

### ¿Qué te dice realmente tu contabilidad?

Una contabilidad bien llevada responde preguntas críticas como:

- ¿Estoy ganando o perdiendo dinero de verdad?
- ¿Cuál es el producto o servicio más rentable?
- ¿Cuánto efectivo necesito para operar el próximo mes?
- ¿Puedo pagar mis deudas a tiempo?
- ¿Mis clientes me están pagando a tiempo?

### Los estados financieros básicos que debes entender

**1. Estado de Resultados (P&L)**
Muestra tus ingresos, costos y gastos en un período. Te dice si tu negocio es rentable.

**2. Balance General**
Fotografía de tu empresa en un momento dado. Activos, pasivos y capital. ¿Qué tienes, qué debes y qué es tuyo?

**3. Flujo de Efectivo**
El más olvidado y el más importante para la operación diaria. Muchas empresas "rentables" quiebran por falta de flujo de efectivo.

### Errores comunes que destruyen la contabilidad de una PyME

- **Mezclar finanzas personales con las del negocio**
- **No registrar operaciones en tiempo real** (acumular para "después")
- **Ignorar las depreciaciones y amortizaciones**
- **No conciliar cuentas bancarias mensualmente**
- **Trabajar sin presupuesto**

### Tecnología al servicio de tu contabilidad

En 2026, no hay excusa para llevar la contabilidad en hojas de Excel desactualizadas. Herramientas como CONTPAQi, Aspel o sistemas en la nube te permiten automatizar procesos y tener información en tiempo real.

---

¿Tu contabilidad está realmente al día y siendo aprovechada al máximo? En **CP y PCPLDA Octavio Mendoza** no solo cumplimos con las obligaciones fiscales: transformamos tus números en información estratégica. Contáctanos.""",
    },
    {
        "id": "4",
        "slug": "gobierno-corporativo-estructura-solida",
        "title": "Gobierno Corporativo: Cómo proteger tu empresa con una estructura sólida",
        "excerpt": "El gobierno corporativo no es exclusivo de las grandes corporaciones. Las PyMEs que lo implementan crecen más rápido, acceden mejor al crédito y reducen conflictos internos.",
        "category": "Para Empresarios",
        "tags": ["gobierno corporativo", "estructura", "transparencia", "crecimiento"],
        "read_time": 6,
        "author": "CP Octavio Mendoza",
        "created_at": "2026-02-05T08:00:00Z",
        "image_url": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=70",
        "content": """## Gobierno Corporativo: Cómo proteger tu empresa con una estructura sólida

El gobierno corporativo es el conjunto de reglas, prácticas y procesos mediante los cuales una empresa es dirigida y controlada. Establece la distribución de derechos y responsabilidades entre los diferentes participantes de la corporación.

### ¿Por qué importa en una empresa mediana o pequeña?

La respuesta es simple: **las empresas con buen gobierno corporativo valen más, acceden mejor al crédito y tienen mayor probabilidad de éxito a largo plazo**.

Estadísticas relevantes para México:
- Las PyMEs con estructuras de gobierno formales reducen en un 40% los conflictos entre socios
- Acceden a créditos bancarios con tasas entre 2 y 4 puntos porcentuales menores
- Tienen el doble de probabilidades de atraer socios estratégicos o inversionistas

### Elementos clave de un buen gobierno corporativo

**1. Consejo de Administración o Directivo**
No debe ser solo "de nombre". Sus integrantes deben reunirse periódicamente y tomar decisiones documentadas sobre estrategia, riesgos y cumplimiento.

**2. Código de Ética y Conducta**
Define los valores y comportamientos esperados de todos los miembros de la organización, desde el director hasta el último colaborador.

**3. Políticas y Procedimientos internos**
Procesos claros para: compras, ventas, nómina, gastos de viaje, manejo de efectivo, firma de contratos. La informalidad cuesta caro.

**4. Controles internos**
Mecanismos para prevenir y detectar errores o fraudes: segregación de funciones, autorizaciones, conciliaciones periódicas.

**5. Transparencia y rendición de cuentas**
Informes financieros regulares a los socios o accionistas. Auditorías periódicas. Nada que "solo lo sabe el contador".

### Primer paso: El diagnóstico

Antes de implementar cambios, es necesario conocer el estado actual de la empresa. Un diagnóstico de gobierno corporativo identifica:
- Brechas en estructura organizacional
- Riesgos no gestionados
- Conflictos potenciales entre socios
- Oportunidades de mejora inmediata

---

En **CP y PCPLDA Octavio Mendoza** acompañamos a empresas en la implementación de estructuras de gobierno corporativo adaptadas a su tamaño y necesidades. Agenda una consulta inicial sin costo.""",
    },
]


# ── Routes ───────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "CP y PCPLDA Octavio Mendoza API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(100)
    return posts

@api_router.get("/blog/posts/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post no encontrado")
    return post

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def seed_blog_posts():
    count = await db.blog_posts.count_documents({})
    if count == 0:
        await db.blog_posts.insert_many(SEED_POSTS)
        logger.info(f"Seeded {len(SEED_POSTS)} blog posts")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
