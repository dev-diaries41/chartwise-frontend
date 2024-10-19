'use client'
import React from'react';

interface LoadingIndicatorProps {
  size?: number; // size of the loading indicator (default: 40)
  color?: string; // color of the loading indicator (default: #3498db)
  duration?: number; // duration of the animation (default: 1500)
}

export default React.memo(function CircleLoadingIndicator ({
  size = 24,
  color = '#3498db',
  duration = 1500,
}: LoadingIndicatorProps) {
  const SCALE_RATIO = 1/5

  return (
    <div
      className={`p-4 loading-indicator animate`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
      }}
    >
    </div>
  );
});