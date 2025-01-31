import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Calculator className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built with{' '}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              React
            </a>
            . Open source on{' '}
            <a
              href="https://github.com/yourusername/calclytics"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/about" className="text-sm underline underline-offset-4">
            About
          </Link>
          <Link to="/privacy" className="text-sm underline underline-offset-4">
            Privacy
          </Link>
          <Link to="/terms" className="text-sm underline underline-offset-4">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;