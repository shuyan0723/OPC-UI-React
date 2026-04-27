import { useEffect, useCallback, useRef } from 'react';
import { tracker } from '@utils/tracking';

/**
 * useTracking - 页面埋点 Hook
 * 自动记录页面访问和离开
 */
export function useTracking(pageName: string, properties?: Record<string, any>) {
  const enterTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // 页面进入时记录
    tracker.trackPageView(pageName, properties);

    return () => {
      // 页面离开时记录停留时长
      const duration = Date.now() - enterTimeRef.current;
      tracker.track('page_leave', {
        pageName,
        duration,
        durationSeconds: Math.floor(duration / 1000),
      });
    };
  }, [pageName]);
}

/**
 * useTrackClick - 点击埋点 Hook
 * 返回一个包装了埋点的点击处理函数
 */
export function useTrackClick(elementName: string, properties?: Record<string, any>) {
  return useCallback(() => {
    tracker.trackClick(elementName, properties);
  }, [elementName, properties]);
}

/**
 * useTrackVisibility - 元素可见性埋点 Hook
 * 记录元素是否被用户看到
 */
export function useTrackVisibility(
  elementName: string,
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.5, rootMargin = '0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tracker.track('element_visible', {
              elementName,
              intersectionRatio: entry.intersectionRatio,
            });
            // 只记录一次可见
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => observer.disconnect();
  }, [elementName, threshold, rootMargin]);
}

/**
 * useTrackScroll - 滚动埋点 Hook
 * 记录页面滚动深度
 */
export function useTrackScroll(thresholds: number[] = [25, 50, 75, 90, 100]) {
  useEffect(() => {
    let triggeredThresholds: number[] = [];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !triggeredThresholds.includes(threshold)) {
          tracker.track('scroll_depth', {
            percent: threshold,
            maxPercent: scrollPercent,
          });
          triggeredThresholds.push(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);
}

/**
 * useTrackError - 错误埋点 Hook
 * 自动捕获组件内的错误
 */
export function useTrackError(componentName: string, error?: Error) {
  useEffect(() => {
    if (error) {
      tracker.trackError(error, { componentName });
    }
  }, [componentName, error]);
}
