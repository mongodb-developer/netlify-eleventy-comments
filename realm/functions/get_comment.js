exports = async function({ query, headers, body}, response) {
  
    const commentFilter = { "_id": "" };
    
    if(query.hasOwnProperty("id")) {
      commentFilter["_id"] = BSON.ObjectId(query.id);
    }
    
    const results = await context.services.get("mongodb-atlas").db("netlify").collection("comments").findOne(commentFilter);

    response.setHeader("content-type", "application/json");
    response.setBody(JSON.stringify(results || {}));

};