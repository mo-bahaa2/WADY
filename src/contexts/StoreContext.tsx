import React, { createContext, useContext, useState, useCallback } from 'react';
import { trips as initialTrips } from '../data/trips';
import { drivers as initialDrivers } from '../data/drivers';
import type { Trip, TripState, Driver, DriverDocument, Dispute } from '../types';

interface StoreContextType {
  trips: Trip[];
  drivers: Driver[];
  updateTripState: (tripId: string, newState: TripState) => Promise<void>;
  approveDriverDocument: (driverId: string, documentName: string) => Promise<void>;
  rejectDriverDocument: (driverId: string, documentName: string) => Promise<void>;
  confirmDelivery: (tripId: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 600));

  const updateTripState = useCallback(async (tripId: string, newState: TripState) => {
    await simulateDelay();
    setTrips(current => current.map(t => 
      t.id === tripId ? { ...t, state: newState, updatedAt: new Date().toISOString() } : t
    ));
  }, []);

  const approveDriverDocument = useCallback(async (driverId: string, documentName: string) => {
    await simulateDelay();
    setDrivers(current => current.map(d => {
      if (d.id === driverId) {
        return {
          ...d,
          documents: d.documents.map(doc => 
            doc.name === documentName ? { ...doc, status: 'VALID' } : doc
          )
        };
      }
      return d;
    }));
  }, []);

  const rejectDriverDocument = useCallback(async (driverId: string, documentName: string) => {
    await simulateDelay();
    setDrivers(current => current.map(d => {
      if (d.id === driverId) {
        return {
          ...d,
          documents: d.documents.map(doc => 
            doc.name === documentName ? { ...doc, status: 'REJECTED' } : doc
          )
        };
      }
      return d;
    }));
  }, []);

  const confirmDelivery = useCallback(async (tripId: string) => {
    await simulateDelay();
    setTrips(current => current.map(t => 
      t.id === tripId ? { ...t, state: 'DELIVERED', updatedAt: new Date().toISOString() } : t
    ));
  }, []);

  const value = {
    trips,
    drivers,
    updateTripState,
    approveDriverDocument,
    rejectDriverDocument,
    confirmDelivery,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
