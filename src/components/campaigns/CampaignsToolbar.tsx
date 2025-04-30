
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampaignsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CampaignsToolbar: React.FC<CampaignsToolbarProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            type="text"
            placeholder="البحث عن حملة..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
        </div>

        <Button variant="outline" className="flex items-center">
          <Filter className="ml-2 h-4 w-4" />
          فلترة
          <ChevronDown className="mr-1 h-4 w-4" />
        </Button>
      </div>

      <Button className="bg-brand-800 hover:bg-brand-700" onClick={handleCreateCampaign}>
        <Plus className="ml-2 h-5 w-5" />
        حملة جديدة
      </Button>
    </div>
  );
};

export default CampaignsToolbar;
