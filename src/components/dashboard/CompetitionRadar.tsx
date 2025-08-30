import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radar, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react";

const CompetitionRadar = () => {
  const products = [
    {
      id: 1,
      name: "Coca-Cola 2L",
      myPrice: 2890,
      competitors: [
        { name: "Jumbo", price: 2790, trend: "down", change: -3.5 },
        { name: "Tottus", price: 2650, trend: "down", change: -8.4 },
        { name: "Líquidos", price: 2720, trend: "stable", change: 0 },
      ],
      position: "above", // above, below, competitive
    },
    {
      id: 2,
      name: "Sprite 1.5L",
      myPrice: 1990,
      competitors: [
        { name: "Jumbo", price: 2090, trend: "up", change: 5.0 },
        { name: "Tottus", price: 1950, trend: "stable", change: 0 },
        { name: "Líquidos", price: 2150, trend: "up", change: 8.0 },
      ],
      position: "competitive",
    },
    {
      id: 3,
      name: "Fanta 2L",
      myPrice: 2450,
      competitors: [
        { name: "Jumbo", price: 2690, trend: "up", change: 9.8 },
        { name: "Tottus", price: 2590, trend: "down", change: -2.3 },
        { name: "Líquidos", price: 2750, trend: "up", change: 12.2 },
      ],
      position: "below",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-destructive" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-success" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getPositionBadge = (position: string) => {
    switch (position) {
      case "above":
        return <Badge variant="outline" className="text-warning border-warning/30">Sobre mercado</Badge>;
      case "below":
        return <Badge variant="outline" className="text-success border-success/30">Bajo mercado</Badge>;
      default:
        return <Badge variant="outline" className="text-primary border-primary/30">Competitivo</Badge>;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radar className="h-5 w-5 text-primary" />
          Radar de Competencia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{product.name}</h4>
                  {getPositionBadge(product.position)}
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">Tu Precio</p>
                  <p className="text-lg font-bold text-primary">
                    ${product.myPrice.toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Competencia</p>
                  {product.competitors.map((competitor, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{competitor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          ${competitor.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(competitor.trend)}
                          <span className={`text-xs ${
                            competitor.change > 0 ? 'text-destructive' : 
                            competitor.change < 0 ? 'text-success' : 'text-muted-foreground'
                          }`}>
                            {competitor.change > 0 ? '+' : ''}{competitor.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitionRadar;