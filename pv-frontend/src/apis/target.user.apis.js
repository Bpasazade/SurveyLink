import axios from 'axios';

// Save answer
export async function saveAnswer(id, company_id, campaign_id, answer) {
    try {
        const response = await axios.post(`http://localhost:3000/answer?id=${id}&company=${company_id}&campaign=${campaign_id}&answer=${answer}`);
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}
// Check User Responsed
export async function checkUserResponsed(id, campaign_id) {
    try {
        const response = await axios.get(`http://localhost:3000/checkUserResponsed?id=${id}&campaign=${campaign_id}`);
        if (response.status !== 200) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}