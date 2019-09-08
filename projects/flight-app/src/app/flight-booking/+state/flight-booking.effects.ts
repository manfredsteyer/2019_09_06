import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlightService } from '@flight-workspace/flight-api';
import { loadFlights, flightsLoaded } from './flight-booking.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

  constructor(
    private actions$: Actions, 
    private flightService: FlightService) {}

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType(loadFlights),
    switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
    map(flights => flightsLoaded({flights}))
  ));

  // loadFlightBookings$ = createEffect(() => this.actions$.pipe(
  //   ofType(FlightBookingActions.flightsLoaded),
  //   /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //   concatMap(() => EMPTY)
  // ));


  

}

