import React, { createContext, useContext } from 'react';

export type DataState = 'ready' | 'loading' | 'empty' | 'error';

const DataStateContext = createContext<DataState>('ready');

export function DataStateProvider({ value, children }: {value: DataState;children: React.ReactNode;}) {
  return <DataStateContext.Provider value={value}>{children}</DataStateContext.Provider>;
}

export function useDataState(): DataState {
  return useContext(DataStateContext);
}