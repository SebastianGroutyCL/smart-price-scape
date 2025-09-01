import { useState } from "react";
import NavigationHeader from "@/components/ui/navigation";
import DashboardHeader from "@/components/intelligence/DashboardHeader";
import ProductTable from "@/components/intelligence/ProductTable";
import ProductAnalysis from "@/components/intelligence/ProductAnalysis";
import AIReport from "@/components/intelligence/AIReport";

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

const Intelligence = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({
    mainPeriod: "last30",
    comparePeriod: "prev30",
    category: "all",
    competitors: "all"
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <NavigationHeader />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header con Filtros y KPIs */}
        <DashboardHeader onFiltersChange={handleFiltersChange} />
        
        {/* Tabla Maestra de Productos */}
        <ProductTable 
          onProductSelect={handleProductSelect}
          selectedProduct={selectedProduct}
        />
        
        {/* Grid de Análisis y Reporte */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Análisis de Producto (2 columnas) */}
          <div className="xl:col-span-2">
            <ProductAnalysis selectedProduct={selectedProduct} />
          </div>
          
          {/* Panel de Reporte IA (1 columna) */}
          <div className="xl:col-span-1">
            <AIReport 
              selectedProduct={selectedProduct}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intelligence;