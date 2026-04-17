import { useState } from 'react';

/**
 * Personalization - 个性化设置页面
 */
export default function Personalization() {
  const [activeSection, setActiveSection] = useState('industry');
  const [selectedTemplate, setSelectedTemplate] = useState('自媒体');
  const [activeRole, setActiveRole] = useState('ceo');
  const [selectedStage, setSelectedStage] = useState('startup');
  const [foundedDate, setFoundedDate] = useState('');
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  const templates = [
    {
      id: '自媒体',
      name: '自媒体',
      description: '内容创作、粉丝运营、广告变现',
      features: ['内容日历', '粉丝分析', '广告报价'],
      selected: true,
    },
    {
      id: '电商',
      name: '电商',
      description: '商品管理、订单处理、供应链优化',
      features: ['库存管理', '订单跟踪', '物流对接'],
      selected: false,
    },
    {
      id: '知识付费',
      name: '知识付费',
      description: '课程制作、学员管理、收益分析',
      features: ['课程管理', '学员跟踪', '收益分成'],
      selected: false,
    },
  ];

  const roles = [
    { id: 'ceo', name: 'CEO视角', metrics: ['营收增长率', '利润率', '用户增长率'] },
    { id: 'operator', name: '运营视角', metrics: ['内容发布量', '互动率', '转化率'] },
    { id: 'finance', name: '财务视角', metrics: ['现金流状况', '成本结构', '税务合规'] },
  ];

  const stages = [
    { id: 'startup', name: '初创期', description: '产品验证、市场探索' },
    { id: 'growth', name: '成长期', description: '规模扩张、模式优化' },
    { id: 'mature', name: '成熟期', description: '稳定运营、持续创新' },
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleDateChange = (e) => {
    setFoundedDate(e.target.value);
  };

  const getStageInfo = (date) => {
    if (!date) return { years: 0, months: 0, stage: 'startup' };
    const founded = new Date(date);
    const now = new Date();
    const diff = now - founded;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    let stage = 'startup';
    if (years > 3) stage = 'mature';
    else if (years > 1) stage = 'growth';
    return { years, months, stage };
  };

  const stageInfo = getStageInfo(foundedDate);
  const currentStage = stages.find((s) => s.id === stageInfo.stage);

  return (
    <>
      <div className="breadcrumb">配置中心 / 个性化设置</div>
      <h1 className="page-title">个性化定制</h1>

      <div className="three-col">
        {/* 左侧导航 */}
        <section className="card config-nav">
          <a
            className={`nav-item ${activeSection === 'industry' ? 'active' : ''}`}
            onClick={() => setActiveSection('industry')}
          >
            行业定制
          </a>
          <a
            className={`nav-item ${activeSection === 'role' ? 'active' : ''}`}
            onClick={() => setActiveSection('role')}
          >
            角色定制
          </a>
          <a
            className={`nav-item ${activeSection === 'stage' ? 'active' : ''}`}
            onClick={() => setActiveSection('stage')}
          >
            阶段定制
          </a>
        </section>

        {/* 中间内容区 */}
        <section>
          {/* 行业模板 */}
          <div className="card" id="industry">
            <h3>行业模板选择</h3>
            <div className="template-grid">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.name ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(template.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <h4>
                    {template.name}
                    {selectedTemplate === template.name && <span className="tag-enabled">已启用</span>}
                  </h4>
                  <p>{template.description}</p>
                  <div className="template-features">
                    {template.features.map((feature, index) => (
                      <span key={index}>{feature}</span>
                    ))}
                  </div>
                  <button
                    className={selectedTemplate === template.name ? 'btn-primary' : 'btn-outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.name);
                    }}
                  >
                    使用此模板
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 角色视角 */}
          <div className="card" id="role">
            <h3>角色视角设置</h3>
            <div className="role-tabs">
              {roles.map((role) => (
                <button
                  key={role.id}
                  className={`role-tab ${activeRole === role.id ? 'active' : ''}`}
                  onClick={() => setActiveRole(role.id)}
                >
                  {role.name}
                </button>
              ))}
            </div>
            {roles.map(
              (role) =>
                activeRole === role.id && (
                  <div key={role.id} className="role-panel active">
                    <h4>{role.name}核心关注指标</h4>
                    {role.metrics.map((metric, index) => (
                      <label key={index} className="checkbox-item">
                        <input type="checkbox" defaultChecked={index < 2} />
                        {metric}
                      </label>
                    ))}
                  </div>
                ),
            )}
            <button style={{ marginTop: '10px' }}>恢复默认</button>
          </div>

          {/* 发展阶段 */}
          <div className="card" id="stage">
            <h3>企业发展阶段</h3>
            <div className="stage-inline">
              <label htmlFor="foundedDate">企业成立时间</label>
              <input
                id="foundedDate"
                type="date"
                value={foundedDate}
                onChange={handleDateChange}
                required
              />
            </div>
            {foundedDate && (
              <div className="founded-result">
                已成立{stageInfo.years}年{stageInfo.months}月{' '}
                <span className="stage-tag stage-{stageInfo.stage}">
                  {currentStage?.name || '初创期'}
                </span>
              </div>
            )}
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={`stage-item ${selectedStage === stage.id ? 'active' : ''}`}
                onClick={() => setSelectedStage(stage.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="stage-number">{stages.indexOf(stage) + 1}</div>
                <div>
                  <h4>{stage.name}</h4>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
            <button className="btn-primary" onClick={() => setShowStrategyModal(true)}>
              查看详细策略
            </button>
          </div>
        </section>

        {/* 右侧预览 */}
        <section className="card">
          <h3>实时预览</h3>
          <div className="preview-box">
            <p>
              当前行业模板：<strong>{selectedTemplate}</strong>
            </p>
            <p>
              当前角色：<strong>{roles.find((r) => r.id === activeRole)?.name}</strong>
            </p>
            <p>
              当前阶段：<strong>{stages.find((s) => s.id === selectedStage)?.name}</strong>
            </p>
            <p>
              已选指标：<span>{roles.find((r) => r.id === activeRole)?.metrics.slice(0, 2).join('、')}</span>
            </p>
          </div>
        </section>
      </div>

      {/* 阶段策略模态框 */}
      {showStrategyModal && (
        <div className="modal-backdrop show">
          <div className="modal">
            <h3>阶段策略详情</h3>
            <p>
              {currentStage?.name}建议：
              {selectedStage === 'startup' && '聚焦MVP验证、核心用户获取和融资准备。'}
              {selectedStage === 'growth' && '扩大市场份额、优化运营效率、建立护城河。'}
              {selectedStage === 'mature' && '稳定现金流、持续创新、探索第二增长曲线。'}
            </p>
            <button onClick={() => setShowStrategyModal(false)}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}
