import React from 'react';
import { CanvasComponent } from '../types';

interface CanvasProps {
  components: CanvasComponent[];
  onUpdateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
  onSelectComponent: (component: CanvasComponent) => void;
  selectedId: string | null;
}

export function Canvas({ 
  components, 
  onUpdateComponent, 
  onSelectComponent,
  selectedId 
}: CanvasProps) {
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('componentId', id);
  };

  const handleDrag = (e: React.DragEvent, id: string) => {
    if (e.clientX && e.clientY) {
      const canvas = e.currentTarget.parentElement?.getBoundingClientRect();
      if (canvas) {
        const x = e.clientX - canvas.left;
        const y = e.clientY - canvas.top;
        onUpdateComponent(id, {
          position: { x, y },
        });
      }
    }
  };

  return (
    <div className="flex-1 bg-white h-screen overflow-hidden relative">
      {components.map((component) => (
        <div
          key={component.id}
          draggable
          onDragStart={(e) => handleDragStart(e, component.id)}
          onDrag={(e) => handleDrag(e, component.id)}
          onClick={() => onSelectComponent(component)}
          style={{
            position: 'absolute',
            left: component.position.x,
            top: component.position.y,
            cursor: 'move',
          }}
          className={`absolute ${
            selectedId === component.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          {component.type === 'button' && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              {component.content || 'Button'}
            </button>
          )}
          {component.type === 'title' && (
            <h2 className="text-2xl font-bold">
              {component.content || 'Title'}
            </h2>
          )}
          {component.type === 'text' && (
            <p className="text-gray-700">
              {component.content || 'Text content'}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}