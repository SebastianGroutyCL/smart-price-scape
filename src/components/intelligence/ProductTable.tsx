import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search, Eye } from "lucide-react";

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

interface ProductTableProps {
  onProductSelect: (product: Product) => void;
  selectedProduct?: Product;
}

const ProductTable = ({ onProductSelect, selectedProduct }: ProductTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const mockProducts: Product[] = [
    {
      id: "1",
      sku: "COC001",
      name: "Coca-Cola Original 2L",
      image: "/placeholder.svg",
      myPrice: 2450,
      marketAverage: 2280,
      cheapestCompetitor: "Tottus",
      marketMin: 1950,
      diffVsMin: 25.6,
      priceChanges: 8,
      category: "bebidas"
    },
    {
      id: "2",
      sku: "SPR001",
      name: "Sprite 1.5L",
      image: "/placeholder.svg",
      myPrice: 1890,
      marketAverage: 1950,
      cheapestCompetitor: "Jumbo",
      marketMin: 1750,
      diffVsMin: 8.0,
      priceChanges: 5,
      category: "bebidas"
    },
    {
      id: "3",
      sku: "FAN001",
      name: "Fanta Naranja 2L",
      image: "/placeholder.svg",
      myPrice: 2150,
      marketAverage: 2100,
      cheapestCompetitor: "Líquidos.cl",
      marketMin: 1890,
      diffVsMin: 13.8,
      priceChanges: 12,
      category: "bebidas"
    },
    {
      id: "4",
      sku: "PEP001",
      name: "Pepsi Cola 2L",
      image: "/placeholder.svg",
      myPrice: 2200,
      marketAverage: 2150,
      cheapestCompetitor: "Santa Isabel",
      marketMin: 1980,
      diffVsMin: 11.1,
      priceChanges: 6,
      category: "bebidas"
    },
    {
      id: "5",
      sku: "WAT001",
      name: "Agua Mineral 1.5L",
      image: "/placeholder.svg",
      myPrice: 990,
      marketAverage: 920,
      cheapestCompetitor: "Tottus",
      marketMin: 850,
      diffVsMin: 16.5,
      priceChanges: 3,
      category: "bebidas"
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getDiffColor = (diff: number) => {
    if (diff <= 5) return "text-success";
    if (diff <= 15) return "text-warning";
    return "text-destructive";
  };

  const getDiffBadgeVariant = (diff: number) => {
    if (diff <= 5) return "default";
    if (diff <= 15) return "outline";
    return "destructive";
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Tabla Maestra de Productos</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por SKU o nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('sku')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    SKU
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    Producto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('myPrice')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    Mi Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('marketAverage')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    Promedio Mercado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Competidor + Barato</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('marketMin')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    Precio Mínimo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('diffVsMin')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    Dif. vs Mínimo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('priceChanges')}
                    className="h-8 data-[state=open]:bg-accent"
                  >
                    # Cambios
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[80px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={`cursor-pointer hover:bg-muted/50 ${
                    selectedProduct?.id === product.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => onProductSelect(product)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <span className="text-sm">{product.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(product.myPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(product.marketAverage)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {product.cheapestCompetitor}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(product.marketMin)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={getDiffBadgeVariant(product.diffVsMin)}
                      className={`${getDiffColor(product.diffVsMin)} font-medium`}
                    >
                      +{product.diffVsMin.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {product.priceChanges}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductTable;