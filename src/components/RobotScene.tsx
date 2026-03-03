import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function RobotScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(3, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minPolarAngle = Math.PI / 4;

    // Lighting
    scene.add(new THREE.AmbientLight("#ffffff", 0.35));

    const dirLight1 = new THREE.DirectionalLight("#a0c4ff", 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight("#4a6fa5", 0.35);
    dirLight2.position.set(-3, 3, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight("#4a90d9", 0.6);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2a3f5f"),
      metalness: 0.8,
      roughness: 0.3,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4a90d9"),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color("#1a4a8a"),
      emissiveIntensity: 0.3,
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1a2a3f"),
      metalness: 0.7,
      roughness: 0.4,
    });

    // Robot arm hierarchy
    const robotGroup = new THREE.Group();
    robotGroup.position.set(0, -1.5, 0);
    scene.add(robotGroup);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.3, 32), darkMaterial);
    base.position.set(0, 0.15, 0);
    robotGroup.add(base);

    const baseTop = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.1, 32), accentMaterial);
    baseTop.position.set(0, 0.35, 0);
    robotGroup.add(baseTop);

    const joint1 = new THREE.Group();
    joint1.position.set(0, 0.4, 0);
    robotGroup.add(joint1);

    const j1Core = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), accentMaterial);
    j1Core.position.set(0, 0.05, 0);
    joint1.add(j1Core);

    const lowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.3), metalMaterial);
    lowerArm.position.set(0, 0.8, 0);
    joint1.add(lowerArm);

    const joint2 = new THREE.Group();
    joint2.position.set(0, 1.4, 0);
    joint1.add(joint2);

    const j2Core = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), accentMaterial);
    joint2.add(j2Core);

    const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.9, 0.22), metalMaterial);
    upperArm.position.set(0, 0.6, 0);
    joint2.add(upperArm);

    const joint3 = new THREE.Group();
    joint3.position.set(0, 1.05, 0);
    joint2.add(joint3);

    const j3Core = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), accentMaterial);
    joint3.add(j3Core);

    const fingerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), darkMaterial);
    fingerLeft.position.set(-0.1, 0.25, 0);
    fingerLeft.rotation.z = 0.2;
    joint3.add(fingerLeft);

    const fingerRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), darkMaterial);
    fingerRight.position.set(0.1, 0.25, 0);
    fingerRight.rotation.z = -0.2;
    joint3.add(fingerRight);

    // Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color("#4a90d9"),
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      robotGroup.rotation.y = Math.sin(t * 0.3) * 0.3;
      joint1.rotation.z = Math.sin(t * 0.5) * 0.2 - 0.3;
      joint2.rotation.z = Math.sin(t * 0.7 + 1) * 0.3 - 0.2;
      joint3.rotation.z = Math.sin(t * 0.9 + 2) * 0.2;
      particles.rotation.y = t * 0.02;

      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      controls.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();
      metalMaterial.dispose();
      accentMaterial.dispose();
      darkMaterial.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-label="3D robotics simulation" />;
}
