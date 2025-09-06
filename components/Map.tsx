"use client"

import { useRef, useEffect, useState } from "react"
import maplibregl from "maplibre-gl"
import { AiOutlineLoading } from "react-icons/ai"
import "maplibre-gl/dist/maplibre-gl.css"

interface MapProps {
  center?: [number, number]
}

const Map = ({ center }: MapProps) => {
  const mapInstanceRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)

  const region = process.env.NEXT_PUBLIC_AWS_REGION as string
  const mapStyle = "Monochrome"
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY as string
  const styleUrl = `https://maps.geo.${region}.amazonaws.com/v2/styles/${mapStyle}/descriptor?key=${apiKey}`

  // Helper to (re)place marker
  const placeMarker = (pos?: [number, number]) => {
    // Remove existing marker if any
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }

    if (pos && mapInstanceRef.current) {
      markerRef.current = new maplibregl.Marker()
        .setLngLat(pos)
        .addTo(mapInstanceRef.current)
    }
  }

  // Init map once
  useEffect(() => {
    if (!mapContainerRef.current) return
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleUrl,
      center: center || [-74.006, 40.7128],
      zoom: 3,
      attributionControl: false,
    })
    mapInstanceRef.current = map
    map.on("load", () => {
      setLoading(false)
      placeMarker(center)
    })

    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
        markerRef.current = null
      }
      map.remove()
    }
  }, [])

  // Animate and update marker when center changes
  useEffect(() => {
    if (!mapInstanceRef.current) return
    if (!center) {
      placeMarker(undefined)
      return
    }

    mapInstanceRef.current.flyTo({
      center,
      zoom: 5,
      speed: 1.1,
      curve: 1.4,
      essential: true,
    })
    placeMarker(center)
  }, [center])

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-md"
    >
      {/* Skeleton Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <AiOutlineLoading
            size={36}
            className="animate-spin text-rose-500 opacity-80"
          />
        </div>
      )}
    </div>
  )
}

export default Map
