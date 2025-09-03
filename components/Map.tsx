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
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const region = process.env.NEXT_PUBLIC_AWS_REGION as string
  const mapStyle = "Monochrome"
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY as string
  const styleUrl = `https://maps.geo.${region}.amazonaws.com/v2/styles/${mapStyle}/descriptor?key=${apiKey}`

  useEffect(() => {
    async function loadMap() {
      if (mapContainerRef.current) {
        mapInstanceRef.current = new maplibregl.Map({
          container: mapContainerRef.current,
          style: styleUrl,
          center: center || [-74.006, 40.7128],
          zoom: 3,
          attributionControl: false,
        })
      }

      setLoading(false)
    }

    loadMap()
  }, [])

  return (
    <>
      <div
        id="map"
        ref={mapContainerRef}
        className="w-full h-[400px] rounded-lg border-[1px] border-gray-300"
      >
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <AiOutlineLoading
              size={40}
              className="animate-spin text-rose-500"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Map
