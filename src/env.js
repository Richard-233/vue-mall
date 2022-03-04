let baseURL;
switch (process.env.NODE_ENV){
    case 'dev':
        baseURL = 'http://localhost:3366/api'
        break;
    case 'test':
        baseURL = 'http://localhost:3366/api'
        break;
    case 'prod':
        baseURL = 'http://localhost:3366/api'
        break;
    default:
        break;
}

export default {
    baseURL
}
