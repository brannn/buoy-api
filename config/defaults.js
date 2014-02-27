var defaults = {
    api: {
        host: process.env.BUOY_API_HOST,
        port: process.env.BUOY_API_PORT,
        base_path: process.env.BUOY_API_URL
    },
    db: {
        buoy: {
            host: process.env.BUOY_DB_HOST,
            port: process.env.BUOY_DB_PORT,
            table: process.env.BUOY_DB_TABLE
        },
        auth: {
            host: process.env.AUTH_DB_HOST,
            port: process.env.AUTH_DB_PORT,
            table: process.env.AUTH_DB_PORT
        }
    }
};

module.exports = defaults;
