import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Holiday} from "./model/holiday.model";
import {Location} from "./model/location.model";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'holiday',
  standalone: true,
  imports: [],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.scss'
})
export class HolidayComponent implements OnInit{
  loading = true;
  error: string | null = null;
  holiday: any = null;
  country: string = '';

  private http = inject(HttpClient);

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.http.get<Location>('https://ipapi.co/json/').pipe(
      tap((response) => {
        this.country = response.country_name;
        this.getHoliday(response.country_code);
      }),
      catchError((error) => {
        this.error = 'Unable to determine location. Please try again later.';
        this.loading = false;
        return of(null);
      })
    ).subscribe();
  }

  getHoliday(countryCode: string) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    this.http.get<Holiday[]>(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryCode}&languageIsoCode=EN&validFrom=${dateString}&validTo=${dateString}`)
      .pipe(
      tap((holidays) => {
        if (holidays.length > 0) {
          this.holiday = holidays[0];
        } else {
          this.holiday = null;
        }
        this.loading = false;
      }),
      catchError((error) => {
        this.error = 'Unable to fetch holiday information. Please try again later.';
        this.loading = false;
        return of([]);
      })
    ).subscribe();
  }
}
