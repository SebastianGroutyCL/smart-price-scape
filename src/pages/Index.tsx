import NavigationHeader from "@/components/ui/navigation";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import CompetitionRadar from "@/components/dashboard/CompetitionRadar";
import PriceHistory from "@/components/dashboard/PriceHistory";
import AggressiveDiscounts from "@/components/dashboard/AggressiveDiscounts";
import heroImage from "@/assets/hero-dashboard.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-float">
              Inteligencia de Precios
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Impulsada por IA
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Toma decisiones estratégicas de precios con análisis en tiempo real, 
              alertas proactivas y insights accionables de tu competencia.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        <DashboardFilters />
        <ExecutiveSummary />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <CompetitionRadar />
          <PriceHistory />
        </div>
        
        <AggressiveDiscounts />
      </div>
    </div>
  );
};

export default Index;
