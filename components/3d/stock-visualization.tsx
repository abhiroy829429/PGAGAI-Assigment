"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import type { StockTimeSeriesData } from "@/types/finance"

interface StockVisualizationProps {
  data: StockTimeSeriesData[]
  symbol: string
}

export function StockVisualization({ data, symbol }: StockVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current || !data.length) return

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
    camera.position.z = 15
    camera.position.y = 5
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
    directionalLight.position.set(0, 10, 10)
    scene.add(directionalLight)

    // Create stock visualization
    createStockVisualization(data, symbol, scene)

    // Animation loop
    const rotationSpeed = 0.002
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate the entire scene for a dynamic view
      scene.rotation.y += rotationSpeed

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
      cancelAnimationFrame(animationFrameId)

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
  }, [data, symbol])

  const createStockVisualization = (data: StockTimeSeriesData[], symbol: string, scene: THREE.Scene) => {
    // Create a group to hold all elements
    const group = new THREE.Group()
    scene.add(group)

    // Extract price data
    const prices = data.map((item) => Number.parseFloat(item.close))
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice || 1 // Prevent division by zero

    // Create base platform
    const baseGeometry = new THREE.BoxGeometry(data.length + 2, 0.5, 4)
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x34495e })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = -2
    group.add(base)

    // Create symbol display using a simple box with material
    const symbolBoxGeometry = new THREE.BoxGeometry(data.length / 2, 0.8, 0.2)
    const symbolBoxMaterial = new THREE.MeshStandardMaterial({ color: 0x3498db })
    const symbolBox = new THREE.Mesh(symbolBoxGeometry, symbolBoxMaterial)
    symbolBox.position.set(-data.length / 2, -1.5, 2)
    group.add(symbolBox)

    // Create bars for each data point
    data.forEach((item, index) => {
      const price = Number.parseFloat(item.close)
      const normalizedHeight = ((price - minPrice) / priceRange) * 8 + 1

      // Determine color based on price change
      const prevPrice = index > 0 ? Number.parseFloat(data[index - 1].close) : price
      const color = price >= prevPrice ? 0x2ecc71 : 0xe74c3c

      const barGeometry = new THREE.BoxGeometry(0.8, normalizedHeight, 0.8)
      const barMaterial = new THREE.MeshStandardMaterial({ color })
      const bar = new THREE.Mesh(barGeometry, barMaterial)

      bar.position.x = index - data.length / 2
      bar.position.y = normalizedHeight / 2 - 1.5

      group.add(bar)
    })

    // Create connecting line for prices
    const linePoints = data.map((item, index) => {
      const price = Number.parseFloat(item.close)
      const normalizedHeight = ((price - minPrice) / priceRange) * 8
      return new THREE.Vector3(index - data.length / 2, normalizedHeight - 1, 0)
    })

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3498db, linewidth: 2 })
    const line = new THREE.Line(lineGeometry, lineMaterial)
    group.add(line)

    // Center the group
    group.position.x = 0
  }

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />
}
