
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  description?: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'status' | 'lastUpdated'>) => void;
  removeItem: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'ST001',
      name: 'Hot Rolled Coils',
      category: 'Hot Rolled Products',
      quantity: 250,
      unit: 'Tonnes',
      location: 'Warehouse 1',
      status: 'In Stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'ST002',
      name: 'Cold Rolled Sheets',
      category: 'Cold Rolled Products',
      quantity: 180,
      unit: 'Tonnes',
      location: 'Warehouse 2',
      status: 'In Stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: 'ST003',
      name: 'Galvanized Coils',
      category: 'Coated Products',
      quantity: 15,
      unit: 'Tonnes',
      location: 'Warehouse 3',
      status: 'Low Stock',
      lastUpdated: '2024-01-13'
    }
  ]);

  const generateId = () => {
    const prefix = 'ST';
    const number = (items.length + 1).toString().padStart(3, '0');
    return `${prefix}${number}`;
  };

  const getStatus = (quantity: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 50) return 'Low Stock';
    return 'In Stock';
  };

  const addItem = (newItem: Omit<InventoryItem, 'id' | 'status' | 'lastUpdated'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: generateId(),
      status: getStatus(newItem.quantity),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
};
