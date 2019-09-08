import { FlightService } from "@flight-workspace/flight-api";
import { Store } from "@ngrx/store";
import { FlightBookingAppState } from "./flight-booking.reducer";
import { Injectable } from "@angular/core";
import { flightsLoaded, updateFlight, loadFlights } from "./flight-booking.actions";
import { first } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FlightBookingFacade {

    flights$ = this.store.select(a => a.flightBooking.flights);


    constructor(private flightService: FlightService, 
        private store: Store<FlightBookingAppState>) {
    }

    // find(from: string, to: string, urgent: boolean): void {
    //     this.flightService
    //     .find(from, to, urgent)
    //     .subscribe(
    //       flights => {
    //         this.store.dispatch(flightsLoaded({flights}));
    //       }
    //     )
    // }

    find(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({from, to, urgent}));
    }

    delay(): void {
        this.flights$.pipe(first()).subscribe(flights => {
            const f = flights[0];
            const flight = {...f, date: new Date().toISOString()};
            this.store.dispatch(updateFlight({flight}));
        });
    }


}