import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Zap, Target } from "lucide-react";

const ExecutiveSummary = () => {
  return (
    <Card className="shadow-card border-0 bg-gradient-secondary">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary animate-pulse-glow" />
            Resumen Ejecutivo con IA
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Actualizado hace 15 min
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Principales Movimientos
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Este mes, tu precio promedio subió un <span className="font-semibold text-success">2%</span>, 
              mientras que la competencia bajó un <span className="font-semibold text-destructive">3%</span>. 
              En el período anterior, ambos subieron un 1%.
            </p>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-warning" />
              Competidor Más Agresivo
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Liquidos.cl</span> ha sido el más agresivo, 
              con <span className="font-semibold text-warning">12 variaciones</span> de precio a la baja, 
              un 50% más que el mes pasado.
            </p>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              Oportunidades Detectadas
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Tu <span className="font-semibold text-foreground">'Coca-Cola 2L'</span> está un 
              <span className="font-semibold text-accent"> 15%</span> por encima del precio más bajo 
              de la competencia (Tottus), pero esta brecha se ha reducido desde el 25% del período anterior.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Badge variant="outline" className="text-success border-success/30">
            ↗ 3 Oportunidades de subida
          </Badge>
          <Badge variant="outline" className="text-warning border-warning/30">
            ⚠ 2 Alertas de precio
          </Badge>
          <Badge variant="outline" className="text-accent border-accent/30">
            🎯 1 Producto en zona óptima
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;