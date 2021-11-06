import SQLite from 'react-native-sqlite-storage';

export const registerTransaction = data => {
  return new Promise((resolve, reject) => {
    // axios.post(`${API_URL}/transactions/register`, data)
    //     .then(res => {
    //         resolve(res.data);
    //     })
    //     .catch(err => {
    //         reject(err);
    //     });
  });
};
