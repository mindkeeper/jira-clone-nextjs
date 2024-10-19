import { cn } from '@/lib/utils';
import React from 'react';

interface IDottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: 'horizontal' | 'vertical';
}

// export a forwardref insttead of a normal function and dont forget to add the type of the ref and dont make the styling
export const DottedSeparator = React.forwardRef<HTMLDivElement, IDottedSeparatorProps>(
  ({ className, color = '#d4d4d8', height = '2px', dotSize = '6px', gapSize = '6px', direction = 'horizontal' }, ref) => {
    const isHorizontal = direction === 'horizontal';
    return (
      <div ref={ref} className={cn(isHorizontal ? 'h-full' : 'w-full flex-col', 'flex items-center', className)}>
        <div
          className={cn(isHorizontal ? 'flex-grow' : 'flex-grow-0')}
          style={{
            width: isHorizontal ? '100%' : height,
            height: isHorizontal ? height : '100%',
            backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
            backgroundSize: isHorizontal
              ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
              : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
            backgroundRepeat: isHorizontal ? 'repeat-x' : 'repeat-y',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    );
  }
);

DottedSeparator.displayName = 'DottedSeparator';
