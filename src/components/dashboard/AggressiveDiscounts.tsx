import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, ExternalLink } from "lucide-react";

const AggressiveDiscounts = () => {
  const discounts = [
    {
      id: 1,
      product: "Coca-Cola 2L",
      competitor: "Tottus",
      oldPrice: 2890,
      newPrice: 2650,
      discount: -8.4,
      date: "hace 2 horas",
      severity: "high",
      url: "https://tottus.cl/producto/coca-cola-2l",
    },
    {
      id: 2,
      product: "Sprite 1.5L", 
      competitor: "Líquidos.cl",
      oldPrice: 1990,
      newPrice: 1790,
      discount: -10.1,
      date: "hace 4 horas",
      severity: "critical",
      url: "https://liquidos.cl/sprite-15l",
    },
    {
      id: 3,
      product: "Fanta 2L",
      competitor: "Jumbo",
      oldPrice: 2450,
      newPrice: 2290,
      discount: -6.5,
      date: "hace 1 día",
      severity: "medium",
      url: "https://jumbo.cl/fanta-2l",
    },
    {
      id: 4,
      product: "Pepsi 2L",
      competitor: "Tottus",
      oldPrice: 2690,
      newPrice: 2390,
      discount: -11.2,
      date: "hace 2 días",
      severity: "critical",
      url: "https://tottus.cl/pepsi-2l",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Crítico</Badge>;
      case "high":
        return <Badge className="bg-warning text-warning-foreground">Alto</Badge>;
      default:
        return <Badge variant="secondary">Medio</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-destructive bg-destructive/5";
      case "high":
        return "border-l-warning bg-warning/5";
      default:
        return "border-l-muted bg-muted/20";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Análisis de Descuentos Agresivos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {discounts.map((discount) => (
            <div 
              key={discount.id} 
              className={`border-l-4 p-4 rounded-r-lg transition-all hover:shadow-md ${getSeverityColor(discount.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{discount.product}</h4>
                    {getSeverityBadge(discount.severity)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{discount.competitor}</strong>
                    </span>
                    <span className="text-muted-foreground">{discount.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">
                        ${discount.oldPrice.toLocaleString()}
                      </span>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <span className="text-lg font-bold text-destructive">
                        ${discount.newPrice.toLocaleString()}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-destructive border-destructive/30">
                      {discount.discount}%
                    </Badge>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Descuentos Hoy</p>
              <p className="text-2xl font-bold text-destructive">4</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Promedio Reducción</p>
              <p className="text-2xl font-bold text-warning">-9.1%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Más Agresivo</p>
              <p className="text-lg font-semibold text-foreground">Líquidos.cl</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AggressiveDiscounts;