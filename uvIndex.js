const API_KEY = '1adb4acf515841479e671928230810 '
const BASE_URL = 'http://api.weatherapi.com/v1'

const independant = async (input) =>{
    const data = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${input}&days=14&aqi=yes&alerts=yes`)
    const convert = await data.json()

    const weatherData = convert


    //console.log(weatherData)
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader()
    const moonTexture = textureLoader.load('flat-moon-texture.png')
    
    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({map: moonTexture});
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    camera.position.z = 5;
    camera.lookAt(moon.position);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const animate = () => {
        requestAnimationFrame(animate);
      
        // Add any animations or updates here
      
        renderer.render(scene, camera);
    };
      
    animate();

    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
      
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      
        renderer.setSize(newWidth, newHeight);
    });

    moon.scale.set(1, 1, 1); // Adjust the scale as needed
    moon.position.set(0, 0, 0);


}

independant('sofia')

