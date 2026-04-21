import { useState } from 'react';
import type { Customer } from '@types';

interface Tab {
  key: string;
  label: string;
  count: number;
}

/**
 * CRM - 客户关系管理页面
 */
export default function CRM() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // 模拟客户数据
  const customers: Record<string, Customer[]> = {
    all: [
      { id: 1, company: 'ABC科技', contact: '张经理', stage: 'potential', lastContact: '2026-04-15' },
      { id: 2, company: '晨曦智能', contact: '李总', stage: 'following', lastContact: '2026-04-14' },
    ],
    potential: [
      { id: 3, company: '未来数据', contact: '王总', stage: 'potential', lastContact: '' },
    ],
    follow: [
      { id: 4, company: '星河互联', contact: '赵经理', stage: 'following', lastContact: '2026-04-13' },
    ],
    deal: [
      { id: 5, company: '北辰科技', contact: '刘总', stage: 'deal', lastContact: '2026-04-10' },
    ],
  };

  const tabs: Tab[] = [
    { key: 'all', label: '全部', count: 120 },
    { key: 'potential', label: '潜在', count: 50 },
    { key: 'follow', label: '跟进', count: 40 },
    { key: 'deal', label: '成交', count: 30 },
  ];

  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };

  const openCustomerDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="breadcrumb">运营管理 / 客户关系管理</div>
      <h1 className="page-title">客户关系管理</h1>

      {/* Tabs */}
      <section className="card">
        <div className="tabs" data-tab-group>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label} {tab.count}
            </button>
          ))}
        </div>
      </section>

      {/* 客户列表 */}
      <section className="card">
        <div className="toolbar">
          <input placeholder="搜索客户" />
          <select>
            <option>全部行业</option>
          </select>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            新建客户
          </button>
        </div>

        <div>
          {customers[activeTab]?.map((customer) => (
            <div
              key={customer.id}
              className="list-card cursor-pointer"
            >
              公司：{customer.company} | 联系人：{customer.contact} | 阶段：{customer.stage}
              {customer.lastContact && ` | 最近联系：${customer.lastContact}`}
            </div>
          ))}
        </div>
      </section>

      {/* 新建客户模态框 */}
      {isModalOpen && (
        <div className="modal-backdrop show">
          <div className="modal">
            <h3>新建客户</h3>
            <div className="grid cols-2">
              <input placeholder="公司名称" />
              <input placeholder="联系人" />
              <input placeholder="联系电话" />
              <input placeholder="当前阶段" />
            </div>
            <div className="mt-10">
              <button className="btn-primary" onClick={() => setIsModalOpen(false)}>
                保存
              </button>
              <button onClick={() => setIsModalOpen(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 客户详情抽屉 */}
      {isDrawerOpen && selectedCustomer && (
        <div className="drawer show">
          <div className="drawer-panel">
            <h3>客户详情</h3>
            <p>
              <strong>公司：</strong>{selectedCustomer.company}
            </p>
            <p>
              <strong>联系人：</strong>{selectedCustomer.contact}
            </p>
            <p>
              <strong>阶段：</strong>{selectedCustomer.stage}
            </p>
            {selectedCustomer.lastContact && (
              <p>
                <strong>最近联系：</strong>{selectedCustomer.lastContact}
              </p>
            )}
            <p>这里展示客户完整画像、跟进记录和消息入口。</p>
            <button onClick={() => setIsDrawerOpen(false)}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}
