import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoanApplication } from "./models/loan-application.model";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly baseUrl = "/ApplicationManager";

  constructor(private http: HttpClient) {}

  getApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.baseUrl}/GetApplications`);
  }

  createApplication(app: LoanApplication): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/CreateApplication`, app);
  }

  updateApplication(applicationNumber: string, app: LoanApplication): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/UpdateApplication/${encodeURIComponent(applicationNumber)}`, app);
  }

  deleteApplication(applicationNumber: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/DeleteApplication/${encodeURIComponent(applicationNumber)}`);
  }
}
