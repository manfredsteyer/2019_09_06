
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, interval, combineLatest, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, filter, shareReplay, delay, mergeMap, concatMap, exhaustMap, catchError } from 'rxjs/operators';
import { _do } from "rxjs/operator/do";
import { Flight } from '@flight-workspace/flight-api';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading: boolean = false;







    online$: Observable<boolean>;
    online: boolean;

    ngOnInit() {
        this.control = new FormControl();


        this.online$ 
                = interval(2000).pipe(
                        startWith(0),
                        map(_ => true),
                        distinctUntilChanged(),
                        shareReplay(1),
                        // // Nebeneffekt :-(
                        // tap(value => this.online = value)
                );

        const debouncedInput$ = this.control.valueChanges.pipe(debounceTime(300));

        this.flights$ = combineLatest(debouncedInput$, this.online$).pipe(

            filter( ([_, online]) => online),
            tap(_ => this.loading = true),
            switchMap( ([input, _]) => this.load(input)),
            tap(_ => this.loading = false),
            
        );
        /*
        this
                            
                            ;
        */
    }

    load(from: string)  {
        let url = "http://www.angular.at/api/flight";

        let params = new HttpParams()
                            .set('from', from);

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            catchError(_ => of([]))
        )

    };


}
