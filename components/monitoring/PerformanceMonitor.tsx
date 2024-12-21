'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PerformanceMonitor = () => {
  const pathname = usePathname();

  useEffect(() => {
    const reportPerformance = () => {
      if (typeof window === 'undefined') return;

      // 等待所有关键资源加载完成
      window.addEventListener('load', () => {
        // 使用 requestIdleCallback 在浏览器空闲时收集性能数据
        requestIdleCallback(() => {
          const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const paintData = window.performance.getEntriesByType('paint');
          const resourceData = window.performance.getEntriesByType('resource');

          // 收集关键性能指标
          const metrics = {
            // 页面加载时间
            pageLoadTime: perfData.loadEventEnd - perfData.startTime,
            // DOM内容加载时间
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.startTime,
            // 首次内容绘制时间
            firstContentfulPaint: paintData.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            // 资源加载时间
            resourceLoadTime: resourceData.reduce((total, resource) => total + resource.duration, 0),
            // 资源数量
            resourceCount: resourceData.length,
            // 页面路径
            pathname,
            // 时间戳
            timestamp: new Date().toISOString(),
          };

          // 发送性能数据到分析服务
          // 这里可以根据实际需求发送到不同的服务
          console.log('Performance Metrics:', metrics);

          // 如果性能指标超过阈值，发送警告
          if (metrics.pageLoadTime > 3000) { // 3秒
            console.warn('Page load time exceeded threshold:', metrics.pageLoadTime);
          }

          // 清除性能条目以避免内存泄漏
          window.performance.clearResourceTimings();
        });
      });
    };

    reportPerformance();

    // 监听路由变化
    return () => {
      // 清理工作
    };
  }, [pathname]);

  return null;
};

export default PerformanceMonitor; 