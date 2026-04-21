import { useState } from 'react';
import type { Task } from '@types';

/**
 * Project - 项目管理页面
 */
export default function Project() {
  const [activeTab, setActiveTab] = useState<string>('全部');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const tabs = ['全部', '进行中', '已完成'];

  const tasks = {
    待办: [
      { id: 1, name: '任务1：竞品周报', owner: '王敏', deadline: '2026-04-20', progress: 65 },
      { id: 2, name: '任务4：客户回访', owner: '李明', deadline: '2026-04-22', progress: 30 },
    ],
    进行中: [
      { id: 3, name: '任务2：投放优化', owner: '张华', deadline: '2026-04-25', progress: 50 },
      { id: 4, name: '任务5：融资材料', owner: '刘洋', deadline: '2026-04-28', progress: 75 },
    ],
    已完成: [
      { id: 5, name: '任务3：财务月报', owner: '王敏', deadline: '2026-04-15', progress: 100 },
      { id: 6, name: '任务6：政策申报', owner: '赵静', deadline: '2026-04-10', progress: 100 },
    ],
  };

  const openTaskDrawer = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="breadcrumb">运营管理 / 项目管理</div>
      <h1 className="page-title">项目管理</h1>

      <section className="card">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="kanban">
          {Object.entries(tasks).map(([status, taskList]) => (
            <div key={status} className="kanban-col">
              <h3>{status}</h3>
              {taskList.map((task) => (
                <div
                  key={task.id}
                  className="task cursor-pointer"
                >
                  {task.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 任务详情抽屉 */}
      {isDrawerOpen && selectedTask && (
        <div className="drawer show">
          <div className="drawer-panel">
            <h3>任务详情</h3>
            <p>任务：{selectedTask.name}</p>
            <p>负责人：{selectedTask.owner}</p>
            <p>截止：{selectedTask.deadline}</p>
            <p>进度：{selectedTask.progress}%</p>
            <button onClick={() => setIsDrawerOpen(false)}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}
