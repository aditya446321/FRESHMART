import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (categorySlug: string) => void;
  onOpenAddressModal?: () => void;
  onOpenOrders?: () => void;
  onOpenSupport?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 py-6 pb-24 sm:pb-8 select-none">
      <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600">
        <span className="font-bold text-neutral-900">Freshmart</span>
        <span>•</span>
        <span className="font-medium text-neutral-700">Mumbai</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block" />
      </div>
    </footer>
  );
};
