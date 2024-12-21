"use client";

import { useEffect } from "react";
import { requestIdleCallback } from "@/lib/utils";

export default function PerformanceMonitor() {
  useEffect(() => {
    // 使用 requestIdleCallback 在浏览器空闲时收集性能数据
    requestIdleCallback(() => {
      if (typeof window !== "undefined" && "performance" in window) {
        // 获取性能指标
        const performanceMetrics = {
          // 导航计时
          navigationTiming: performance.getEntriesByType("navigation")[0],
          // 资源加载计时
          resourceTiming: performance.getEntriesByType("resource"),
          // 首次内容绘制
          fcp: performance.getEntriesByName("first-contentful-paint")[0],
          // 最大内容绘制
          lcp: performance.getEntriesByName("largest-contentful-paint")[0],
          // 首次输入延迟
          fid: performance.getEntriesByName("first-input-delay")[0],
          // 累积布局偏移
          cls: performance.getEntriesByName("cumulative-layout-shift")[0],
        };

        // 这里可以将性能数据发送到分析服务
        console.log("Performance Metrics:", performanceMetrics);
      }
    });
  }, []);

  return null;
} 