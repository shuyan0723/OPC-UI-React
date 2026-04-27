interface TrackingEvent {
  eventName: string;
  page: string;
  action: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp: number;
}

interface TrackingConfig {
  batchSize?: number;
  flushInterval?: number;
  endpoint?: string;
  enabled?: boolean;
}

/**
 * Tracker - 埋点工具类
 * 用于收集用户行为数据并上报
 */
class Tracker {
  private queue: TrackingEvent[] = [];
  private config: Required<TrackingConfig>;
  private flushTimer?: ReturnType<typeof setInterval>;
  private userId: string | null = null;

  constructor(config: TrackingConfig = {}) {
    this.config = {
      batchSize: config.batchSize ?? 10,
      flushInterval: config.flushInterval ?? 30000, // 30秒
      endpoint: config.endpoint ?? '/api/tracking',
      enabled: config.enabled ?? true,
    };

    // 定时上报
    this.startFlushTimer();

    // 页面关闭前上报
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
      window.addEventListener('pagehide', () => this.flush());
    }
  }

  /**
   * 设置用户ID
   */
  setUserId(userId: string) {
    this.userId = userId;
  }

  /**
   * 通用埋点方法
   */
  track(eventName: string, properties?: Record<string, any>) {
    if (!this.config.enabled) return;

    const event: TrackingEvent = {
      eventName,
      page: window.location.pathname,
      action: 'custom',
      properties,
      userId: this.userId ?? undefined,
      timestamp: Date.now(),
    };

    this.queue.push(event);

    if (this.isImportantEvent(eventName) || this.queue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /**
   * 页面浏览埋点
   */
  trackPageView(pageName: string, properties?: Record<string, any>) {
    this.track('page_view', {
      pageName,
      url: window.location.href,
      referrer: document.referrer,
      ...properties,
    });
  }

  /**
   * 按钮点击埋点
   */
  trackClick(buttonName: string, properties?: Record<string, any>) {
    this.track('button_click', {
      buttonName,
      ...properties,
    });
  }

  /**
   * 表单提交埋点
   */
  trackSubmit(formName: string, data?: Record<string, any>) {
    this.track('form_submit', {
      formName,
      ...data,
    });
  }

  /**
   * 工作流操作埋点
   */
  trackWorkflow(action: string, properties?: Record<string, any>) {
    this.track('workflow_action', {
      action,
      ...properties,
    });
  }

  /**
   * AI 助手埋点
   */
  trackAI(action: string, properties?: Record<string, any>) {
    this.track('ai_action', {
      action,
      ...properties,
    });
  }

  /**
   * 错误埋点
   */
  trackError(error: Error | string, context?: Record<string, any>) {
    this.track('error', {
      errorMessage: typeof error === 'string' ? error : error.message,
      errorStack: typeof error === 'string' ? undefined : error.stack,
      ...context,
    });
  }

  /**
   * 性能埋点
   */
  trackPerformance(metrics: Record<string, number>) {
    this.track('performance', metrics);
  }

  /**
   * 判断是否为重要事件（立即上报）
   */
  private isImportantEvent(eventName: string): boolean {
    const importantEvents = ['page_view', 'form_submit', 'purchase', 'error'];
    return importantEvents.includes(eventName);
  }

  /**
   * 启动定时上报
   */
  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  /**
   * 上报数据
   */
  private flush() {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    // 开发环境打印日志
    if (import.meta.env.DEV) {
      console.log('[埋点上报]', events);
    }

    // 发送到后端
    fetch(this.config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
      keepalive: true,
    }).catch((err) => {
      console.error('[埋点上报失败]', err);
      // 失败时重新入队
      this.queue.unshift(...events);
    });
  }

  /**
   * 停止埋点
   */
  destroy() {
    this.config.enabled = false;
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// 导出单例
export const tracker = new Tracker();
