export const URL_HOST = 
process.env.NODE_ENV === "production"
    ? "http://ytcbackend-env.eba-rxeyz2ny.us-east-2.elasticbeanstalk.com"
    : "http://127.0.0.1:8000/api";


    // import into files that call database