
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function getCampaigns() {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*, audio_files(name, file_path)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('فشل في جلب الحملات');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    toast.error('فشل في جلب الحملات');
    return [];
  }
}

export async function getCampaignById(id: string) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*, audio_files(name, file_path)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching campaign:', error);
      toast.error('فشل في جلب الحملة');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching campaign:', error);
    toast.error('فشل في جلب الحملة');
    return null;
  }
}

export async function createCampaign(campaignData: any) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert(campaignData)
      .select()
      .single();

    if (error) {
      console.error('Error creating campaign:', error);
      toast.error('فشل في إنشاء الحملة');
      return null;
    }

    toast.success('تم إنشاء الحملة بنجاح');
    return data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    toast.error('فشل في إنشاء الحملة');
    return null;
  }
}

export async function updateCampaign(id: string, updateData: any) {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating campaign:', error);
      toast.error('فشل في تحديث الحملة');
      return null;
    }

    toast.success('تم تحديث الحملة بنجاح');
    return data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    toast.error('فشل في تحديث الحملة');
    return null;
  }
}

export async function deleteCampaign(id: string) {
  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting campaign:', error);
      toast.error('فشل في حذف الحملة');
      return false;
    }

    toast.success('تم حذف الحملة بنجاح');
    return true;
  } catch (error) {
    console.error('Error deleting campaign:', error);
    toast.error('فشل في حذف الحملة');
    return false;
  }
}

export async function uploadAudioFile(file: File, userId: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random().toString(36).substring(2)}${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('audio')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      toast.error('فشل في رفع الملف الصوتي');
      return null;
    }

    const { data: audioFile, error: insertError } = await supabase
      .from('audio_files')
      .insert({
        name: file.name,
        file_path: filePath,
        user_id: userId
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting audio file record:', insertError);
      toast.error('فشل في تسجيل الملف الصوتي');
      return null;
    }

    toast.success('تم رفع الملف الصوتي بنجاح');
    return audioFile;
  } catch (error) {
    console.error('Error in upload process:', error);
    toast.error('فشل في عملية رفع الملف الصوتي');
    return null;
  }
}

export async function getAudioFiles() {
  try {
    const { data, error } = await supabase
      .from('audio_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching audio files:', error);
      toast.error('فشل في جلب الملفات الصوتية');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching audio files:', error);
    toast.error('فشل في جلب الملفات الصوتية');
    return [];
  }
}

export async function getAudioFileUrl(filePath: string) {
  try {
    const { data, error } = await supabase
      .storage
      .from('audio')
      .createSignedUrl(filePath, 3600); // URL صالح لمدة 1 ساعة

    if (error) {
      console.error('Error getting audio file URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error getting audio file URL:', error);
    return null;
  }
}

export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return {
      ...data,
      email: user.email
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function updateUserProfile(profileData: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('لم يتم العثور على المستخدم');
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating profile:', error);
      toast.error('فشل في تحديث الملف الشخصي');
      return null;
    }
    
    toast.success('تم تحديث الملف الشخصي بنجاح');
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('فشل في تحديث الملف الشخصي');
    return null;
  }
}

export async function getSubscriptionPlans() {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true });
      
    if (error) {
      console.error('Error fetching subscription plans:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
}

export async function getCurrentSubscription() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*, subscription_plans(*)')
      .eq('user_id', user.id)
      .eq('status', 'نشط')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 يعني لا توجد نتائج
      console.error('Error fetching subscription:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

export async function getContactLists() {
  try {
    const { data, error } = await supabase
      .from('contact_lists')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching contact lists:', error);
      toast.error('فشل في جلب قوائم الاتصال');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching contact lists:', error);
    toast.error('فشل في جلب قوائم الاتصال');
    return [];
  }
}

export async function getContactsInList(listId: string) {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('list_id', listId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching contacts:', error);
      toast.error('فشل في جلب جهات الاتصال');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    toast.error('فشل في جلب جهات الاتصال');
    return [];
  }
}

export async function createContactList(listData: any) {
  try {
    const { data, error } = await supabase
      .from('contact_lists')
      .insert(listData)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating contact list:', error);
      toast.error('فشل في إنشاء قائمة الاتصال');
      return null;
    }
    
    toast.success('تم إنشاء قائمة الاتصال بنجاح');
    return data;
  } catch (error) {
    console.error('Error creating contact list:', error);
    toast.error('فشل في إنشاء قائمة الاتصال');
    return null;
  }
}

export async function addContactsToList(listId: string, contacts: any[]) {
  try {
    // إضافة list_id إلى كل جهة اتصال
    const contactsWithListId = contacts.map(contact => ({
      ...contact,
      list_id: listId
    }));
    
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactsWithListId)
      .select();
      
    if (error) {
      console.error('Error adding contacts:', error);
      toast.error('فشل في إضافة جهات الاتصال');
      return [];
    }
    
    toast.success('تم إضافة جهات الاتصال بنجاح');
    return data;
  } catch (error) {
    console.error('Error adding contacts:', error);
    toast.error('فشل في إضافة جهات الاتصال');
    return [];
  }
}

export async function signUp(email: string, password: string, userData: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName
        }
      }
    });
    
    if (error) {
      console.error('Error signing up:', error);
      toast.error('فشل في إنشاء الحساب');
      return null;
    }
    
    // نقوم بتحديث الملف الشخصي بالمعلومات الإضافية
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: userData.firstName,
          last_name: userData.lastName,
          company_name: userData.companyName,
          phone: userData.phone
        })
        .eq('id', data.user.id);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
      }
    }
    
    toast.success('تم إنشاء الحساب بنجاح');
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    toast.error('فشل في إنشاء الحساب');
    return null;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Error signing in:', error);
      toast.error('فشل في تسجيل الدخول');
      return null;
    }
    
    toast.success('تم تسجيل الدخول بنجاح');
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    toast.error('فشل في تسجيل الدخول');
    return null;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      toast.error('فشل في تسجيل الخروج');
      return false;
    }
    
    toast.success('تم تسجيل الخروج بنجاح');
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    toast.error('فشل في تسجيل الخروج');
    return false;
  }
}

export async function passwordReset(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
    
    if (error) {
      console.error('Error resetting password:', error);
      toast.error('فشل في إرسال رابط إعادة تعيين كلمة المرور');
      return false;
    }
    
    toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    toast.error('فشل في إرسال رابط إعادة تعيين كلمة المرور');
    return false;
  }
}
