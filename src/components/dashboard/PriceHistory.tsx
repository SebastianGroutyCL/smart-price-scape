import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Clock } from "lucide-react";

const PriceHistory = () => {
  const data = [
    { date: "2024-01-01", myPrice: 2890, jumbo: 2790, tottus: 2650, liquidos: 2720 },
    { date: "2024-01-08", myPrice: 2890, jumbo: 2820, tottus: 2680, liquidos: 2750 },
    { date: "2024-01-15", myPrice: 2950, jumbo: 2850, tottus: 2590, liquidos: 2690 },
    { date: "2024-01-22", myPrice: 2950, jumbo: 2790, tottus: 2650, liquidos: 2720 },
    { date: "2024-01-29", myPrice: 2890, jumbo: 2790, tottus: 2650, liquidos: 2720 },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Historial de Precios y Volatilidad
          </CardTitle>
          <Select defaultValue="cocacola">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cocacola">Coca-Cola 2L</SelectItem>
              <SelectItem value="sprite">Sprite 1.5L</SelectItem>
              <SelectItem value="fanta">Fanta 2L</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                className="text-muted-foreground"
              />
              <YAxis className="text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="myPrice" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Mi Precio"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="jumbo" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Jumbo"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="tottus" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Tottus"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="liquidos" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Líquidos"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Volatilidad</p>
            <p className="text-lg font-semibold text-primary">Baja</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Variación 30d</p>
            <p className="text-lg font-semibold text-success">-2.1%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Precio Promedio</p>
            <p className="text-lg font-semibold">$2,794</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Brecha vs Min</p>
            <p className="text-lg font-semibold text-warning">+9.1%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceHistory;