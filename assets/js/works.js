
$(document).ready(function() {
	init();
	animate();
});

var container;
var camera, controls, scene, renderer;
var square,ring,tri,sphere;
function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 15);
				camera.position.set( 10, 0.10, 3 );

				cameraTarget = new THREE.Vector3( 0, -0.5, 0 );

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0xffffff, 1, 15 );


				// Ground

				var plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 2, 2 ),
					new THREE.MeshPhongMaterial( { color: 0x000000,  wireframe: true } )
				);
				plane.rotation.x = -Math.PI/2;
				plane.position.y = -0.8;
				scene.add( plane );

				plane.receiveShadow = true;

				// Square
				var geometry = new THREE.RingGeometry( 0.4, 0.45, 5 );
				var material = new THREE.MeshStandardMaterial( { color: 0xD61C59, wireframe: true,side: THREE.DoubleSide } );
				square = new THREE.Mesh( geometry, material );
				square.position.y = -0.50;
				square.position.z = -0.4;
				square.scale.multiplyScalar( 2. );
				scene.add( square );

				// Ring
				var geometry = new THREE.RingGeometry( 0.2, 0.38, 8 );
				var material = new THREE.MeshStandardMaterial( { color: 0x3126f5, wireframe: true,side: THREE.DoubleSide } );
				ring = new THREE.Mesh( geometry, material );
				//ring.position.x = 0.2;
				ring.position.y = -0.50;
				ring.position.z = -0.4;
				ring.scale.multiplyScalar( 1.2 );
				scene.add( ring );

				// Tri
				var geometry = new THREE.RingGeometry( 0.35, 0.4, 1 );
				var material = new THREE.MeshStandardMaterial( { color: 0xffffff, wireframe: true,side: THREE.DoubleSide } );
				tri = new THREE.Mesh( geometry, material );
				tri.position.y = -0.50;
				tri.position.z = -0.4;
				tri.scale.multiplyScalar( 2. );
				 scene.add( tri );

				// Sphere
				var geometry = new THREE.SphereGeometry( 0.5, 10, 10 );
				var material = new THREE.MeshBasicMaterial( {color: 0x000,wireframe:true} );
				sphere = new THREE.Mesh( geometry, material );
				sphere.position.y = -0.50;
				sphere.position.z = -0.2;
				sphere.scale.multiplyScalar( .5 );
				//scene.add( sphere );

				// PLY file
				var loader = new THREE.PLYLoader();
				loader.load( '../assets/js/models/ply/binary/me.ply', function ( geometry ) {

				geometry.computeFaceNormals();

				var material = new THREE.MeshStandardMaterial( { color: 0x000, wireframe: false } );
				var loader = new THREE.TextureLoader();

				material.roughness = 0.4;
				material.metalness = 8;

				var path = '../assets/js/models/ply/binary/';
				material.map = loader.load( path + 'tex.png' );

				var mesh = new THREE.Mesh( geometry, material );

				mesh.position.x = 0.1;
				mesh.position.y = -0.64;
				mesh.position.z = -0.1;
				mesh.rotation.x = - Math.PI / 2;
				mesh.scale.multiplyScalar( 1.0 );

				//mesh.castShadow = true;
				//mesh.receiveShadow = true;

				//scene.add( mesh );

				} );

				// Lights

				scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

				addShadowedLight( 1, 1, 1, 0xffffff, 0.8 );
				addShadowedLight( 0.5, 1, -1, 0xffaa00, 1.2 );

				// renderer

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( scene.fog.color );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.gammaInput = true;
				renderer.gammaOutput = true;

				renderer.shadowMap.enabled = true;
				renderer.shadowMap.cullFace = THREE.CullFaceBack;

				container.appendChild( renderer.domElement );



				// resize
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function addShadowedLight( x, y, z, color, intensity ) {

				var directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z );
				scene.add( directionalLight );

				directionalLight.castShadow = true;
				// directionalLight.shadowCameraVisible = true;

				var d = 10;
				directionalLight.shadowCameraLeft = -d;
				directionalLight.shadowCameraRight = d;
				directionalLight.shadowCameraTop = d;
				directionalLight.shadowCameraBottom = -d;

				directionalLight.shadowCameraNear = 1;
				directionalLight.shadowCameraFar = 4;

				directionalLight.shadowMapWidth = 1024;
				directionalLight.shadowMapHeight = 1024;

				directionalLight.shadowBias = -0.010;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				var timer = Date.now() * 0.0002;

				camera.position.x = Math.sin( timer ) * 2+4;
				camera.position.y = Math.sin( timer ) * 2+2;
				camera.position.z = Math.cos( timer ) * 4;

				camera.lookAt( cameraTarget );

				square.rotation.y = timer * 2;
				ring.rotation.x = timer * 2;
				tri.rotation.z = timer * 2;
				//sphere.rotation.z = timer * 2;

				renderer.render( scene, camera );

			}

