import React, { useEffect, useRef, useState } from 'react';
import { Property } from '../types';
import L from 'leaflet';
import { MapPin, ZoomIn, ZoomOut, Layers, Maximize2, Compass } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  heightClass?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  onScheduleTour,
  heightClass = 'h-[540px]'
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [activeRegion, setActiveRegion] = useState<string>('all');

  // Format short price for map pins, e.g. $38.5M
  const getShortPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    if (!mapInstanceRef.current) {
      // Default center around US/Europe intermediate or US
      const map = L.map(mapContainerRef.current, {
        center: [38.0, -85.0],
        zoom: 4,
        zoomControl: false,
        attributionControl: true
      });

      // CartoDB Positron - elegant monochrome light luxury tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      bounds.extend(prop.coordinates);

      const isSelected = selectedProperty?.id === prop.id;

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin-container',
        html: `
          <div class="custom-map-marker ${isSelected ? 'active' : ''}" id="map-pin-${prop.id}">
            <span>${getShortPrice(prop.price)}</span>
          </div>
        `,
        iconSize: [60, 26],
        iconAnchor: [30, 13]
      });

      const marker = L.marker(prop.coordinates, { icon: customIcon }).addTo(map);

      // Popup content styled in Maison Fav luxury aesthetic
      const popupHtml = `
        <div class="w-64 font-sans bg-white overflow-hidden text-left" id="popup-${prop.id}">
          <div class="relative h-32 w-full bg-stone-900">
            <img src="${prop.images[0]}" alt="${prop.title}" class="w-full h-full object-cover" />
            <span class="absolute top-2 left-2 bg-[#161513]/90 text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5">
              ${prop.status}
            </span>
          </div>
          <div class="p-3.5">
            <p class="text-[10px] uppercase tracking-wider text-[#8C8477] font-medium">${prop.location}</p>
            <h4 class="font-editorial text-base font-semibold text-[#161513] leading-snug truncate mt-0.5">${prop.title}</h4>
            <p class="font-editorial text-lg text-[#161513] font-bold mt-1">${prop.priceFormatted}</p>
            <div class="flex items-center gap-3 text-[11px] text-[#555] py-2 border-t border-b border-[#EAE5DC] my-2">
              <span>${prop.beds} Beds</span>
              <span>•</span>
              <span>${prop.baths} Baths</span>
              <span>•</span>
              <span>${prop.sqft.toLocaleString()} sq ft</span>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button 
                onclick="window.__tovSelectProperty && window.__tovSelectProperty('${prop.id}')"
                class="flex-1 bg-[#161513] hover:bg-[#2C2926] text-white text-[10px] uppercase tracking-wider font-medium py-1.5 px-2 text-center transition-colors cursor-pointer"
              >
                View Residence
              </button>
              <button 
                onclick="window.__tovScheduleTour && window.__tovScheduleTour('${prop.id}')"
                class="bg-[#FAF8F5] border border-[#D5CDC0] hover:bg-[#EAE5DC] text-[#161513] text-[10px] uppercase tracking-wider font-medium py-1.5 px-2 text-center transition-colors cursor-pointer"
              >
                Tour
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'custom-tov-popup'
      });

      marker.on('click', () => {
        onSelectProperty(prop);
      });

      markersRef.current[prop.id] = marker;
    });

    // Attach global callbacks for popup action buttons
    (window as any).__tovSelectProperty = (id: string) => {
      const p = properties.find((item) => item.id === id);
      if (p) onSelectProperty(p);
    };

    (window as any).__tovScheduleTour = (id: string) => {
      const p = properties.find((item) => item.id === id);
      if (p) onScheduleTour(p);
    };

    // Auto fit bounds with padding if multiple
    if (bounds.isValid() && !selectedProperty) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }

    // Delayed resize trigger for responsive grid adjustments
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, [properties]);

  // Pan to selected property if changed
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProperty) return;

    const map = mapInstanceRef.current;
    map.setView(selectedProperty.coordinates, 12, { animate: true });

    const marker = markersRef.current[selectedProperty.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedProperty]);

  // Quick Region focus handlers
  const handleRegionFocus = (region: string) => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    setActiveRegion(region);

    switch (region) {
      case 'california':
        map.setView([34.0522, -118.4], 10, { animate: true });
        break;
      case 'new-york':
        map.setView([40.7188, -74.0089], 13, { animate: true });
        break;
      case 'aspen':
        map.setView([39.1950, -106.8200], 12, { animate: true });
        break;
      case 'palm-beach':
        map.setView([26.7153, -80.0364], 12, { animate: true });
        break;
      case 'europe':
        map.setView([48.8566, 2.3522], 6, { animate: true });
        break;
      default: {
        const bounds = L.latLngBounds([]);
        properties.forEach((p) => bounds.extend(p.coordinates));
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
        break;
      }
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full border border-[#E5DFD5] bg-[#FAF8F5] overflow-hidden group" id="interactive-map-wrapper">
      {/* Map Header / Region Quick-Filter Pill Bar */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 border border-[#E2DDD3] shadow-md">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8477] px-2 flex items-center gap-1">
          <Compass className="w-3 h-3 text-[#C5A880]" />
          Focus Region:
        </span>
        {[
          { id: 'all', label: 'All Global' },
          { id: 'california', label: 'California' },
          { id: 'new-york', label: 'New York' },
          { id: 'aspen', label: 'Aspen' },
          { id: 'palm-beach', label: 'Palm Beach' },
          { id: 'europe', label: 'Paris & London' }
        ].map((reg) => (
          <button
            key={reg.id}
            onClick={() => handleRegionFocus(reg.id)}
            className={`text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 transition-colors cursor-pointer ${
              activeRegion === reg.id
                ? 'bg-[#161513] text-white font-semibold'
                : 'text-[#555047] hover:bg-[#EFEBE3] hover:text-[#161513]'
            }`}
          >
            {reg.label}
          </button>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white border border-[#E2DDD3] shadow-md flex items-center justify-center text-[#161513] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white border border-[#E2DDD3] shadow-md flex items-center justify-center text-[#161513] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleRegionFocus('all')}
          className="w-8 h-8 bg-white border border-[#E2DDD3] shadow-md flex items-center justify-center text-[#161513] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          title="Reset bounds"
          aria-label="Reset map"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Canvas Container */}
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-10`} />

      {/* Map Bottom Legend / Attribution Overlay */}
      <div className="absolute bottom-3 left-4 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 border border-[#E2DDD3] text-[10px] text-[#6A6357] shadow-xs flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#161513] border border-white" />
          Off-Market / Private Treaty
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] border border-white" />
          Active Selection
        </span>
      </div>
    </div>
  );
};
