**Two Step Authentication System:**

1. First we login into our system.
2. Then we call the Oauth login screen which gets us the authorization code.
3. The login screen is either available in the EHR system or we need to develop it.
4. Once we obtain the code, we need to post it to the endpoint which gets the authentication bearer token background of the portal screen. This should be done in the init method backend and this code-token pair needs to be stored in the node js cache using the cache controller api.
5. We are not storing in the browser, we are storing the node server cache so that if the instance goes down, it’ll be destroyed. We are not saving in the DB as well. Until we get the EHR system’s approval, we can’t get it done.

AllScripts - Unity and Sunrise application
