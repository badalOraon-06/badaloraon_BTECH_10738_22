import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { taskAPI } from '../services/api';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.updateTask(selectedTask._id, taskData);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskAPI.deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find(t => t._id === active.id);
    const overId = over.id;

    // Check if dropping over a column
    if (['pending', 'in-progress', 'completed'].includes(overId)) {
      if (activeTask && activeTask.status !== overId) {
        // Update task status
        updateTaskStatus(active.id, overId);
      }
    }
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const activeTask = tasks.find(t => t._id === activeId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
            <p className="text-gray-600 mt-1">Manage your tasks with drag and drop</p>
          </div>
          <button
            onClick={() => {
              setSelectedTask(null);
              setModalMode('create');
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KanbanColumn
              status="pending"
              title="Pending"
              tasks={getTasksByStatus('pending')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            <KanbanColumn
              status="in-progress"
              title="In Progress"
              tasks={getTasksByStatus('in-progress')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            <KanbanColumn
              status="completed"
              title="Completed"
              tasks={getTasksByStatus('completed')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>

          <DragOverlay>
            {activeTask ? (
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={modalMode === 'create' ? handleCreateTask : handleUpdateTask}
          task={selectedTask}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;
