# PsiCo Bot - Servicios Azure AI

> Plataforma web con servicios de inteligencia artificial de Microsoft Azure

---

## Descripción

Aplicación web que integra **4 servicios de Azure AI**:

1. **Chatbot** - Asistente conversacional (Azure Bot Service)
2. **Detector de Idioma** - Identifica +120 idiomas (Language Service)
3. **Análisis de Sentimiento** - Clasifica: positivo/negativo/neutral (Language Service)
4. **Traductor** - Traduce a 9 idiomas (Translator Service)

---

## Estructura del Proyecto

```
servicioazure/
├── index.html              # Página principal con los 4 servicios
├── assets/
│   ├── css/
│   │   └── index.css      # Estilos responsive
│   └── js/
│       └── index.js       # Lógica + configuración Azure
```

**index.html**: Estructura HTML con chatbot iframe y formularios para los 3 servicios  
**index.css**: Diseño responsive con gradientes y animaciones  
**index.js**: Funciones `detectLanguage()`, `analyzeSentiment()`, `translateText()` + configuración de claves Azure

---

## Configuración

### 1. Configurar en `assets/js/index.js`

```javascript
const CONFIG = {
  languageKey: 'TU_CLAVE_LANGUAGE',
  languageEndpoint: 'https://tu-recurso.cognitiveservices.azure.com/',
  translatorKey: 'TU_CLAVE_TRANSLATOR',
  translatorEndpoint: 'https://api.cognitive.microsofttranslator.com/',
  translatorRegion: 'brazilsouth'
};
```
---

## Tecnologías

**Frontend**: HTML5, CSS3, JavaScript ES6+  
**Azure**: Language Service, Translator Service, Bot Service  
**Diseño**: Responsive (desktop/tablet/mobile)

---
## 📌 Evidencia del Curso AI-900

**Curso completado:** AI-900-T00 - Introducción a la inteligencia artificial en Azure

[Evidencia 01 del curso AI-900](assets/img/evidencia1.png)

[Evidencia 02 del curso AI-900](assets/img/evidencia2.png)

> **Nota:** Esta evidencia se agrega como complemento al informe del proyecto.
