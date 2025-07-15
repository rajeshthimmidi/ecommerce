import React from 'react'
import axios from 'axios'
import config from '../../config.json'

export default axios.create(
    {
        baseURL: `${config.backendURL}/api`,
       
    }
);



