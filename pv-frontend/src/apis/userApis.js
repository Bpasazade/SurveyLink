import axios from 'axios';

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

export async function getUsersByCompanyId(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/users-all/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
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

// Get Company Target List
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

// Get Group Target List
export async function getGroupTargetList(campaign, groups) {
  try {
    // send groups as query
    const response = await axios.get('http://localhost:3000/groups-target-list', { params: { campaign, groups } });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Update group
export async function updateGroup(groupId, name, companyId) {
  try {
    const response = await axios.put(`http://localhost:3000/groups/${groupId}`, { name, companyId });
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
export async function createCampaign(name, description, companyId, groups) {
  try {
    const response = await axios.post('http://localhost:3000/campaigns', { name, description, companyId, groups });
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
export async function createSms(title, message, groupId, date, companyId) {
  try {
    const response = await axios.post('http://localhost:3000/sms', { title, message, groupId, date, companyId });
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

// Excel File Upload Api
export async function uploadExcelFile(file, companyId, groupId) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyId', companyId);
    formData.append('groupId', groupId);
    const response = await axios.post('http://localhost:3000/uploadExcelFile', formData);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get Survey Stats
export async function getSurveyStats(company, campaign) {
  try {
    const response = await axios.get(`http://localhost:3000/survey?company=${company}&campaign=${campaign}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get All Survey Stats
export async function getAllSurveyStats(company) {
  try {
    const response = await axios.get(`http://localhost:3000/surveyAll?company=${company}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Ejs File
export async function getEjsFileAsString(fileName) {
  try {
    const response = await axios.get('http://localhost:3000/getEjsFile', { params: { fileName } });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}