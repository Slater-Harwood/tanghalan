//'use strict';

angular.module('museumApp')
  .controller('MuseumCtrl', function ($scope, $state, BrooklynMuseum) {


    BrooklynMuseum.getCollection($state.params.slug).success(function(data){
      var canvas = document.getElementById("renderCanvas");


      var engine = new BABYLON.Engine(canvas, true);
      var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        scene.collisionsEnabled = true;


        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);
//x: 7.109568068659977y: 3.0057134263821905z: 18.54911231832507
        //x: 0.04702289589105004, y: 3.012316819008802, z: 0,

        camera2 = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(7.1, 3, 18.54), scene);
        camera2.rotation = {x: 0, y: 3, z: 0};

        camera2.attachControl(canvas, true);
        camera2.maxZ = 1000000.0;
        camera2.keysUp = [87]; // w
        camera2.keysDown = [83]; // s
        camera2.keysLeft = [65]; // a
        camera2.keysRight = [68]; // d
        camera2.applyGravity = false;
        camera2.ellipsoid = new BABYLON.Vector3(1, 1, 1);

        camera2.checkCollisions = true;

        light0 = new BABYLON.PointLight("pointlight", new BABYLON.Vector3(20, 0, 5), scene);
        light0.diffuse = new BABYLON.Color3(0.2, 0.6, 0.8);
        light0.specular = new BABYLON.Color3(1, 1, 1);



        var materialBox = new BABYLON.StandardMaterial("materialBox", scene);
        materialBox.diffuseTexture = new BABYLON.Texture('data:my_image_name', scene, true, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE, null, null, data.images[15], false);
        materialBox.diffuseTexture.uScale = 10.0;//Repeat 5 times on the Vertical Axes
        materialBox.diffuseTexture.vScale = 10.0;//Repeat 5 times on the Horizontal Axes
        materialBox.backFaceCulling = false;//Allways show the front and the back of an element

        ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", data.images[6], 200, 200, 250, 0, 10, scene, false);
        materialBox.bumpTexture = new BABYLON.Texture("app/museum/bumpmaps/dirt1.png", scene);
        materialBox.specularTexture = new BABYLON.Texture('data:my_image_name2', scene, true, true, BABYLON.Texture.BILINEAR_SAMPLINGMODE, null, null, data.images[6], false);
        ground.receivesShadows = true;
        ground.checkCollisions = true;
        ground.scaling.y = 0.001;

        console.log(ground);




        BABYLON.SceneLoader.ImportMesh("", "app/museum/objects/", "box.babylon", scene, function (meshes, things, others) {
          meshes[0].scaling = {x: 1, y: 1, z: 1};
          meshes[0].material = materialBox;
          meshes[0].position.y =  0;
          meshes[0].checkCollisions = true;
        });

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000000.0, scene);
          var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("app/museum/space/jajspace2", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;


        return scene;
      };

      scene = createScene();

// Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        scene.render();
      });
    })
  });

