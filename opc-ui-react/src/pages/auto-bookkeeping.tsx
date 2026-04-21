import { useState } from 'react';

interface Account {
  id: number;
  name: string;
  status: string;
  label: string;
}

interface Rule {
  id: number;
  name: string;
}

/**
 * AutoBookkeeping - 自动记账页面
 */
export default function AutoBookkeeping() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: '银行A', status: 'connected', label: '已连接' },
    { id: 2, name: '支付宝', status: 'connected', label: '已连接' },
    { id: 3, name: '微信支付', status: 'disconnected', label: '未连接' },
  ]);

  const [rules, setRules] = useState<Rule[]>([
    { id: 1, name: '规则1：房租支出 → 办公租金' },
    { id: 2, name: '规则2：广告费 → 营销推广' },
  ]);

  const handleSync = () => {
    alert('开始同步银行流水...');
  };

  const handleAddRule = () => {
    const newRule: Rule = { id: rules.length + 1, name: `规则${rules.length + 1}：新规则` };
    setRules([...rules, newRule]);
  };

  return (
    <>
      <div className="breadcrumb">财务管理 / 自动记账</div>
      <h1 className="page-title">自动记账</h1>

      <section className="card">
        <div className="grid cols-3">
          {accounts.map((account) => (
            <div key={account.id} className="metric">
              <div className="metric-label">{account.name}</div>
              <div className="metric-value">{account.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <button className="btn-primary" onClick={handleSync}>
            一键同步银行流水
          </button>
        </div>
      </section>

      <section className="card">
        <h3>记账规则设置</h3>
        {rules.map((rule) => (
          <div key={rule.id} className="list-card">
            {rule.name}
          </div>
        ))}
        <button onClick={handleAddRule}>新建规则</button>
      </section>
    </>
  );
}
