
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Package, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useInventory } from '@/contexts/InventoryContext';

const Manage = () => {
  const { toast } = useToast();
  const { items: existingItems, addItem, removeItem } = useInventory();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'Tonnes',
    location: '',
    description: ''
  });

  const categories = [
    'Hot Rolled Products',
    'Cold Rolled Products',
    'Coated Products',
    'Stainless Steel',
    'Alloy Steel',
    'Wire Products',
    'Rail Products',
    'Special Steel'
  ];

  const units = ['Tonnes', 'Kg', 'Pieces', 'Meters', 'Sheets'];
  const locations = ['Warehouse 1', 'Warehouse 2', 'Warehouse 3', 'Warehouse 4', 'Warehouse 5', 'Warehouse 6'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.category || !formData.quantity || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      location: formData.location,
      description: formData.description
    });
    
    toast({
      title: "Item Added Successfully",
      description: `${formData.name} has been added to inventory.`,
    });

    // Reset form
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: 'Tonnes',
      location: '',
      description: ''
    });
  };

  const handleDeleteItem = (id: string, name: string) => {
    removeItem(id);
    
    toast({
      title: "Item Deleted",
      description: `${name} has been removed from inventory.`,
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Inventory</h1>
          <p className="text-gray-600 mt-2">Add new items or remove existing ones from inventory</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Item */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-6 w-6 text-green-600" />
                Add New Item
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Storage Location *</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter additional details..."
                  rows={3}
                />
              </div>

              <Button onClick={handleAddItem} className="w-full sail-gradient text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Item to Inventory
              </Button>
            </CardContent>
          </Card>

          {/* Delete Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-6 w-6 text-red-600" />
                Remove Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingItems.length > 0 ? (
                  existingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.id}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>{item.category}</p>
                          <p>{item.quantity} {item.unit} • {item.location}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No items available for deletion</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Manage;
