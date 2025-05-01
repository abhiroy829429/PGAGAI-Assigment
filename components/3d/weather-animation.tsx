"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface WeatherAnimationProps {
  condition: string
}

export function WeatherAnimation({ condition }: WeatherAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    // Create weather-specific elements
    createWeatherElements(condition, scene)

    // Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate)

      // Update animations
      if (scene.children.length > 2) {
        // Skip lights
        scene.children.slice(2).forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01
            child.rotation.y += 0.01
          }
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      // Dispose of geometries and materials to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          }
        }
      })

      rendererRef.current?.dispose()
    }
  }, [condition])

  const createWeatherElements = (condition: string, scene: THREE.Scene) => {
    // Clear previous elements (except lights)
    while (scene.children.length > 2) {
      const object = scene.children[2]
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose()
        if (object.material instanceof THREE.Material) {
          object.material.dispose()
        } else if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        }
      }
      scene.remove(object)
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
      createRainElements(scene)
    } else if (condition.includes("cloud")) {
      createCloudElements(scene)
    } else {
      createSunnyElements(scene)
    }
  }

  const createRainElements = (scene: THREE.Scene) => {
    // Create raindrops
    const raindropGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const raindropMaterial = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      transparent: true,
      opacity: 0.7,
    })

    for (let i = 0; i < 50; i++) {
      const raindrop = new THREE.Mesh(raindropGeometry, raindropMaterial)
      raindrop.position.x = Math.random() * 10 - 5
      raindrop.position.y = Math.random() * 10 - 5
      raindrop.position.z = Math.random() * 5 - 2.5
      scene.add(raindrop)
    }

    // Create cloud
    const cloudGeometry = new THREE.SphereGeometry(1, 16, 16)
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      transparent: true,
      opacity: 0.8,
    })
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)
    cloud.position.y = 2
    scene.add(cloud)
  }

  const createCloudElements = (scene: THREE.Scene) => {
    // Create multiple clouds
    const cloudGeometry = new THREE.SphereGeometry(1, 16, 16)
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xecf0f1,
      transparent: true,
      opacity: 0.8,
    })

    for (let i = 0; i < 3; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloud.position.x = i * 2 - 2
      cloud.position.y = Math.random() * 2
      cloud.scale.set(1 + Math.random() * 0.5, 1 + Math.random() * 0.5, 1 + Math.random() * 0.5)
      scene.add(cloud)
    }
  }

  const createSunnyElements = (scene: THREE.Scene) => {
    // Create sun
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const sunMaterial = new THREE.MeshStandardMaterial({
      color: 0xf39c12,
      emissive: 0xf1c40f,
      emissiveIntensity: 0.5,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sun)

    // Create sun rays
    const rayGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8)
    const rayMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1c40f,
      emissive: 0xf39c12,
      emissiveIntensity: 0.3,
    })

    for (let i = 0; i < 8; i++) {
      const ray = new THREE.Mesh(rayGeometry, rayMaterial)
      const angle = (i / 8) * Math.PI * 2
      ray.position.x = Math.cos(angle) * 2.5
      ray.position.y = Math.sin(angle) * 2.5
      ray.rotation.z = angle + Math.PI / 2
      scene.add(ray)
    }
  }

  return <div ref={containerRef} className="w-full h-full min-h-[200px]" />
}
