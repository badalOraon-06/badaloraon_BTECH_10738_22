import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskCard from './SortableTaskCard';

const KanbanColumn = ({ status, title, tasks, onEdit, onDelete, bgColor }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const statusConfig = {
    pending: { color: 'bg-yellow-500', icon: '⏳' },
    'in-progress': { color: 'bg-blue-500', icon: '🔄' },
    completed: { color: 'bg-green-500', icon: '✅' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex-1 min-w-[280px] bg-gray-100 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
        <h2 className="font-bold text-gray-800 text-lg">
          {config.icon} {title}
        </h2>
        <span className="ml-auto bg-gray-300 text-gray-700 rounded-full px-2 py-1 text-xs font-semibold">
          {tasks.length}
        </span>
      </div>
      <SortableContext
        id={status}
        items={tasks.map(task => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
        >
          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-sm">No tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard
                key={task._id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
