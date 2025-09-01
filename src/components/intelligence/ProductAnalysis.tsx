import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

interface Product {
  id: string;
  sku: string;
  name: string;
  image: string;
  myPrice: number;
  marketAverage: number;
  cheapestCompetitor: string;
  marketMin: number;
  diffVsMin: number;
  priceChanges: number;
  category: string;
}

interface ProductAnalysisProps {
  selectedProduct: Product | null;
}

const ProductAnalysis = ({ selectedProduct }: ProductAnalysisProps) => {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["Tottus", "Jumbo"]);
  const [analysisView, setAnalysisView] = useState<"historical" | "hourly">("historical");

  // Mock data for historical price evolution
  const historicalData = [
    { date: "2024-01-01", miPrecio: 2450, Tottus: 1950, Jumbo: 2200, "Líquidos.cl": 2100, "Santa Isabel": 2150 },
    { date: "2024-01-08", miPrecio: 2450, Tottus: 1980, Jumbo: 2180, "Líquidos.cl": 2050, "Santa Isabel": 2120 },
    { date: "2024-01-15", miPrecio: 2400, Tottus: 2000, Jumbo: 2150, "Líquidos.cl": 2080, "Santa Isabel": 2100 },
    { date: "2024-01-22", miPrecio: 2400, Tottus: 1950, Jumbo: 2200, "Líquidos.cl": 2000, "Santa Isabel": 2080 },
    { date: "2024-01-29", miPrecio: 2450, Tottus: 1980, Jumbo: 2180, "Líquidos.cl": 2020, "Santa Isabel": 2100 },
  ];

  // Mock data for hourly fluctuation
  const hourlyData = [
    { hour: "00:00", miPrecio: 2450, Tottus: 1950, Jumbo: 2200 },
    { hour: "04:00", miPrecio: 2450, Tottus: 1950, Jumbo: 2200 },
    { hour: "08:00", miPrecio: 2450, Tottus: 1980, Jumbo: 2180 },
    { hour: "12:00", miPrecio: 2450, Tottus: 1980, Jumbo: 2150 },
    { hour: "16:00", miPrecio: 2450, Tottus: 1950, Jumbo: 2200 },
    { hour: "20:00", miPrecio: 2450, Tottus: 1950, Jumbo: 2200 },
  ];

  const competitorColors = {
    "miPrecio": "#6366f1",
    "Tottus": "#ef4444",
    "Jumbo": "#f59e0b",
    "Líquidos.cl": "#10b981",
    "Santa Isabel": "#8b5cf6"
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const statistics = selectedProduct ? [
    {
      title: "Precio Máximo",
      value: formatPrice(2450),
      icon: TrendingUp,
      color: "text-destructive"
    },
    {
      title: "Precio Mínimo",
      value: formatPrice(1950),
      icon: TrendingDown,
      color: "text-success"
    },
    {
      title: "Precio Promedio",
      value: formatPrice(2200),
      icon: DollarSign,
      color: "text-primary"
    },
    {
      title: "Volatilidad",
      value: "12.8%",
      icon: Activity,
      color: "text-warning"
    }
  ] : [];

  if (!selectedProduct) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Selecciona un producto</h3>
            <p className="text-muted-foreground">
              Haz clic en cualquier producto de la tabla para ver su análisis detallado
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del producto seleccionado */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-12 w-12 rounded object-cover"
              />
              <div>
                <CardTitle className="text-xl">{selectedProduct.name}</CardTitle>
                <p className="text-muted-foreground">SKU: {selectedProduct.sku}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {selectedProduct.category}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Controles del análisis */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vista del Análisis</label>
                <Select value={analysisView} onValueChange={(value: "historical" | "hourly") => setAnalysisView(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="historical">Evolución Histórica</SelectItem>
                    <SelectItem value="hourly">Fluctuación Horaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Competidores a Mostrar</label>
                <div className="flex gap-2">
                  {["Tottus", "Jumbo", "Líquidos.cl", "Santa Isabel"].map((competitor) => (
                    <Button
                      key={competitor}
                      variant={selectedCompetitors.includes(competitor) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedCompetitors.includes(competitor)) {
                          setSelectedCompetitors(selectedCompetitors.filter(c => c !== competitor));
                        } else {
                          setSelectedCompetitors([...selectedCompetitors, competitor]);
                        }
                      }}
                    >
                      {competitor}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico principal */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>
            {analysisView === "historical" ? "Evolución de Precios Histórico" : "Fluctuación Horaria"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analysisView === "historical" ? historicalData : hourlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey={analysisView === "historical" ? "date" : "hour"}
                  fontSize={12}
                  tickFormatter={(value) => 
                    analysisView === "historical" 
                      ? new Date(value).toLocaleDateString('es-CL', { month: 'short', day: 'numeric' })
                      : value
                  }
                />
                <YAxis 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                          <p className="font-medium mb-2">
                            {analysisView === "historical" 
                              ? new Date(label).toLocaleDateString('es-CL', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })
                              : label
                            }
                          </p>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-sm">
                                {entry.dataKey}: {formatPrice(entry.value as number)}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                
                {/* Mi Precio */}
                <Line
                  type="monotone"
                  dataKey="miPrecio"
                  stroke={competitorColors.miPrecio}
                  strokeWidth={3}
                  name="Mi Precio"
                  dot={{ r: 4 }}
                />
                
                {/* Líneas de competidores */}
                {selectedCompetitors.map((competitor) => (
                  <Line
                    key={competitor}
                    type="monotone"
                    dataKey={competitor}
                    stroke={competitorColors[competitor as keyof typeof competitorColors]}
                    strokeWidth={2}
                    name={competitor}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas clave */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Estadísticas Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAnalysis;