import axios from 'axios';

export async function signIn(email, password, rememberMe) {
  try {
    const response = await axios.post('http://localhost:3000/auth/signin', { email, password, rememberMe });

    if (response.status !== 200) {
      return response.data;
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
    if (error.response) {
      if (error.response.status === 400) {
        alert("Bu grup ismi zaten kullanılmaktadır. Lütfen başka bir grup ismi giriniz.");
      }
    }
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

// Delete group
export async function deleteGroup(panelGroupID, groupId) {
  try {
    const response = await axios.delete(`http://localhost:3000/groups/${groupId}/${panelGroupID}`);
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
export async function createCampaign(templateName, name, description, companyId, groups) {
  try {
    const response = await axios.post('http://localhost:3000/campaigns', { templateName, name, description, companyId, groups });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert("Bu kampanya ismi zaten kullanılmaktadır. Lütfen başka bir kampanya ismi giriniz.");
      }
    }
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

// Get campaign by id
export async function getCampaignById(campaignId) {
  try {
    const response = await axios.get(`http://localhost:3000/campaigns/campaign/${campaignId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Update campaign
export async function updateCampaign(campaignId, name, description, companyId, groups) {
  try {
    const response = await axios.put(`http://localhost:3000/campaigns/${campaignId}`, { name, description, companyId, groups });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Update campaign status
export async function updateCampaignStatus(campaignId, status) {
  try {
    const response = await axios.put(`http://localhost:3000/campaigns/status/${campaignId}`, { status });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Delete campaign
export async function deleteCampaign(campaignId) {
  try {
    const response = await axios.delete(`http://localhost:3000/campaigns/${campaignId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Sms Apis
// Create sms
export async function createSms(title, message, campaignId, groupId, companyId) {
  try {
    const response = await axios.post('http://localhost:3000/sms', { title, message, campaignId, groupId, companyId });
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
export async function updateSms(smsId, message, group, companyId, campaignId) {
  try {
    console.log(campaignId);
    const response = await axios.put(`http://localhost:3000/sms/${smsId}`, { message, group, companyId, campaignId });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Delete sms
export async function deleteSms(smsId) {
  try {
    const response = await axios.delete(`http://localhost:3000/sms/${smsId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Sent Sms
export async function getSentSms(companyId) {
  try {
    const response = await axios.get(`http://localhost:3000/sms/sent/${companyId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Campaign Sent Sms
export async function getCampaignSentSms(campaignId) {
  try {
    const response = await axios.get(`http://localhost:3000/sms/campaign/${campaignId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error){
    throw error;
  }
}

// Excel File Upload Api
export async function uploadExcelFile(file, companyId, groupId, panelGroupID) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyId', companyId);
    formData.append('groupId', groupId);
    formData.append('panelGroupID', panelGroupID);
    const response = await axios.post('http://localhost:3000/uploadExcelFile', formData);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get Target User
export async function getTargetUser(id) {
  try {
    const response = await axios.get(`http://localhost:3000/target-users/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Target Users By Group Id
export async function getTargetGSMByGroupId(groupId) {
  try {
    const response = await axios.get(`http://localhost:3000/getTargetGSMByGroup/${groupId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Create Target User
export async function createTargetUser(name, phoneNumber, location, group, company, panelGroupID) {
  try {
    const response = await axios.post('http://localhost:3000/target-user', { name, phoneNumber, location, group, company, panelGroupID });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Delete Target User
export async function deleteTargetUser(targetUserId, groupId, panelGroupID, phoneNumber) {
  try {
    console.log(targetUserId, groupId);
    const response = await axios.delete('http://localhost:3000/target-user', { data: { targetUserId, groupId, panelGroupID, phoneNumber } });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Update Target User
export async function updateTargetUser(targetUserId, editedUser) {
  try {
    const response = await axios.put(`http://localhost:3000/target-user/${targetUserId}`, { editedUser });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
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



// Get Cities
export async function getCities() {
  try {
    const response = await axios.get('http://localhost:3000/cities');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Districts
export async function getDistricts(city) {
  try {
    const response = await axios.get(`http://localhost:3000/cities/${city}/districts`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Neighborhoods
export async function getNeighborhoods(city, district) {
  try {
    const response = await axios.get(`http://localhost:3000/cities/${city}/districts/${district}/neighborhoods`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Send Sms
export async function sendSms(message, phoneNumbers, date, sms) {
  try {
    const response = await axios.post('http://localhost:3000/send-sms', { message, phoneNumbers, date, sms });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}

// Get Template
export async function getTemplate(campaignId) {
  try {
    const response = await axios.get(`http://localhost:3000/getTemplate/${campaignId}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error){
    throw error;
  }
}