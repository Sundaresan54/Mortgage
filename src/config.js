// let URL = "http://localhost:4000"
// if (process.env.REACT_APP_STAGE === 'development') {
//     console.log("jjjjjjjjjjbbbbbb")
//     URL = "http://localhost:4000"
// }
// if (process.env.REACT_APP_STAGE === 'production') {
//     URL = "https://my-json-server-deploy.herokuapp.com"
// }

const dev = {
    url: "http://localhost:5000"

};

const prod = {
    url: "https://my-json-server-deploy.herokuapp.com"
};

const Data = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export {
    // Add common config values here
    Data
};
