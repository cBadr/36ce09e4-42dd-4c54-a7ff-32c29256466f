
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { getCampaigns } from '@/integrations/supabase/helper';
import { toast } from 'sonner';
import CampaignsToolbar from '@/components/campaigns/CampaignsToolbar';
import CampaignsList from '@/components/campaigns/CampaignsList';
import { Campaign } from '@/types/campaign';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('فشل في جلب الحملات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="الحملات الإعلانية">
      {/* أدوات التحكم والفلترة */}
      <CampaignsToolbar 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* عرض الحملات */}
      <Card>
        <CardContent className="p-0">
          <CampaignsList 
            campaigns={filteredCampaigns}
            isLoading={isLoading}
            onCampaignsChanged={fetchCampaigns}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Campaigns;
