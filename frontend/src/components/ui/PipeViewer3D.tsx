import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const PipeViewer3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation loop function
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !controlsRef.current) return;

    requestRef.current = requestAnimationFrame(animate);
    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    console.log("Cleanup: Starting scene cleanup");
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      // console.log("Cleanup: Cancelled animation frame");
    }

    if (rendererRef.current && mountRef.current && rendererRef.current.domElement) {
      try {
        mountRef.current.removeChild(rendererRef.current.domElement);
        // console.log("Cleanup: Removed renderer DOM element");
      } catch (e) {
        console.warn("Cleanup: Error removing renderer DOM element", e);
      }
    }

    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      sceneRef.current = null;
      // console.log("Cleanup: Scene objects disposed");
    }

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
      // console.log("Cleanup: Renderer disposed");
    }

    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
      // console.log("Cleanup: OrbitControls disposed");
    }

    console.log("Cleanup: Scene cleanup finished");
  }, []);

  useEffect(() => {
    if (!mountRef.current) {
      console.error("Mount reference is null. Aborting setup.");
      return;
    }

    console.log("PipeViewer3D: Initializing scene...");

    const currentMount = mountRef.current;
    let isMounted = true; // Track mount status for async operations

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    console.log("PipeViewer3D: Scene created");

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 3, 4);
    cameraRef.current = camera;
    console.log("PipeViewer3D: Camera created");

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Corrected color space
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    currentMount.appendChild(renderer.domElement);
    console.log("PipeViewer3D: Renderer created");

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(8, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.001;
    scene.add(directionalLight);
    console.log("PipeViewer3D: Lights added");

    // --- Controls Setup ---
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;
    console.log("PipeViewer3D: OrbitControls initialized");

    // --- Ground Plane ---
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5; // Adjust if needed based on final model size/pos
    ground.receiveShadow = true;
    scene.add(ground);
    console.log("PipeViewer3D: Ground plane added");

    // --- Model Loading ---
    const loader = new GLTFLoader();
    const modelPath = '/lovable-uploads/models/di-pipe.glb'; // Ensure this path is correct
    console.log(`PipeViewer3D: Attempting to load GLB model from: ${modelPath}`);
    setIsLoading(true);
    setError(null);

    loader.load(
      modelPath,
      (gltf) => {
        if (!isMounted) return;
        console.log("PipeViewer3D: Model raw data loaded.");

        const model = gltf.scene;

        // --- Prepare Model ---
        let hasVisibleMesh = false;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (!child.material) {
              console.warn(`PipeViewer3D: Mesh ${child.name || 'unnamed'} has no material. Applying default.`);
              child.material = new THREE.MeshStandardMaterial({ color: 0x888888 });
            } else if (child.material instanceof THREE.Material) {
               // Ensure materials are updated if needed (e.g., textures load async)
               child.material.needsUpdate = true;
            } else if (Array.isArray(child.material)) {
                child.material.forEach(mat => mat.needsUpdate = true);
            }
            hasVisibleMesh = true;
          }
        });


        if (!hasVisibleMesh) {
          console.error("PipeViewer3D: Loaded model contains no visible meshes.");
          setError("Loaded 3D model appears to be empty or invisible.");
          setIsLoading(false);
          return;
        }

        // --- Calculate Bounding Box and Scale/Center/Rotate ---
        // 1. Get initial bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        console.log(`PipeViewer3D: Original BBox Size: x=${size.x.toFixed(2)}, y=${size.y.toFixed(2)}, z=${size.z.toFixed(2)}`);
        console.log(`PipeViewer3D: Original BBox Center: x=${center.x.toFixed(2)}, y=${center.y.toFixed(2)}, z=${center.z.toFixed(2)}`);

        if (maxDim <= 0 || !isFinite(maxDim)) {
            console.error("PipeViewer3D: Invalid model dimensions.");
            setError("Failed to calculate model dimensions.");
            setIsLoading(false);
            return;
        }

        // 2. Calculate scale factor
        const desiredSize = 4; // Target size for the largest dimension
        const scale = desiredSize / maxDim;
        console.log(`PipeViewer3D: Calculated scale factor: ${scale.toFixed(4)}`);

        // 3. Apply scale
        model.scale.set(scale, scale, scale);

        // 4. Recalculate box and center *after* scaling
        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        console.log(`PipeViewer3D: Scaled BBox Center: x=${scaledCenter.x.toFixed(2)}, y=${scaledCenter.y.toFixed(2)}, z=${scaledCenter.z.toFixed(2)}`);

        // 5. Translate the model so its *scaled* center is at the origin
        model.position.sub(scaledCenter);

        // 6. Rotate the model to be horizontal (ADJUSTED ROTATION)
        // If -Math.PI / 2 makes it look upside down, try +Math.PI / 2
        model.rotation.set(Math.PI / 2, 0, 0); // Rotate +90 degrees around X-axis

        console.log(`PipeViewer3D: Model transformed. Final Pos:`, model.position, `Final Rot:`, model.rotation);


        // --- Add to Scene ---
        scene.add(model);
        console.log("PipeViewer3D: Model added to the scene.");
        setIsLoading(false);

        // Ensure controls target is correct and update
        controls.target.set(0, 0, 0); // Ensure target remains at origin
        controls.update();

      },
      (xhr) => {
        const percent = (xhr.loaded / xhr.total * 100);
        // console.log(`PipeViewer3D: Model loading progress: ${percent.toFixed(1)}%`);
        if (!isMounted) return;
      },
      (err) => {
        if (!isMounted) return;
        console.error("PipeViewer3D: Error loading GLB model:", err);
        let errorMessage = "Failed to load the 3D model: Unknown error.";
        if (err instanceof Error) {
          errorMessage = `Failed to load model: ${err.message}`;
        } else if (typeof err === 'string') {
            errorMessage = `Failed to load model: ${err}`;
        } else if (err instanceof ProgressEvent && err.type === 'error') {
            // Try to get more specific network error info if possible
            let status = 'unknown';
            if (err.target instanceof XMLHttpRequest) {
                status = err.target.status.toString(); // Cast target to XMLHttpRequest to access status
            }
            errorMessage = `Network error loading model from ${modelPath}. Status: ${status}`;
        }
        setError(errorMessage);
        setIsLoading(false);
      }
    );

    // --- Resize Handling ---
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // --- Dark Mode Handling ---
    const updateBackgroundColor = () => {
        if (!rendererRef.current) return;
        const isDarkMode = document.documentElement.classList.contains('dark');
        // Set clear color with alpha 0 for full transparency
        const clearColor = isDarkMode ? 0x1a1a1a : 0xf0f0f0; // Example dark/light bg hint colors (won't be visible)
        rendererRef.current.setClearColor(clearColor, 0);
    };

    updateBackgroundColor(); // Initial set
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateBackgroundColor();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // --- Start Animation Loop ---
    animate();
    console.log("PipeViewer3D: Animation loop started.");

    // --- Cleanup Logic ---
    return () => {
      isMounted = false;
      console.log("PipeViewer3D: Unmounting component...");
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cleanup();
    };

  }, [animate, cleanup]); // Dependencies for useEffect

  return (
    // Container with gradient background
    <div className="relative w-full h-[400px] md:h-[500px] rounded-xl border border-border shadow-lg overflow-hidden bg-gradient-to-br from-muted/30 to-background/30 dark:from-primary-foreground/5 dark:to-background/20"> {/* Adjusted gradient */}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 dark:bg-background/90 z-20 backdrop-blur-sm">
          <div className="text-center text-foreground/80">
            <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading 3D Model...
          </div>
        </div>
      )}
      {/* Error Display */}
       {error && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 text-destructive-foreground p-4 z-10">
          <div className="text-center bg-background/95 p-6 rounded-lg shadow-xl border border-destructive/30 max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold mb-2 text-lg">Error Loading Model</p>
            <p className="text-sm bg-destructive/20 p-3 rounded font-mono text-destructive-foreground/80 break-words">{error}</p> {/* Added break-words */}
            <p className="text-xs mt-3 text-muted-foreground">Check the model path and ensure it's a valid GLB/GLTF file. See browser console (F12) for details.</p>
          </div>
        </div>
      )}
      {/* Container for the Three.js canvas */}
      <div
        ref={mountRef}
        className={`w-full h-full transition-opacity duration-500 ${isLoading || error ? 'opacity-0' : 'opacity-100'}`} // Hide canvas on error too
        style={{ touchAction: 'none' }} // Prevent page scroll on touch devices
      />
    </div>
  );
};

export default PipeViewer3D;