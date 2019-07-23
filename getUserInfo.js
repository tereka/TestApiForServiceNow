try {
    // Init Request
    var request = new sn_ws.RESTMessageV2();
    request.setHttpMethod('get');
    request.setEndpoint('http://192.168.100.102:3000/userinfo');

    //override authentication profile 
    //authentication type ='basic'/ 'oauth2'
    //request.setAuthentication(authentication type, profile name);

    //set a MID server name if one wants to run the message on MID
    request.setMIDServer('kawasaki');

    // Init Response
    var response = request.execute();
    var httpResponseStatus = response.getStatusCode();
    var httpResponseContentType = response.getHeader('Content-Type');
    var parser = new global.JSONParser();
    var parsed = {};
    var httpResponseBody;

    gs.debug("http response status_code: " + httpResponseStatus);
    gs.debug("http response content-type: " + httpResponseContentType);

    //  if request is successful then parse the response body
    if (httpResponseStatus == 200 && httpResponseContentType == 'text/html; charset=utf-8') {
        httpResponseBody = response.getBody();
        //  parse JSON string returned from request into a json object
        parsed = parser.parse(httpResponseBody);
        //gs.debug('parsed.length = ' + parsed.length);
        var gr = new GlideRecord('u_demo_table');
        // iterate over JSON object only printing the id property of JSON objects in results array
        for (var i = 0; i < parsed.length; i++) {
            gs.debug('i=' + i + ', name=' + parsed[i].name + ', email=' +  parsed[i].email);

            // insert data to user info table in servicenow 
            gr.initialize();
            gr.u_name = parsed[i].name; 
            gr.u_email = parsed[i].email; 
            gr.insert();
        }
    }
}
catch (ex) {
    var message = ex.getMessage();
    gs.debug(message);
}
