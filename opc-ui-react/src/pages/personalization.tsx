import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  selected: boolean;
  category: string;
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
 * Personalization - 个性化定制页面
 */
export default function Personalization() {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>(() => {
    // 从 URL 参数获取初始 section，默认为 'industry'
    return searchParams.get('section') || 'industry';
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('自媒体运营');
  const [activeRole, setActiveRole] = useState<string>('ceo');
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [foundedDate, setFoundedDate] = useState<string>('');
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [showStrategyModal, setShowStrategyModal] = useState<boolean>(false);
  const [selectedIndustryCategory, setSelectedIndustryCategory] = useState<string>('全部行业');
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // 当 URL 参数变化时更新 activeSection
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // 行业分类列表
  const industryCategories = [
    '全部行业',
    '内容创作',
    '电商零售',
    '教育培训',
    '生活服务',
    '企业服务',
    '生产制造',
    '金融科技',
    '医疗健康',
    '房产',
    '旅游',
  ];

  const templates: Template[] = [
    {
      id: 'social-media',
      name: '自媒体运营',
      category: '内容创作',
      description: '内容创作、粉丝运营、广告变现',
      features: ['内容日历', 'AI文案生成', '粉丝画像分析', '广告智能报价', '爆文趋势预测', '竞品监控', '流量转化分析', '多平台发布', '评论管理', '私信自动回复'],
      selected: true,
    },
    {
      id: 'ecommerce',
      name: '跨境电商',
      category: '电商零售',
      description: '商品管理、订单处理、供应链优化',
      features: ['库存智能预警', '全链路订单跟踪', '物流自动对接', 'AI选品分析', '动态定价策略', '海外仓管理', '关税计算', '多币种结算', '退换货处理', '好评管理'],
      selected: false,
    },
    {
      id: 'knowledge',
      name: '知识付费',
      category: '教育培训',
      description: '课程制作、学员管理、收益分析',
      features: ['课程版权保护', '学员学习跟踪', '智能收益分成', '完课率深度分析', '复购率预测模型', '社群运营工具', '直播互动', '作业批改', '证书发放', '拼团分销'],
      selected: false,
    },
    {
      id: 'local-life',
      name: '本地生活',
      category: '生活服务',
      description: '门店管理、团购核销、会员运营',
      features: ['多门店管理', '团购活动配置', '核销数据统计', '会员分层运营', '智能优惠券', '评价情感分析', 'LBS精准营销', '到店核销', '外卖对接', '商家联盟'],
      selected: false,
    },
    {
      id: 'saas',
      name: 'SaaS软件',
      category: '企业服务',
      description: '用户增长、订阅管理、客户成功',
      features: ['PLG增长引擎', '灵活订阅计费', '客户健康度监控', '流失预警模型', '产品使用分析', 'NPS自动调研', '客户成功工单', '增购机会识别', '续约提醒', '客户分层运营'],
      selected: false,
    },
    {
      id: 'retail',
      name: '新零售连锁',
      category: '电商零售',
      description: '全渠道销售、会员统一、库存共享',
      features: ['全渠道订单中心', '会员统一画像', '智能补货算法', '促销活动引擎', '导购数字化', '门店自提', '即时零售对接', '品类分析', '价格带管理', '会员权益中心'],
      selected: false,
    },
    {
      id: 'manufacturing',
      name: '智能制造',
      category: '生产制造',
      description: '生产计划、质量控制、设备维护',
      features: ['APS智能排程', '全程质量追溯', '预测性设备维保', '供应商协同平台', '能耗实时监控', '安全生产预警', 'BOM管理', '工艺路线优化', '产能负荷分析', '外协管理'],
      selected: false,
    },
    {
      id: 'logistics',
      name: '智慧物流',
      category: '企业服务',
      description: '运输调度、仓储管理、路径优化',
      features: ['智能调度算法', 'WMS仓储管理', '动态路径规划', '运力智能匹配', '全程时效监控', '成本分析模型', '电子回单', '异常预警', '网点管理', '结算中心'],
      selected: false,
    },
    {
      id: 'finance',
      name: '金融服务',
      category: '金融科技',
      description: '风险评估、投资决策、合规管理',
      features: ['实时风控引擎', '智能投顾组合', '合规自动检查', 'KYC/AML筛查', '反欺诈模型', '征信对接', '产品工厂', '利率定价', '催收管理', '监管报送'],
      selected: false,
    },
    {
      id: 'healthcare',
      name: '医疗健康',
      category: '医疗健康',
      description: '患者管理、诊疗流程、健康档案',
      features: ['智能预约挂号', '结构化电子病历', '慢病随访管理', '远程问诊平台', '处方流转', '药品库存管理', '检验结果查询', '健康档案', '患者教育', '满意度调查'],
      selected: false,
    },
    {
      id: 'education',
      name: '在线教育',
      category: '教育培训',
      description: '课程教学、学习跟踪、家校沟通',
      features: ['互动直播课堂', 'AI作业批改', '学情分析报告', '家校互通平台', '智能题库', '在线考试', '学习路径规划', '教师评价', '课程推荐', '学习进度追踪'],
      selected: false,
    },
    {
      id: 'realestate',
      name: '房地产经纪',
      category: '房产',
      description: '房源管理、客户跟进、交易流程',
      features: ['房源采集发布', '客户跟进系统', 'VR带看', '电子签约', '佣金自动结算', '市场行情分析', '房源勘探', '带看管理', '业绩统计', '房源分销'],
      selected: false,
    },
    {
      id: 'restaurant',
      name: '餐饮连锁',
      category: '电商零售',
      description: '门店运营、菜品管理、供应链采购',
      features: ['云POS收银', '菜品工程管理', '央厨生产管理', '智能采购下单', '标准成本核算', '会员营销引擎', '外卖平台对接', '厨房显示系统', '排队叫号', '扫码点餐'],
      selected: false,
    },
    {
      id: 'beauty',
      name: '美业连锁',
      category: '生活服务',
      description: '预约管理、技师排班、会员卡管理',
      features: ['在线预约', '技师排班', '会员卡系统', '疗程管理', '库存管理', '提成计算', '服务评价', '营销活动', '门店数据分析', '智能提醒'],
      selected: false,
    },
    {
      id: 'fitness',
      name: '健身运动',
      category: '生活服务',
      description: '会员管理、课程预约、体测分析',
      features: ['会员签到', '团课预约', '私教管理', '体测数据分析', '训练计划', '营养建议', '装备租赁', '储物柜管理', '活动发布', '会员社区'],
      selected: false,
    },
    {
      id: 'travel',
      name: '旅游出行',
      category: '旅游',
      description: '行程规划、订单管理、导游服务',
      features: ['智能行程规划', '多产品预订', '导游派单', '电子合同', '保险对接', '评价系统', '会员积分', '营销活动', '财务结算', '数据报表'],
      selected: false,
    },
  ];

  const roles: Role[] = [
    {
      id: 'ceo',
      name: 'CEO/创始人视角',
      metrics: [
        '营收增长率(MoM/YoY)',
        '净利润率',
        '月活跃用户数(MAU)',
        '客户获取成本(CAC)',
        '客户生命周期价值(LTV)',
        'LTV/CAC比率',
        '烧钱率',
        '现金流跑道',
        '单位经济模型',
        '毛利率',
        'EBITDA',
        '净收入留存率(NDR)',
        '客户流失率',
        '员工规模',
        '融资进展'
      ]
    },
    {
      id: 'operator',
      name: '运营总监视角',
      metrics: [
        '日活跃用户数(DAU)',
        'DAU/MAU比率(粘性)',
        '内容/商品发布量',
        '用户互动率',
        '转化漏斗',
        '次日/7日/30日留存率',
        '分享传播率',
        '平均客单价(ARPU)',
        '复购率',
        'GMV',
        '活动ROI',
        '用户路径分析',
        '流失用户召回率',
        '社群活跃度',
        'KOL/KOC转化'
      ]
    },
    {
      id: 'finance',
      name: '财务总监视角',
      metrics: [
        '经营性现金流',
        '自由现金流',
        '收入构成分析',
        '成本结构分析',
        '毛利率',
        '净利率',
        'EBITDA',
        '应收账款周转天数',
        '应付账款周转天数',
        '库存周转率',
        '现金转换周期',
        '资产负债率',
        '收入确认合规性',
        '税务筹划效果',
        '预算执行率'
      ]
    },
    {
      id: 'product',
      name: '产品总监视角',
      metrics: [
        '核心功能使用率',
        '用户满意度(NPS)',
        '产品迭代速度',
        'Bug修复率(SLA)',
        '用户反馈量',
        '功能完成度',
        '技术债务占比',
        '性能指标(P95/P99延迟)',
        '用户路径完成率',
        'A/B测试转化率',
        '功能采纳率',
        '用户画像匹配度',
        '产品市场匹配度(PMF)',
        '版本更新覆盖率',
        '崩溃率'
      ]
    },
    {
      id: 'marketing',
      name: '市场总监视角',
      metrics: [
        '品牌认知度',
        '品牌搜索量',
        '广告ROI(ROAS)',
        '获客成本(CAC)趋势',
        '渠道转化率对比',
        'SEO关键词排名',
        '自然流量增长率',
        '社交媒体声量',
        '内容互动率',
        '营销活动参与率',
        'MQL/SQL转化率',
        '线索质量评分',
        '市场份额',
        '竞品对比分析',
        '客户获取渠道分布',
        '品牌健康度追踪'
      ]
    },
    {
      id: 'sales',
      name: '销售总监视角',
      metrics: [
        '销售漏斗转化率',
        '赢单率',
        '平均销售周期',
        '客单价(ACV)',
        '客户满意度(CSAT)',
        '续约率',
        '增购率',
        '回款周期(DSO)',
        '销售预测准确度',
        '人效(人均产出)',
        '销售活动达标率',
        '客户覆盖度',
        'Pipeline健康度',
        '赢单周期分析',
        '丢单原因分析',
        '交叉销售成功率'
      ]
    },
    {
      id: 'hr',
      name: '人力资源总监视角',
      metrics: [
        '员工满意度(eNPS)',
        '主动离职率',
        '关键岗位流失率',
        '平均招聘周期',
        '人效比(营收/人数)',
        '培训完成率',
        '绩效分布合理性',
        '薪酬竞争力',
        '组织健康度',
        '人才盘点覆盖率',
        '晋升率',
        '内部推荐率',
        '员工敬业度',
        '培训ROI',
        '多元化指标',
        '劳动纠纷率'
      ]
    },
    {
      id: 'tech',
      name: '技术总监视角',
      metrics: [
        '系统可用性(SLA)',
        '平均响应时间',
        'P95/P99延迟',
        '代码质量(测试覆盖率)',
        '部署频率',
        '变更失败率',
        '平均故障恢复时间(MTTR)',
        '安全漏洞数',
        '技术债务偿还进度',
        '技术栈更新率',
        'API调用量&峰值',
        '服务器资源利用率',
        '数据库性能',
        'CI/CD通过率',
        '代码审查效率',
        '研发效能指标(DORA)'
      ]
    },
    {
      id: 'customer',
      name: '客户成功总监视角',
      metrics: [
        '工单处理量',
        '平均响应时间',
        '首次响应时间(FRT)',
        '问题解决率(FCR)',
        '客户满意度(CSAT)',
        '客户努力度(CES)',
        '投诉率',
        '知识库使用率',
        '服务等级协议达成率',
        '客户健康度评分',
        'QBR/EBR执行率',
        '产品功能建议采纳率',
        '客户流失预警准确率',
        'Upsell识别率',
        '客服人效',
        '多渠道服务一致性'
      ]
    },
    {
      id: 'data',
      name: '数据分析师视角',
      metrics: [
        '数据准确性',
        '数据更新时效',
        '报表访问量',
        '自助分析占比',
        '数据需求响应时间',
        '指标体系完整度',
        '数据质量评分',
        '异常检测准确率',
        '预测模型准确度',
        'A/B测试样本量',
        '用户行为覆盖率',
        '数据安全合规',
        '数据治理成熟度',
        'BI系统使用率',
        '数据驱动决策占比',
        '数据资产价值评估'
      ]
    },
    {
      id: 'supplychain',
      name: '供应链总监视角',
      metrics: [
        '供应商准时交货率',
        '库存周转天数',
        '缺货率',
        '库存准确率',
        '采购成本节约率',
        '供应商质量合格率',
        '物流准时送达率',
        '运输成本占比',
        '退货率',
        '供应商响应时间',
        '紧急订单完成率',
        '供应商多元化',
        '供应链风险指数',
        '碳排放指标',
        '采购合规率',
        '仓储利用率'
      ]
    },
    {
      id: 'risk',
      name: '风险控制总监视角',
      metrics: [
        '风险事件数量',
        '风险识别覆盖率',
        '高危风险处置率',
        '风险响应时间',
        '合规检查通过率',
        '审计问题整改率',
        '内控有效性',
        '欺诈识别准确率',
        '信用风险损失率',
        '操作风险损失',
        '流动性风险指标',
        '法律纠纷数量',
        '监管处罚次数',
        '风险报告及时性',
        '风险评估更新频率',
        '风险文化渗透度'
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

  // 根据选中的行业分类筛选模板
  const filteredTemplates = selectedIndustryCategory === '全部行业'
    ? templates
    : templates.filter(t => t.category === selectedIndustryCategory);

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
      <div className="breadcrumb">配置中心 / 个性化定制</div>
      <h1 className="page-title">个性化定制</h1>

      <div className="personalization-layout">
        {/* 预览模式按钮 */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn-primary"
            onClick={() => setShowPreviewModal(true)}
            style={{ padding: '10px 24px' }}
          >
            预览模式
          </button>
        </div>

        {/* 主内容区 */}
        <section>
          {/* 行业模板 */}
          <div className="card" id="industry">
            <h3>行业模板选择</h3>
            <select
              value={selectedIndustryCategory}
              onChange={(e) => setSelectedIndustryCategory(e.target.value)}
              style={{ marginBottom: '16px', padding: '8px 12px', minWidth: '150px' }}
            >
              {industryCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="template-grid">
              {filteredTemplates.map((template) => (
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
            <select
              defaultValue="default"
              style={{ marginBottom: '16px', padding: '8px 12px', minWidth: '200px' }}
            >
              <option value="default">默认配置</option>
              <option value="ceo-growth">CEO增长型模板</option>
              <option value="ceo-stable">CEO稳健型模板</option>
              <option value="ceo-startup">CEO创业型模板</option>
            </select>
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

            {/* CEO工作流 */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e8ebf0' }}>
              <h4 style={{ marginBottom: '12px' }}>CEO工作流</h4>
              <div className="status-row" style={{ marginBottom: '12px' }}>
                <span className="status-item active">每日晨会</span>
                <span className="status-item active">数据复盘</span>
                <span className="status-item">战略对齐</span>
                <span className="status-item">投资路演</span>
              </div>
              <div className="list-card">
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>待办事项</strong>
                </p>
                <label className="checkbox-item" style={{ margin: '4px 0' }}>
                  <input type="checkbox" />
                  审阅昨日核心指标
                </label>
                <label className="checkbox-item" style={{ margin: '4px 0' }}>
                  <input type="checkbox" />
                  批准关键决策事项
                </label>
                <label className="checkbox-item" style={{ margin: '4px 0' }}>
                  <input type="checkbox" />
                  与部门负责人同步进度
                </label>
              </div>
            </div>
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
      </div>

      {/* 全屏预览模态框 */}
      {showPreviewModal && (
        <div className="modal-backdrop show">
          <div className="modal" style={{ maxWidth: '800px', width: '92vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>配置预览</h3>
              <button onClick={() => setShowPreviewModal(false)} style={{ padding: '6px 16px' }}>关闭</button>
            </div>

            <div style={{ background: '#f8faff', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
              <h4 style={{ marginTop: 0, marginBottom: '12px' }}>当前配置概览</h4>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>行业模板</p>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedTemplate}</div>
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {templates.find(t => t.name === selectedTemplate)?.description}
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>角色视角</p>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>{roles.find((r) => r.id === activeRole)?.name}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>发展阶段</p>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  {stages.find((s) => s.id === selectedStage)?.name || '未设置'}
                </div>
                {stageInfo.stage && (
                  <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    已成立 {stageInfo.years}年 {stageInfo.months}月
                  </p>
                )}
              </div>

              <div>
                <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>核心指标</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {roles.find((r) => r.id === activeRole)?.metrics.slice(0, 8).map((metric, index) => (
                    <span key={index} className="status-item active">{metric}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn-outline" onClick={() => setShowPreviewModal(false)}>继续编辑</button>
              <button className="btn-primary" onClick={() => setShowPreviewModal(false)}>保存配置</button>
            </div>
          </div>
        </div>
      )}

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
