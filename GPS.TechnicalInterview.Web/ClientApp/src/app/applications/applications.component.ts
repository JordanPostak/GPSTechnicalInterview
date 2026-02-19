import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loan-application.model";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent implements OnInit {
  public displayedColumns: Array<string> = [
  "applicationNumber",
  "amount",
  "dateApplied",
  "status",
  "actions"
];

  public applications: LoanApplication[] = [];
  public isLoading = false;
  public error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.error = null;

    this.api.getApplications().subscribe({
      next: (apps) => {
        this.applications = apps ?? [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to load applications.";
        this.isLoading = false;
      },
    });
  }

  onDelete(app: LoanApplication): void {
    if (!confirm(`Delete application ${app.applicationNumber}?`)) {
      return;
    }

    this.api.deleteApplication(app.applicationNumber).subscribe({
      next: () => {
        this.loadApplications(); // refresh list
      },
      error: (err) => {
        console.error(err);
        alert("Failed to delete application.");
      },
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return "Approved";
      case 2:
        return "Funded";
      case 0:
      default:
        return "New";
    }
  }

  // helper for table column: "amount"
  getAmount(app: LoanApplication): number {
    return app?.loanTerms?.amount ?? 0;
  }
}

