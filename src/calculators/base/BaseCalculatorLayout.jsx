import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, RotateCcw, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const BaseCalculatorLayout = ({ 
  title, 
  description, 
  children,
  onShare,
  onReset,
  result,
  hideResult = false 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!result) return;
    
    try {
      const shareText = `${title}\n${JSON.stringify(result, null, 2)}`;
      
      if (navigator.share) {
        await navigator.share({
          title,
          text: shareText
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 transition-colors duration-200">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="relative">
          <div className="absolute right-6 top-6 flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onReset}
              className="rounded-full"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleShare}
              disabled={!result}
              className="rounded-full"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {children}
            
            {!hideResult && result && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg space-y-4 animate-in fade-in-50">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-lg font-semibold">
                      {typeof value === 'number' ? value.toFixed(2) : value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          {copied && (
            <span className="text-sm text-muted-foreground mr-2">
              Copied to clipboard!
            </span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BaseCalculatorLayout;