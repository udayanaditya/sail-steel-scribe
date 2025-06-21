
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { useInventory } from '@/contexts/InventoryContext';

const Inventory = () => {
  const { items: inventoryData } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = ['all', ...Array.from(new Set(inventoryData.map(item => item.category)))];
  const statuses = ['all', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredData = useMemo(() => {
    return inventoryData.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventoryData, searchTerm, filterCategory, filterStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Low Stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Out of Stock':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'In Stock': 'default',
      'Low Stock': 'secondary',
      'Out of Stock': 'destructive'
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setFilterStatus('all');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-gray-600 mt-2">Monitor and track steel products inventory</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-blue-600">{inventoryData.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by item name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={resetFilters}>
              <Filter className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Inventory ({filteredData.length} items)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Item ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{item.id}</td>
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{item.category}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold">{item.quantity}</span>
                            <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{item.location}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <Badge variant={getStatusBadge(item.status) as any}>
                                {item.status}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{item.lastUpdated}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No inventory items found matching your criteria.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Inventory;
