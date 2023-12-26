import axios from 'axios';
import { get } from 'svelte/store';

export async function signIn(email, password) {
  try {
    const response = await axios.post('http://localhost:3000/auth/signin', { email, password });

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    const { user } = response.data;
    if (user) {
      await axios.post('http://localhost:3000/auth/storeUserIdInSession', { userId: user._id });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await axios.get('http://localhost:3000/auth/signout');

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDashboard(_id, accessToken) {
  try {
    const headers = {
      'x-access-token': accessToken,
    };

    const response = await axios.get(`http://localhost:3000/users/${_id}`, { headers });

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }

    return response
  } catch (error) {
    throw error;
  }
}

export async function getUser(_id) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${_id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data
  } catch (error) {
    throw error;
  }
}

export async function getCompanyUsers(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompanyCampaigns(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/campaigns/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Group Apis
// Create group
export async function createGroup(name, companyId) {
  try {
    const response = await axios.post('http://localhost:3000/groups', { name, companyId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get groups by company id
export async function getGroups(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/groups/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get Group List
export async function getCompanyTargetList(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/groups/list/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Campaign Apis
// Create campaign
export async function createCampaign(name, description, companyId) {
  try {
    const response = await axios.post('http://localhost:3000/campaigns', { name, description, companyId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get campaigns by company id
export async function getCampaigns(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/campaigns/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Update campaign
export async function updateCampaign(campaignId, name, description, companyId) {
  try {
    const response = await axios.put(`http://localhost:3000/campaigns/${campaignId}`, { name, description, companyId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Sms Apis
// Create sms
export async function createSms(message, groupId, date, companyId) {
  try {
    const response = await axios.post('http://localhost:3000/sms', { message, groupId, date, companyId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get sms by company id
export async function getSms(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/sms/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Update sms
export async function updateSms(smsId, message, group, date, companyId) {
  try {
    const response = await axios.put(`http://localhost:3000/sms/${smsId}`, { message, group, date, companyId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}