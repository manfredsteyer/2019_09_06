import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export interface FlightBookingAppState {
  flightBooking: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  basket: object;
  flightStats: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  flightStats: {}
};

const flightBookingReducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights;
    
    // Verboten!!!!
    // state.flights = flights;
    return { ...state, flights};
  }),

  on(updateFlight, (state, action) => {
    const replacement = action.flight;

    const oldFlights = state.flights;
    const flights = oldFlights.map(f => f.id === replacement.id ? replacement : f);

    return { ...state, flights};
  }),
);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
