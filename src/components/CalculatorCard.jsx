import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CalculatorCard = ({ name, description, categoryId, calculatorId }) => {
  return (
    <Link 
      to={`/${categoryId}/${calculatorId}`} 
      className="block transition-transform hover:scale-105"
    >
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">{name}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-primary">
            Use Calculator <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CalculatorCard;
