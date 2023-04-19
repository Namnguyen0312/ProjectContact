const config = {
    app: {
        port: process.env.PORT || 3600,
    },
    db: {
        url:
            process.env.MONGODB_URI ||
            `mongodb+srv://van:0312@websitecontact.au3nozz.mongodb.net/Project`,
    },
};
module.exports = config;