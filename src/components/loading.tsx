import React from 'react';
import { Loader2, GraduationCap } from 'lucide-react';

interface PageLoadingProps {
  message?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'minimal' | 'dots' | 'pulse' | 'school';
  size?: 'sm' | 'md' | 'lg';
}

export const PageLoading = ({ 
  message = "Loading...", 
  fullScreen = true,
  variant = 'default',
  size = 'md'
}: PageLoadingProps) => {
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center p-8";

  const renderSpinner = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
            {message && (
              <p className="text-sm text-muted-foreground font-medium">{message}</p>
            )}
          </div>
        );

      case 'dots':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            </div>
            {message && (
              <p className="text-sm text-muted-foreground font-medium">{message}</p>
            )}
          </div>
        );

      case 'pulse':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-16 h-16 bg-primary rounded-full animate-ping opacity-25"></div>
            </div>
            {message && (
              <p className="text-sm text-muted-foreground font-medium">{message}</p>
            )}
          </div>
        );

      case 'school':
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground mb-1">School Management System</p>
              {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-border rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <p className="text-lg font-medium text-foreground">{message}</p>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.5s]"></div>
              </div>
              <p className="text-xs text-muted-foreground">Please wait while we load your content</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {renderSpinner()}
      </div>
    </div>
  );
};

// Loading skeleton for specific content areas
export const ContentLoading = ({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) => (
  <div className={`animate-pulse space-y-4 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

// Card loading skeleton
export const CardLoading = ({ count = 1 }: { count?: number }) => (
  <div className="grid gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="border border-border rounded-lg p-6 animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-muted rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </div>
    ))}
  </div>
);

// Table loading skeleton
export const TableLoading = ({ 
  rows = 5, 
  cols = 4 
}: { 
  rows?: number; 
  cols?: number; 
}) => (
  <div className="border border-border rounded-lg overflow-hidden">
    <div className="bg-muted/50">
      <div className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded animate-pulse"></div>
        ))}
      </div>
    </div>
    <div className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-muted rounded"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Demo component showing all variants
const LoadingDemo = () => {
  const [currentVariant, setCurrentVariant] = React.useState<'default' | 'minimal' | 'dots' | 'pulse' | 'school'>('default');
  const [showFullScreen, setShowFullScreen] = React.useState(false);
  
  const variants = [
    { key: 'default', label: 'Default' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'dots', label: 'Dots' },
    { key: 'pulse', label: 'Pulse' },
    { key: 'school', label: 'School Theme' }
  ] as const;

  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Page Loading Components</h1>
        <p className="text-muted-foreground">Different loading variants for your application</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        {variants.map((variant) => (
          <button
            key={variant.key}
            onClick={() => setCurrentVariant(variant.key)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentVariant === variant.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {variant.label}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowFullScreen(true)}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Show Full Screen Loading
        </button>
      </div>

      {/* Preview */}
      <div className="border border-border rounded-lg p-8 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-center">Preview: {variants.find(v => v.key === currentVariant)?.label}</h3>
        <PageLoading
          variant={currentVariant}
          message="Loading your content..."
          fullScreen={false}
        />
      </div>

      {/* Other Loading Components */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Content Loading</h3>
          <div className="border border-border rounded-lg p-4 bg-card">
            <ContentLoading lines={4} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Card Loading</h3>
          <div className="border border-border rounded-lg p-4 bg-card">
            <CardLoading count={2} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Table Loading</h3>
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <TableLoading rows={3} cols={4} />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-2 text-sm font-mono bg-background p-4 rounded border">
          <div>{'// Full screen loading'}</div>
          <div>{'<PageLoading message="Loading dashboard..." />'}</div>
          <div className="mt-2">{'// Inline loading'}</div>
          <div>{'<PageLoading fullScreen={false} variant="minimal" />'}</div>
          <div className="mt-2">{'// Content skeleton'}</div>
          <div>{'<ContentLoading lines={5} />'}</div>
          <div className="mt-2">{'// Card skeleton'}</div>
          <div>{'<CardLoading count={3} />'}</div>
        </div>
      </div>

      {/* Full Screen Demo */}
      {showFullScreen && (
        <PageLoading
          variant="school"
          message="Loading School Management System..."
        >
          <button
            onClick={() => setShowFullScreen(false)}
            className="absolute top-4 right-4 bg-background/80 text-foreground px-4 py-2 rounded-lg hover:bg-background transition-colors"
          >
            Close
          </button>
        </PageLoading>
      )}
    </div>
  );
};

export default LoadingDemo;