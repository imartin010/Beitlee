"use client";

import { useRef, useEffect } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

// Future City (المستقبل سيتي), New Cairo — [lng, lat]
const DEFAULT_CENTER: [number, number] = [31.497, 30.019];
const DEFAULT_ZOOM = 13;

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    async function initMap() {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");

      if (!containerRef.current) return;
      if (mapRef.current) return; // already initialized

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      mapRef.current = map;
    }

    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-navy/10">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
