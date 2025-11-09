
import { GoogleGenAI } from "@google/genai";
import type { SimulationData } from '../App';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getInterpretation(data: SimulationData): Promise<string> {
  const prompt = `
    Actúa como un experto en bienestar digital y neurociencia. Basado en los siguientes datos de un simulador sobre el uso de redes sociales, proporciona una interpretación clara, concisa y un consejo práctico. Formatea la respuesta en Markdown.

    Datos del Usuario:
    - Tiempo diario en redes sociales: ${data.timeOnSocialMedia.toFixed(1)} horas
    - Frecuencia de notificaciones: ${data.notificationFrequency} por hora
    
    Resultados Biométricos Simulados:
    - Horas de sueño: ${data.sleep.toFixed(1)} horas
    - Nivel de cortisol (estrés): ${data.cortisol.toFixed(1)} (rango normal: 2-4)
    - Nivel de dopamina (recompensa): ${data.dopamine.toFixed(1)} (rango normal: 2-5)
    - Nivel de serotonina (bienestar): ${data.serotonin.toFixed(1)} (rango normal: 4-7)
    - Nivel de endorfinas (placer): ${data.endorphin.toFixed(1)} (rango normal: 2-4)
    - Nivel de oxitocina (vínculo social): ${data.oxytocin.toFixed(1)} (rango normal: 4-6)
    - Nivel de concentración: ${data.concentration.toFixed(1)} (rango óptimo: 7-10)

    Tu tarea:
    1.  **Análisis General:** Comienza con un resumen del estado de bienestar digital y neuroquímico del usuario.
    2.  **Impacto Detallado:** Explica brevemente cómo los niveles de cada métrica (sueño, cortisol, dopamina, serotonina, etc.) se ven afectados por el uso de redes sociales y cómo interactúan entre sí.
    3.  **Consejo Práctico:** Ofrece una recomendación accionable y fácil de seguir para mejorar su bienestar digital.
    4.  **Fuentes:** Utiliza la herramienta de búsqueda para encontrar y citar 1-2 fuentes fiables que respalden tu análisis sobre la relación entre el uso de redes sociales y la salud mental o el sueño.

    Responde en español.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get interpretation from Gemini API.");
  }
}
