import React from 'react';
import { CanvasComponent } from '../types';
import { X } from 'lucide-react';

interface EditPanelProps {
  component: CanvasComponent | null;
  onUpdate: (updates: Partial<CanvasComponent>) => void;
  onClose: () => void;
}

export function EditPanel({ component, onUpdate, onClose }: EditPanelProps) {
  if (!component) return null;

  return (
    <div className="absolute right-0 top-0 w-64 h-screen bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Edit {component.type}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Content</label>
          <input
            type="text"
            value={component.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Position X</label>
          <input
            type="number"
            value={component.position.x}
            onChange={(e) => onUpdate({ 
              position: { ...component.position, x: Number(e.target.value) }
            })}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Position Y</label>
          <input
            type="number"
            value={component.position.y}
            onChange={(e) => onUpdate({ 
              position: { ...component.position, y: Number(e.target.value) }
            })}
            className="w-full px-3 py-2 bg-gray-700 rounded text-white"
          />
        </div>
      </div>
    </div>
  );
}