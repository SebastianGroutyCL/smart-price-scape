import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Settings, 
  Users, 
  Search,
  Bell,
  User,
  Brain
} from "lucide-react";
import { useLocation } from "react-router-dom";

const NavigationHeader = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PriceRadar
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              className={cn(
                "gap-2 hover:text-foreground",
                location.pathname === "/" ? "text-foreground bg-muted" : "text-foreground/60"
              )}
              onClick={() => window.location.href = "/"}
            >
              <TrendingUp className="h-4 w-4" />
              Dashboard Principal
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "gap-2 hover:text-foreground",
                location.pathname === "/intelligence" ? "text-foreground bg-muted" : "text-foreground/60"
              )}
              onClick={() => window.location.href = "/intelligence"}
            >
              <Brain className="h-4 w-4" />
              Inteligencia de Precios
            </Button>
            <Button variant="ghost" className="gap-2 text-foreground/60 hover:text-foreground">
              <Search className="h-4 w-4" />
              Productos
            </Button>
            <Button variant="ghost" className="gap-2 text-foreground/60 hover:text-foreground">
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive"></span>
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;