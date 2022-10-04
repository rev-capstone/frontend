import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://cappy-env.eba-kyy3baqk.us-east-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://cappyrevaturebucket.s3-website-us-east-1.amazonaws.com',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
}

export default eCommerceClient;