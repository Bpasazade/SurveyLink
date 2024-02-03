import axios from 'axios';

export async function registerUser(user) {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup', {...user});

        if (response.status !== 200) {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Bu email zaten kayıtlı!");
        } else if (error.response.status === 401) {
          alert("Bu numara zaten kayıtlı!");
        }
      }
    }
}

export async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(_id) {
  try {
    const response = await axios.delete(`http://localhost:3000/users/${_id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(_id, editedUser) {
  try {
    const response = await axios.put(`http://localhost:3000/users/${_id}`, editedUser);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerCompany(companyName, companyAddress) {
  try {
    const response = await axios.post('http://localhost:3000/companies', { companyName, companyAddress });
    window.location.reload();
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert('Bu şirket zaten kayıtlı!');
      }
    }

    throw error; // rethrow the error to propagate it to the caller
  }
}

export async function getAllCompanies() {
  try {
    const response = await axios.get('http://localhost:3000/companies');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompany(_id) {
  try {
    const response = await axios.get(`http://localhost:3000/companies/${_id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompanyByName(companyName) {
  try {
    const response = await axios.get(`http://localhost:3000/companies/name/${companyName}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCompany(_id, editedCompany) {
  try {
    console.log(editedCompany);
    const response = await axios.put(`http://localhost:3000/companies/${_id}`, { editedCompany });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCompany(_id) {
  try {
    const response = await axios.delete(`http://localhost:3000/companies/${_id}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// All Campaigns
export async function getAllCampaigns() {
  try {
    const response = await axios.get('http://localhost:3000/campaigns');
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch(error) {
    throw error;
  }
}