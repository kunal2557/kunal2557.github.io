import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ParkingSpot } from '@shared/schema';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  center: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number } | null;
  parkingSpots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
  selectedSpot?: string | null;
  className?: string;
}

export default function InteractiveMap({ 
  center, 
  userLocation, 
  parkingSpots, 
  onSpotClick, 
  selectedSpot,
  className = "h-64 w-full rounded-lg"
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([center.lat, center.lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    markersRef.current.addTo(map);
    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map center when center prop changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 13);
    }
  }, [center]);

  // Update user location marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { 
        icon: userIcon 
      }).addTo(mapRef.current);

      userMarkerRef.current.bindPopup('Your Location').openPopup();
    }
  }, [userLocation]);

  // Update parking spot markers
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.clearLayers();

    parkingSpots.forEach((spot) => {
      const isSelected = selectedSpot === spot.id;
      
      const getMarkerColor = (type: string, selected: boolean) => {
        if (selected) return '#ef4444'; // red for selected
        switch (type?.toLowerCase()) {
          case 'premium': return '#8b5cf6'; // purple
          case 'saver': return '#10b981'; // green
          case 'suggested': return '#f59e0b'; // amber
          default: return '#6b7280'; // gray
        }
      };

      const markerIcon = L.divIcon({
        className: 'parking-spot-marker',
        html: `
          <div style="position: relative;">
            <!-- Radar pulse animation for available spots -->
            ${spot.availableSpots > 0 ? `
              <div style="
                position: absolute;
                top: -6px;
                left: -6px;
                width: 36px;
                height: 36px;
                border: 2px solid ${getMarkerColor(spot.spotType, isSelected)};
                border-radius: 50%;
                opacity: 0.6;
                animation: radarPulse 2s infinite;
              "></div>
              <div style="
                position: absolute;
                top: -3px;
                left: -3px;
                width: 30px;
                height: 30px;
                border: 1px solid ${getMarkerColor(spot.spotType, isSelected)};
                border-radius: 50%;
                opacity: 0.4;
                animation: radarPulse 2s infinite 0.5s;
              "></div>
            ` : ''}
            
            <!-- Main marker -->
            <div style="
              width: 24px;
              height: 24px;
              background: ${getMarkerColor(spot.spotType, isSelected)};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 10px;
              font-weight: bold;
              transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
              transition: transform 0.2s ease;
              animation: ${spot.availableSpots > 0 ? 'mapMarkerBlink 2s infinite' : 'none'};
            ">
              ₹${spot.pricePerHour}
            </div>
            
            <!-- Live viewer count badge -->
            ${spot.viewers ? `
              <div style="
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                font-weight: bold;
                border: 1px solid white;
                box-shadow: 0 1px 2px rgba(0,0,0,0.3);
              ">
                ${spot.viewers}
              </div>
            ` : ''}
          </div>
          
          <style>
            @keyframes mapMarkerBlink {
              0%, 50% { opacity: 1; transform: scale(1); }
              51%, 100% { opacity: 0.8; transform: scale(1.05); }
            }
            
            @keyframes radarPulse {
              0% { 
                transform: scale(0.8); 
                opacity: 0.8; 
              }
              50% { 
                transform: scale(1.2); 
                opacity: 0.4; 
              }
              100% { 
                transform: scale(1.5); 
                opacity: 0; 
              }
            }
          </style>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([Number(spot.latitude) || 0, Number(spot.longitude) || 0], { 
        icon: markerIcon 
      }).addTo(markersRef.current);

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">
            ${spot.name}
          </h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280;">
            ${spot.address}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0;">
            <span style="
              background: ${getMarkerColor(spot.spotType, false)};
              color: white;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: bold;
            ">
              ${spot.spotType.toUpperCase()}
            </span>
            <span style="font-weight: bold; color: #1f2937;">
              ₹${spot.pricePerHour}/hr
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>⭐ ${spot.rating} (${spot.reviews})</span>
            <span>👥 ${spot.viewers} viewing</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      if (onSpotClick) {
        marker.on('click', () => onSpotClick(spot));
      }
    });
  }, [parkingSpots, selectedSpot, onSpotClick]);

  return (
    <div 
      ref={mapContainerRef} 
      className={className}
      style={{ zIndex: 1 }}
    />
  );
}
