import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  selected: boolean;
}

interface Role {
  id: string;
  name: string;
  metrics: string[];
}

interface Stage {
  id: string;
  name: string;
  description: string;
}

/**
 * Personalization - 个性化设置页面
 */
export default function Personalization() {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>(() => {
    // 从 URL 参数获取初始 section，默认为 'industry'
    return searchParams.get('section') || 'industry';
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('自媒体');
  const [activeRole, setActiveRole] = useState<string>('ceo');
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [foundedDate, setFoundedDate] = useState<string>('');
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [showStrategyModal, setShowStrategyModal] = useState<boolean>(false);

  // 当 URL 参数变化时更新 activeSection
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const templates: Template[] = [
    {
      id: '自媒体',
      name: '自媒体',
      description: '内容创作、粉丝运营、广告变现',
      features: ['内容日历', '粉丝分析', '广告报价', '爆文预测', '竞品监控', '流量分析'],
      selected: true,
    },
    {
      id: '电商',
      name: '跨境电商',
      description: '商品管理、订单处理、供应链优化',
      features: ['库存管理', '订单跟踪', '物流对接', '选品分析', '定价策略', '海外仓管理'],
      selected: false,
    },
    {
      id: '知识付费',
      name: '知识付费',
      description: '课程制作、学员管理、收益分析',
      features: ['课程管理', '学员跟踪', '收益分成', '完课率分析', '复购率提升', '社群运营'],
      selected: false,
    },
    {
      id: 'local-life',
      name: '本地生活',
      description: '门店管理、团购核销、会员运营',
      features: ['门店管理', '团购活动', '核销统计', '会员系统', '优惠券管理', '评价分析'],
      selected: false,
    },
    {
      id: 'saas',
      name: 'SaaS软件',
      description: '用户增长、订阅管理、客户成功',
      features: ['用户增长', '订阅计费', '客户成功', '流失预测', '产品分析', 'NPS调研'],
      selected: false,
    },
    {
      id: 'manufacturing',
      name: '智能制造',
      description: '生产计划、质量控制、设备维护',
      features: ['生产排程', '质检管理', '设备维保', '供应链协同', '能耗监控', '安全生产'],
      selected: false,
    },
    {
      id: 'logistics',
      name: '智慧物流',
      description: '运输调度、仓储管理、路径优化',
      features: ['调度系统', '仓储管理', '路径规划', '运力匹配', '时效监控', '成本分析'],
      selected: false,
    },
    {
      id: 'finance',
      name: '金融服务',
      description: '风险评估、投资决策、合规管理',
      features: ['风险控制', '投资组合', '合规管理', '客户KYC', '反洗钱', '智能投顾'],
      selected: false,
    },
    {
      id: 'healthcare',
      name: '医疗健康',
      description: '患者管理、诊疗流程、健康档案',
      features: ['预约挂号', '电子病历', '慢病管理', '远程问诊', '药品管理', '随访系统'],
      selected: false,
    },
    {
      id: 'education',
      name: '在线教育',
      description: '课程教学、学习跟踪、家校沟通',
      features: ['直播课堂', '作业批改', '学习报告', '家校互通', '题库管理', '考试系统'],
      selected: false,
    },
    {
      id: 'realestate',
      name: '房地产',
      description: '房源管理、客户跟进、交易流程',
      features: ['房源管理', '客户CRM', '看房预约', '合同管理', '佣金结算', '市场分析'],
      selected: false,
    },
    {
      id: 'restaurant',
      name: '餐饮连锁',
      description: '门店运营、菜品管理、供应链采购',
      features: ['POS收银', '菜品管理', '食材采购', '成本核算', '会员营销', '外卖对接'],
      selected: false,
    },
  ];

  const roles: Role[] = [
    {
      id: 'ceo',
      name: 'CEO视角',
      metrics: [
        '营收增长率',
        '净利润率',
        '月活跃用户(MAU)',
        '客户获取成本(CAC)',
        '客户生命周期价值(LTV)',
        '烧钱率',
        '现金流',
        '单位经济模型'
      ]
    },
    {
      id: 'operator',
      name: '运营视角',
      metrics: [
        '日活跃用户(DAU)',
        '内容发布量',
        '互动率',
        '转化率',
        '留存率',
        '分享率',
        '客单价',
        '复购率'
      ]
    },
    {
      id: 'finance',
      name: '财务视角',
      metrics: [
        '现金流状况',
        '收入结构',
        '成本结构',
        '毛利率',
        'EBITDA',
        '应收账款周转',
        '库存周转率',
        '税务合规'
      ]
    },
    {
      id: 'product',
      name: '产品视角',
      metrics: [
        '功能使用率',
        '用户满意度(NPS)',
        '产品迭代速度',
        'Bug修复率',
        '用户反馈量',
        '功能完成度',
        '技术债务',
        '性能指标'
      ]
    },
    {
      id: 'marketing',
      name: '市场视角',
      metrics: [
        '品牌认知度',
        '广告ROI',
        '渠道转化率',
        'SEO排名',
        '社交媒体声量',
        '活动参与率',
        '线索质量',
        '市场占有率'
      ]
    },
    {
      id: 'sales',
      name: '销售视角',
      metrics: [
        '销售漏斗',
        '赢单率',
        '销售周期',
        '客单价',
        '客户满意度',
        '续约率',
        '回款周期',
        '销售预测准确度'
      ]
    },
    {
      id: 'hr',
      name: '人力资源视角',
      metrics: [
        '员工满意度',
        '离职率',
        '招聘周期',
        '人效比',
        '培训完成率',
        '绩效分布',
        '薪酬竞争力',
        '组织健康度'
      ]
    },
    {
      id: 'tech',
      name: '技术视角',
      metrics: [
        '系统可用性',
        '响应时间',
        '代码质量',
        '部署频率',
        '故障恢复时间',
        '安全漏洞数',
        '技术栈更新',
        'API调用量'
      ]
    },
    {
      id: 'customer',
      name: '客服视角',
      metrics: [
        '工单处理量',
        '平均响应时间',
        '问题解决率',
        '客户满意度(CSAT)',
        '首次解决率',
        '投诉率',
        '知识库使用',
        '服务等级协议(SLA)'
      ]
    },
  ];

  const stages: Stage[] = [
    { id: 'startup', name: '初创期', description: '产品验证、市场探索' },
    { id: 'growth', name: '成长期', description: '规模扩张、模式优化' },
    { id: 'mature', name: '成熟期', description: '稳定运营、持续创新' },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoundedDate(e.target.value);
  };

  const getStageInfo = (date: string) => {
    if (!date) return { years: 0, months: 0, stage: '' };
    const founded = new Date(date);
    const now = new Date();
    const diff = now.getTime() - founded.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    // 根据需求规则自动判定阶段
    let stage: 'startup' | 'growth' | 'mature' | '' = '';
    if (years > 7) {
      stage = 'mature'; // 成熟期：成立时间 > 7年
    } else if (years > 3) {
      stage = 'growth'; // 成长期：3年 < 成立时间 ≤ 7年
    } else if (years > 0) {
      stage = 'startup'; // 初创期：0年 < 成立时间 ≤ 3年
    }

    return { years, months, stage };
  };

  const stageInfo = getStageInfo(foundedDate);
  const currentStage = stages.find((s) => s.id === stageInfo.stage);

  // 当成立时间变化时，自动更新选中的阶段
  useEffect(() => {
    if (stageInfo.stage) {
      setSelectedStage(stageInfo.stage);
    }
  }, [stageInfo.stage]);

  const handleEditDate = () => {
    setIsEditingDate(true);
  };

  const handleSaveDate = () => {
    setIsEditingDate(false);
  };

  const handleCancelEdit = () => {
    setIsEditingDate(false);
  };

  return (
    <>
      <div className="breadcrumb">配置中心 / 个性化设置</div>
      <h1 className="page-title">个性化定制</h1>

      <div className="personalization-layout">
        {/* 中间内容区 */}
        <section>
          {/* 行业模板 */}
          <div className="card" id="industry">
            <h3>行业模板选择</h3>
            <div className="template-grid">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate === template.name ? 'selected' : ''} cursor-pointer`}
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
            {roles.map((role) => (
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
              )
            ))}
            <button className="mt-10">恢复默认</button>
          </div>

          {/* 发展阶段 */}
          <div className="card" id="stage">
            <h3>企业发展阶段</h3>
            <div className="stage-inline">
              <label htmlFor="foundedDate">企业成立时间</label>
              {isEditingDate ? (
                <>
                  <input
                    id="foundedDate"
                    type="date"
                    value={foundedDate}
                    onChange={handleDateChange}
                    required
                  />
                  <button className="btn-small" onClick={handleSaveDate}>
                    保存
                  </button>
                  <button className="btn-small btn-outline" onClick={handleCancelEdit}>
                    取消
                  </button>
                </>
              ) : (
                <>
                  <span>{foundedDate || '未设置'}</span>
                  <button className="btn-small btn-outline" onClick={handleEditDate}>
                    修改
                  </button>
                </>
              )}
            </div>
            {foundedDate && !isEditingDate && (
              <div className="founded-result">
                已成立{stageInfo.years}年{stageInfo.months}月{' '}
                <span className={`stage-tag stage-${stageInfo.stage}`}>
                  {currentStage?.name || '初创期'}
                </span>
              </div>
            )}
            <div className="stage-description">
              <p className="stage-hint">
                <strong>系统说明：</strong>企业发展阶段将根据企业成立时间自动判定，无需手动选择。
              </p>
              {currentStage && (
                <div className={`stage-info-card stage-${stageInfo.stage}`}>
                  <h4>{currentStage.name}</h4>
                  <p>{currentStage.description}</p>
                  {stageInfo.stage === 'startup' && (
                    <p className="stage-detail">
                      成立时间 ≤ 3年：产品验证，市场探索阶段
                    </p>
                  )}
                  {stageInfo.stage === 'growth' && (
                    <p className="stage-detail">
                      3年 {'<'} 成立时间 ≤ 7年：规模扩张，模式优化阶段
                    </p>
                  )}
                  {stageInfo.stage === 'mature' && (
                    <p className="stage-detail">
                      成立时间 {'>'} 7年：稳定运营，持续创新阶段
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 未设置成立时间时的提示 */}
            {!foundedDate && (
              <div style={{
                padding: '16px',
                background: '#f0f7ff',
                borderLeft: '3px solid var(--primary)',
                borderRadius: '4px',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                marginBottom: '12px'
              }}>
                请先设置企业成立时间，系统将自动判定企业发展阶段
              </div>
            )}

            {stages.map((stage) => (
              <div
                key={stage.id}
                className={`stage-item ${selectedStage === stage.id ? 'active' : ''}`}
                style={{
                  opacity: stageInfo.stage && stage.id !== stageInfo.stage ? 0.5 : 1
                }}
              >
                <div className="stage-number">{stages.indexOf(stage) + 1}</div>
                <div>
                  <h4>{stage.name}</h4>
                  <p>{stage.description}</p>
                  {stageInfo.stage && stage.id === stageInfo.stage && (
                    <span className="tag-current">当前阶段</span>
                  )}
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
