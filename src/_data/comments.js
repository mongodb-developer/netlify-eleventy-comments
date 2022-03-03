const { AssetCache } = require("@11ty/eleventy-cache-assets");
const axios = require("axios");
const commentPreloader = require("../../functions/get_comments/get_comments").handler;

module.exports = async function () {

    // const url = `https://us-east-1.aws.data.mongodb-api.com/app/netlify-examples-bjlqp/endpoint/comments`;
    const url = `${process.env.URL}/.netlify/functions/get_comments`;

    let asset = new AssetCache("comments");

    if (asset.isCacheValid("1d")) {
        return asset.getCachedValue();
    }

    try {
        // const response = await axios({
        //     "method": "GET",
        //     "url": url
        // });
        // await asset.save(response.data, "json");
        // return response.data;
        const response = await commentPreloader({ queryStringParameters: {} }).then(response => JSON.parse(response.body));
        await asset.save(response, "json");
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }

}