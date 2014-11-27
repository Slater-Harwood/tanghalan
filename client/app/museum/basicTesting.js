//'use strict';

angular.module('museumApp')
  .controller('MuseumCtrl', function ($scope, $state, BrooklynMuseum) {


    BrooklynMuseum.getCollection($state.params.paintingSlug).success(function (data) {

      function animate(data) {
        // update
        var time = (new Date()).getTime();
        var timeDiff = time - lastTime;
        var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
        sphere.rotation.y += angleChange;
        cube.rotation.x += angleChange;
        lastTime = time;

        // render
        renderer.render(scene, camera);

        // request new frame
        requestAnimationFrame(function () {
          animate();
        });
        controls.update();

      }
      // revolutions per second
      var angularSpeed = 0.2;
      var lastTime = 0;

      // this function is executed on each animation frame

      // renderer
      var scene = new THREE.Scene();
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // camera
      var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
      var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 40000;
      var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
      scene.add(camera);
      camera.position.set(0,100,400);
      camera.lookAt(scene.position);

      // scene


      // material
      var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(data.images[0]),
        shininess: 4.0,
        bumpMap: THREE.ImageUtils.loadTexture(data.images[0]),
        bumpScale: 2
      });
      var material2 = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(data.images[1]),
        shininess: 45.0
      })

      // cube
      var sphere = new THREE.Mesh(new THREE.SphereGeometry(125, 32, 32, 5), material2);
      var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), material);
      cube.overdraw = true;
      cube.rotation.x = Math.PI * 0.1;
      sphere.position.x = 0;

      scene.add(cube);
      scene.add(sphere);

      // add subtle ambient lighting
      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
      scene.add(ambientLight);

      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
      var controls = new THREE.TrackballControls( camera );
      controls.target.set( 0, 0, 0 )

      var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

      var materialArray = [];
      for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture( data.images[i+4] ),
          side: THREE.BackSide
        }));
      var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
      var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
      scene.add( skyBox );


      // start animation
      animate(data);

    });


  });

/*var loader = new THREE.JSONLoader(),
 callbackKey = function(geometry) {createScene(geometry,  0, 0, 0, 15, "Well.json")};
 loader.load("Well.json", callbackKey);

 function createScene(geometry, x, y, z, scale, tmap) {
 zmesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture(tmap)}));
 zmesh.position.set(x, y, z);
 zmesh.scale.set(scale, scale, scale);
 meshes.push(zmesh);
 scene.add(zmesh);
 }*/
