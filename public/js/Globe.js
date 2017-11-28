function init()
{
  // Create scene, camera, and renderer
  var scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 ),
      renderer = new THREE.WebGLRenderer( { antialiasing: true } );

  // Set size of renderer and append to html
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Create earth mesh
  var globe = new THREE.Mesh(
    new THREE.SphereGeometry( 1.5, 32, 32 ),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load( 'images/earth.jpg' ),
      bumpMap: new THREE.TextureLoader().load( 'images/earthbump.jpg' ),
      bumpScale: 0.01,
      specularMap: new THREE.TextureLoader().load( 'images/earthspecular.png' ),
      specular: new THREE.Color( 'grey' )
    })
  );

  // Create cloud mesh
  var clouds = new THREE.Mesh(
    new THREE.SphereGeometry( 1.53, 32, 32 ),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load( 'images/earthclouds.png' ),
      transparent: true
    })
  );

  // Create startfield mesh
  var starfield = new THREE.Mesh(
    new THREE.SphereGeometry( 90, 64, 64 ),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load( 'images/galaxy_starfield.png' ),
      side: THREE.BackSide
    })
  );

  // Create ambient light
  var amb_light = new THREE.AmbientLight( 0x686868 );

  // Create directional light and set its position
  var dir_light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  dir_light.position.set( 5, 3, 5 );

  // Create controls
  var controls = new THREE.TrackballControls( camera );

  // Add everything to scene
  scene.add( globe )
  scene.add( clouds );
  scene.add( starfield );
  scene.add( amb_light );
  scene.add( dir_light );

  // Move camera out
  camera.position.z = 5;

  render();

  // Renders scene
  function render()
  {
    controls.update();
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }
}
