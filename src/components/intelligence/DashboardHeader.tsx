import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, AlertTriangle, Target, TrendingDown } from "lucide-react";

interface DashboardHeaderProps {
  onFiltersChange: (filters: any) => void;
}

const DashboardHeader = ({ onFiltersChange }: DashboardHeaderProps) => {
  const kpis = [
    {
      title: "Mis SKUs Monitoreados",
      value: "247",
      icon: Target,
      change: "+12 esta semana",
      changeType: "positive"
    },
    {
      title: "Alertas de Precio (24h)",
      value: "18",
      icon: AlertTriangle,
      change: "+5 vs ayer",
      changeType: "warning"
    },
    {
      title: "Índice de Competitividad",
      value: "78%",
      icon: TrendingUp,
      change: "+2.3% vs período anterior",
      changeType: "positive"
    },
    {
      title: "Mayor Caída Competidor",
      value: "-24%",
      icon: TrendingDown,
      change: "Tottus - Coca Cola 2L",
      changeType: "negative"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Filtros Globales */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Período Principal</label>
                <Select defaultValue="last30" onValueChange={(value) => onFiltersChange({ mainPeriod: value })}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="last7">Últimos 7 días</SelectItem>
                    <SelectItem value="last30">Últimos 30 días</SelectItem>
                    <SelectItem value="last90">Últimos 90 días</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Comparar con</label>
                <Select defaultValue="prev30" onValueChange={(value) => onFiltersChange({ comparePeriod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prev30">Período anterior</SelectItem>
                    <SelectItem value="lastmonth">Mes pasado</SelectItem>
                    <SelectItem value="samemonth">Mismo mes año anterior</SelectItem>
                    <SelectItem value="lastquarter">Trimestre anterior</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categorías</label>
                <Select defaultValue="all" onValueChange={(value) => onFiltersChange({ category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                    <SelectItem value="lacteos">Lácteos</SelectItem>
                    <SelectItem value="limpieza">Limpieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Competidores</label>
                <Select defaultValue="all" onValueChange={(value) => onFiltersChange({ competitors: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="jumbo">Jumbo</SelectItem>
                    <SelectItem value="tottus">Tottus</SelectItem>
                    <SelectItem value="liquidos">Líquidos.cl</SelectItem>
                    <SelectItem value="santa_isabel">Santa Isabel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        kpi.changeType === 'positive' ? 'text-success border-success/30' :
                        kpi.changeType === 'warning' ? 'text-warning border-warning/30' :
                        'text-destructive border-destructive/30'
                      }`}
                    >
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    kpi.changeType === 'positive' ? 'bg-success/10' :
                    kpi.changeType === 'warning' ? 'bg-warning/10' :
                    'bg-destructive/10'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      kpi.changeType === 'positive' ? 'text-success' :
                      kpi.changeType === 'warning' ? 'text-warning' :
                      'text-destructive'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHeader;