import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, RotateCcw } from "lucide-react";

const DashboardFilters = () => {
  return (
    <Card className="shadow-card">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Período Principal</label>
              <Select defaultValue="last30">
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="last7">Últimos 7 días</SelectItem>
                  <SelectItem value="last30">Últimos 30 días</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Comparar con</label>
              <Select defaultValue="prev30">
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prev30">Período anterior</SelectItem>
                  <SelectItem value="lastmonth">Mes pasado</SelectItem>
                  <SelectItem value="samemonth">Mismo mes año anterior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Productos</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los productos</SelectItem>
                  <SelectItem value="cocacola">Coca-Cola</SelectItem>
                  <SelectItem value="sprite">Sprite</SelectItem>
                  <SelectItem value="fanta">Fanta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Competidores</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="jumbo">Jumbo</SelectItem>
                  <SelectItem value="tottus">Tottus</SelectItem>
                  <SelectItem value="liquidos">Líquidos.cl</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
            <Button className="bg-gradient-primary">
              Aplicar Filtros
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <Badge variant="secondary" className="gap-1">
            Últimos 30 días
          </Badge>
          <Badge variant="secondary" className="gap-1">
            vs. Período anterior
          </Badge>
          <Badge variant="secondary" className="gap-1">
            6 productos activos
          </Badge>
          <Badge variant="secondary" className="gap-1">
            3 competidores
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;