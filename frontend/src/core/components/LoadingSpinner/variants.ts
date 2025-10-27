import { clsx } from 'clsx';

export interface LoadingSpinnerVariantProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function getLoadingSpinnerClassName(props: LoadingSpinnerVariantProps): string {
  const { size = 'md', className } = props;

  return clsx(
    'animate-spin rounded-full border-t-2 border-b-2 border-primary-600',
    {
      'h-4 w-4': size === 'sm',
      'h-8 w-8': size === 'md',
      'h-12 w-12': size === 'lg',
    },
    className
  );
}
