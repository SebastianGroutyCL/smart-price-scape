import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, FileText, Download, Share } from "lucide-react";

interface AIReportProps {
  selectedProduct?: any;
  filters?: any;
}

const AIReport = ({ selectedProduct, filters }: AIReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [reportType, setReportType] = useState<"general" | "product">("general");

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (selectedProduct && reportType === "product") {
      setReport(`## Análisis de Inteligencia de Precios: ${selectedProduct.name}

### Resumen Ejecutivo
Basado en el análisis de los últimos 30 días, **${selectedProduct.name}** (SKU: ${selectedProduct.sku}) presenta una oportunidad significativa de optimización de precios.

### Hallazgos Clave

**1. Posicionamiento de Precio**
- Tu precio actual (${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(selectedProduct.myPrice)}) está un **${selectedProduct.diffVsMin.toFixed(1)}%** por encima del precio más bajo del mercado
- El competidor más agresivo es **${selectedProduct.cheapestCompetitor}** con ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(selectedProduct.marketMin)}
- El precio promedio del mercado es ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(selectedProduct.marketAverage)}

**2. Actividad Competitiva**
- Se han registrado **${selectedProduct.priceChanges} cambios de precio** en el período analizado
- La volatilidad del mercado es **moderada-alta**, indicando un entorno competitivo activo
- Tottus ha mostrado la mayor agresividad con 3 reducciones de precio en las últimas 2 semanas

**3. Oportunidades Identificadas**

🔴 **Riesgo Alto**: Tu diferencia del +${selectedProduct.diffVsMin.toFixed(1)}% vs. el mínimo puede estar afectando la competitividad
🟡 **Oportunidad**: Ajustar precio a $2,200 mantendría rentabilidad mientras mejora posición competitiva
🟢 **Fortaleza**: Tu precio está dentro del rango "premium acceptado" vs. promedio de mercado

### Recomendaciones Estratégicas

**Acción Inmediata (0-7 días)**
- Considerar ajuste de precio a $2,200 (-10.2%) para mejorar competitividad
- Monitorear respuesta de Tottus ante cambios de precios en categoría

**Estrategia de Mediano Plazo (1-4 semanas)**
- Implementar precios dinámicos basados en movimientos de Tottus y Jumbo
- Evaluar promociones específicas durante fines de semana

**Monitoreo Continuo**
- Alertas automáticas si la diferencia vs. mínimo supera el 20%
- Tracking semanal de market share en categoría bebidas

### Impacto Proyectado
- **Ajuste sugerido**: Reducción de 10.2% → Posición mejorada del 4to al 2do lugar
- **Volumen esperado**: Incremento estimado del 15-20% en ventas
- **ROI**: Compensación de margen con volumen en 3-4 semanas`);
    } else {
      setReport(`## Reporte Ejecutivo de Inteligencia de Precios

### Resumen del Período
**Análisis de los últimos 30 días vs. período anterior**

### Panorama General del Mercado

**Tendencias de Precios**
- **Inflación promedio del sector**: +2.3% vs período anterior
- **Competidor más agresivo**: Líquidos.cl con 47 cambios de precio
- **Mayor volatilidad**: Categoría bebidas (+18% variaciones)

### Análisis por Categoría

**🥤 Bebidas (67% del portafolio monitoreado)**
- Precio promedio mercado: $2,150 (-3.2% vs período anterior)
- Tu posición promedio: 15% por encima del mínimo
- Oportunidad principal: Coca-Cola 2L y Sprite 1.5L

**🍪 Snacks (23% del portafolio)**
- Mercado estable, variaciones <5%
- Buena posición competitiva en la mayoría de SKUs
- Papas Fritas: revisar pricing vs. Jumbo

**🥛 Lácteos (10% del portafolio)**
- Inflación sectorial del 8.5%
- Oportunidad de subir precios siguiendo tendencia del mercado

### Alertas y Oportunidades

**🔴 Alertas Críticas (Acción Inmediata)**
- **Coca-Cola 2L**: Diferencia del 25.6% vs mínimo → Riesgo alto de pérdida de share
- **Agua Mineral 1.5L**: Tottus bajó 15% hace 48hrs → Evaluar respuesta

**🟡 Oportunidades de Optimización**
- **15 SKUs** pueden subir precio 5-8% sin perder posición competitiva
- **Fin de semana**: Ventana para ajustes sin exposición máxima

**🟢 Fortalezas a Mantener**
- **Fanta Naranja**: Posición premium bien valorada por consumidor
- **Snacks premium**: Diferenciación exitosa vs competencia

### Impacto en el Negocio

**Revenue Impact**
- **Oportunidad de ingresos**: $2.3M CLP adicionales con optimizaciones sugeridas
- **Risk mitigation**: $890K CLP protegidos con ajustes defensivos

**Competitividad**
- **Market position**: Del 3er al 2do lugar en 8 categorías clave
- **Price perception**: Mejora del índice de competitividad del 78% al 85%

### Recomendaciones Estratégicas

**Esta Semana**
1. Ajustar Coca-Cola 2L a $2,200 (máximo)
2. Evaluar respuesta defensiva en Agua Mineral
3. Aprovechar subidas en 6 SKUs de snacks

**Próximas 2-4 Semanas**
1. Implementar alertas automáticas para diferencias >20%
2. Evaluar pricing dinámico en top 20 SKUs
3. Análisis de elasticidad en categoría bebidas

**Estrategia de Mediano Plazo**
1. Desarrollar algoritmo de precio óptimo por SKU
2. Integrar datos de market share para validar estrategia
3. Establecer KPIs de competitividad por categoría`);
    }
    
    setIsGenerating(false);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Panel de Reporte Ejecutivo con IA
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={reportType === "general" ? "default" : "outline"}
              size="sm"
              onClick={() => setReportType("general")}
            >
              Reporte General
            </Button>
            <Button
              variant={reportType === "product" ? "default" : "outline"}
              size="sm"
              onClick={() => setReportType("product")}
              disabled={!selectedProduct}
            >
              Análisis de Producto
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controles de generación */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <p className="font-medium">
              {reportType === "general" 
                ? "Generar Análisis General del Portfolio" 
                : selectedProduct 
                  ? `Analizar: ${selectedProduct.name}`
                  : "Selecciona un producto para análisis específico"
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {reportType === "general"
                ? "Análisis completo basado en filtros actuales y tendencias del mercado"
                : "Análisis detallado del producto seleccionado con recomendaciones específicas"
              }
            </p>
          </div>
          <Button
            onClick={generateReport}
            disabled={isGenerating || (reportType === "product" && !selectedProduct)}
            className="bg-gradient-primary min-w-32"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generar Análisis
              </>
            )}
          </Button>
        </div>

        {/* Área del reporte */}
        {report ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <FileText className="h-3 w-3" />
                  Reporte Generado
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {new Date().toLocaleDateString('es-CL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none bg-card border rounded-lg p-6">
              <div 
                className="whitespace-pre-wrap text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: report
                    .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-6 mb-3 text-foreground">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/🔴 \*\*(.*?)\*\*/g, '<span class="inline-flex items-center gap-1 text-destructive font-semibold">🔴 $1</span>')
                    .replace(/🟡 \*\*(.*?)\*\*/g, '<span class="inline-flex items-center gap-1 text-warning font-semibold">🟡 $1</span>')
                    .replace(/🟢 \*\*(.*?)\*\*/g, '<span class="inline-flex items-center gap-1 text-success font-semibold">🟢 $1</span>')
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Haz clic en "Generar Análisis" para crear un reporte con insights accionables</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIReport;