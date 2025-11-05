

    // ====================================
    // CONFIGURACIÓN DE AZURE
    // ====================================
    // IMPORTANTE: Reemplaza estos valores con tus credenciales de Azure
    
    const CONFIG = {
      // Language Service (para detección de idioma y sentimiento)
      languageKey: 'Aqui',
      languageEndpoint: 'Aqui',
      
      // Translator Service
      translatorKey: 'Aqui',
      translatorEndpoint: 'Aqui',
      translatorRegion: 'Aui'
    };

    // ====================================
    // 1. DETECTOR DE IDIOMA
    // ====================================
    async function detectLanguage() {
      const text = document.getElementById('languageText').value.trim();
      const resultBox = document.getElementById('languageResult');
      const output = document.getElementById('languageOutput');

      if (!text) {
        alert('Por favor ingresa un texto');
        return;
      }

      try {
        const response = await fetch(`${CONFIG.languageEndpoint}text/analytics/v3.1/languages`, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': CONFIG.languageKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documents: [{ id: '1', text: text }]
          })
        });

        const data = await response.json();
        
        if (data.documents && data.documents[0]) {
          const lang = data.documents[0].detectedLanguage;
          output.innerHTML = `
            <strong>Idioma detectado:</strong> ${lang.name}<br>
            <strong>Código ISO:</strong> ${lang.iso6391Name}<br>
            <strong>Confianza:</strong> ${(lang.confidenceScore * 100).toFixed(1)}%
          `;
          resultBox.classList.add('show');
        }
      } catch (error) {
        output.innerHTML = `<strong style="color: red;">Error:</strong> ${error.message}. Verifica tu clave y endpoint de Azure.`;
        resultBox.classList.add('show');
      }
    }

    // ====================================
    // 2. ANÁLISIS DE SENTIMIENTO
    // ====================================
    async function analyzeSentiment() {
      const text = document.getElementById('sentimentText').value.trim();
      const resultBox = document.getElementById('sentimentResult');
      const output = document.getElementById('sentimentOutput');

      if (!text) {
        alert('Por favor ingresa un texto');
        return;
      }

      try {
        const response = await fetch(`${CONFIG.languageEndpoint}text/analytics/v3.1/sentiment`, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': CONFIG.languageKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documents: [{ id: '1', language: 'es', text: text }]
          })
        });

        const data = await response.json();
        
        if (data.documents && data.documents[0]) {
          const sentiment = data.documents[0];
          const scores = sentiment.confidenceScores;
          
          let emoji = '😐';
          if (sentiment.sentiment === 'positive') emoji = '😊';
          if (sentiment.sentiment === 'negative') emoji = '😞';
          
          output.innerHTML = `
            <strong>Sentimiento general:</strong> ${emoji} ${sentiment.sentiment.toUpperCase()}<br><br>
            <strong>Confianza por sentimiento:</strong><br>
            Positivo: ${(scores.positive * 100).toFixed(1)}%<br>
            Neutral: ${(scores.neutral * 100).toFixed(1)}%<br>
            Negativo: ${(scores.negative * 100).toFixed(1)}%
          `;
          resultBox.classList.add('show');
        }
      } catch (error) {
        output.innerHTML = `<strong style="color: red;">Error:</strong> ${error.message}. Verifica tu configuración de Azure.`;
        resultBox.classList.add('show');
      }
    }

    // ====================================
    // 3. TRADUCTOR
    // ====================================
    async function translateText() {
      const text = document.getElementById('translateText').value.trim();
      const targetLang = document.getElementById('targetLanguage').value;
      const resultBox = document.getElementById('translateResult');
      const output = document.getElementById('translateOutput');

      if (!text) {
        alert('Por favor ingresa un texto');
        return;
      }

      try {
        const response = await fetch(`${CONFIG.translatorEndpoint}translate?api-version=3.0&to=${targetLang}`, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': CONFIG.translatorKey,
            'Ocp-Apim-Subscription-Region': CONFIG.translatorRegion,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([{ text: text }])
        });

        const data = await response.json();
        
        if (data[0] && data[0].translations) {
          const translation = data[0].translations[0];
          output.innerHTML = `
            <strong>Texto original:</strong><br>${text}<br><br>
            <strong>Traducción (${translation.to}):</strong><br>${translation.text}
          `;
          resultBox.classList.add('show');
        }
      } catch (error) {
        output.innerHTML = `<strong style="color: red;">Error:</strong> ${error.message}. Verifica tu configuración del traductor.`;
        resultBox.classList.add('show');
      }
    }