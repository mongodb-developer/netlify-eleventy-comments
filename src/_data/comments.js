const { AssetCache } = require("@11ty/eleventy-cache-assets");
const axios = require("axios");

module.exports = async function () {

    const url = `https://us-east-1.aws.data.mongodb-api.com/app/netlify-examples-bjlqp/endpoint/comments`;

    let asset = new AssetCache("comments");

    if (asset.isCacheValid("1d")) {
        return asset.getCachedValue();
    }

    try {
        const response = await axios({
            "method": "GET",
            "url": url
        });
        await asset.save(response.data, "json");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}