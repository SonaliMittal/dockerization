const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if(!req.headers.authorization){
       return res.status(401).send("unauthorized user1")
    }
    let bearerToken = req.headers.authorization.split(' ');
    if(bearerToken==='null'){
        return res.status(401).send("unauthorized user2")
    }
    try{
    var payload=jwt.verify(bearerToken[1], 'sercetkey')
    if(!payload){
        return res.status(401).send("unauthorized user3")
    }
    else{
        next()
    }
    }
    catch(err){
        return res.status(500).send(err.message)
    }
       
       
        // } else {
        //     if ( decoded.resourceIds.includes(process.env.RESOURCE_ID) ) {
        //         next()
        //     } else {
           //     res.send("You are not authorized to access this API");
          //  }
       // }
    
  }