import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
// import { Canvas } from './components/Canvas'; //
// import { EditPanel } from './components/EditPanel';
import { CanvasComponent } from './types';

function App() {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<CanvasComponent | null>(null);

  const handleAddComponent = (type: 'button' | 'title' | 'text') => {
    const newComponent: CanvasComponent = {
      id: crypto.randomUUID(),
      type,
      content: '',
      position: { x: 100, y: 100 },
    };
    setComponents([...components, newComponent]);
  };

  const handleUpdateComponent = (
    id: string,
    updates: Partial<CanvasComponent>
  ) => {
    setComponents(
      components.map((component) => {
        if (component.id === id) {
          const updated = { ...component, ...updates };
          if (selectedComponent?.id === id) {
            setSelectedComponent(updated);
          }
          return updated;
        }
        return component;
      })
    );
  };

  const handleSelectComponent = (component: CanvasComponent) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <Sidebar onAddComponent={handleAddComponent} />
      {/* <Canvas 
        components={components} 
        onUpdateComponent={handleUpdateComponent}
        onSelectComponent={handleSelectComponent}
        selectedId={selectedComponent?.id ?? null}
      />
      <EditPanel 
        component={selectedComponent}
        onUpdate={(updates) => 
          selectedComponent && handleUpdateComponent(selectedComponent.id, updates)
        }
        onClose={() => setSelectedComponent(null)}
      /> */}
    </div>
  );
}

export default App;