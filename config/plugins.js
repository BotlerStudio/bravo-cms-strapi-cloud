module.exports = () => ({
    'users-permissions': {
        config: {
            // jwt: {
            //     expiresIn: '1m',
            // },
            register: {
                allowedFields: ["provider", "userId", "countryCode", "emailVerified", "phoneNumberVerified", "deviceVerified", "phoneNumber", "provider", "photo"],
            }
        },
    },
});
