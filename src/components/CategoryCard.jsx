import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

const CategoryCard = ({ name, count, slug }) => {
  return (
    <Link to={`/category/${slug}`} className="block transition-transform hover:scale-105">
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{count} calculators</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
