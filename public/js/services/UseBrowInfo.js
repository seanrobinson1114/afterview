(function () {
  let uname_url = location.protocol + '//' + location.host + '/uinf/uname',
      token_url = location.protocol + '//' + location.host + '/getToken';

  if( window.localStorage )
  {
    // Check for username and make request if it doesn't exist
    if( localStorage.getItem( 'username' ) == undefined )
    {
      // Create request and initialize
      let req = new XMLHttpRequest();
      req.open( 'GET', uname_url, true );

      // Check if request is complete on any state change
      req.onreadystatechange = function()
      {
        console.log( 'checking for response from username request' );

        if( req.readyState === XMLHttpRequest.DONE && req.status === 200 )
        {
          localStorage.setItem( 'username', JSON.parse( req.responseText ) );
          document.getElementById( 'login_link' ).innerHTML = '<span class="glyphicon glyphicon-user"></span>' + JSON.parse( req.responseText );
        }
      };

      // Send request
      req.send();
    }
    else
      document.getElementById( 'login_link' ).innerHTML = '<span class="glyphicon glyphicon-user"></span>' + localStorage.getItem( 'username' );
  }

  // Attempt to get token from server if it doesn't exist
  if( !localStorage.getItem( 'token' ) )
  {
    // Create request for token
    let req = new XMLHttpRequest();
    req.open( 'GET', token_url, true );

    // Check if request is complete on any state change
    req.onreadystatechange = function()
    {
      console.log( 'checking for response from token request' );

      if( req.readyState === XMLHttpRequest.DONE && req.status === 200 )
      {
        localStorage.setItem( 'token', JSON.parse( req.responseText ) );
      }
    };

    // Send request
    req.send();
  }
}());
