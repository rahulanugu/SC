const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
/**
 * The contoller is used to serve the needs of the careers portal of the
 * web application.
 */
 const getClient = () => {
   //Creating a new oauthclientt for mailing
   client = new OAuth2(
    "Y16828344230-21i76oqle90ehsrsrpptnb8ek2vqfjfp.apps.googleusercontent.com",
    "ZYdS8bspVNCyBrSnxkMxzF2d",
    "https://developers.google.com/oauthplayground"
  );

  //Seting credentials for oauthclient
  client.setCredentials({
    refresh_token:
      "ya29.GluBB_c8WGD6HI2wTAiAKnPeLap6FdqDdQYhplWyAPjw_ZBSNUNEMOfmsrVSDoHTAZWc8cjKHXXEEY_oMVJUq4YaoSD1LLseWzPNt2hcY2lCdhXAeuCxvDPbl6QP"
  });
  
  return client;
}

module.exports.getClient = getClient;