import axios from 'axios';
import { apiUrl } from '../config/appConfig';

export default axios.create({
	baseURL: apiUrl,
	
});