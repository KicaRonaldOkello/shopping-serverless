const verifyToken = async (idToken) => {
    function getKey(header, callback){
      client.getSigningKey(header.kid, function(err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    }
  
    return new Promise((res, rej) => {
      jwt.verify(idToken, getKey, {}, function(err, decoded) {
        if (err) { rej(err) }
        res(decoded)
      })
    })
  }