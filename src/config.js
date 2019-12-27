
if (process.env.REACT_APP_STAGE === 'development') {
    URL = "http://localhost:4000"
}
if (process.env.REACT_APP_STAGE === 'production') {
    URL = "https://my-json-server-deploy.herokuapp.com"
}

export {
    // Add common config values here
    URL
};