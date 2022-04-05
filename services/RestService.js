const RESOURCE_NAME = 'RestService.svc';

export default {
  login(userName, password) {
    const params = {userName, password};
    return axios.get(`${RESOURCE_NAME}/Login`, {params});
  },
};
