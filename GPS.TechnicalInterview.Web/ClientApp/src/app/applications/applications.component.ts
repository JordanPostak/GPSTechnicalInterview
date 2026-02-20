import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loan-application.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmDialogComponent } from "../shared/confirm-dialog/confirm-dialog.component";

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
    "actions",
  ];

  public dataSource = new MatTableDataSource<LoanApplication>([]);
  public isLoading = false;
  public error: string | null = null;

  public searchTerm = "";

  constructor(private api: ApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Custom search logic
    this.dataSource.filterPredicate = (app: LoanApplication, filter: string) => {
      const f = (filter ?? "").trim().toLowerCase();
      if (!f) return true;

      const statusLabel = this.getStatusLabel(app.status).toLowerCase();

      const amountStr = String(app?.loanTerms?.amount ?? "").toLowerCase();
      const appNum = String(app?.applicationNumber ?? "").toLowerCase();

      const first = String(app?.personalInformation?.name?.first ?? "").toLowerCase();
      const last = String(app?.personalInformation?.name?.last ?? "").toLowerCase();
      const fullName = `${first} ${last}`.trim();

      const phone = String(app?.personalInformation?.phoneNumber ?? "").toLowerCase();
      const email = String(app?.personalInformation?.email ?? "").toLowerCase();

      // Optional: date search
      const dateStr = app?.dateApplied ? new Date(app.dateApplied).toLocaleDateString().toLowerCase() : "";

      const haystack = [
        appNum,
        amountStr,
        statusLabel,
        first,
        last,
        fullName,
        phone,
        email,
        dateStr,
      ].join(" ");

      return haystack.includes(f);
    };

    this.loadApplications();
  }

  loadApplications(): void {
    this.isLoading = true;
    this.error = null;

    this.api.getApplications().subscribe({
      next: (apps) => {
        this.dataSource.data = apps ?? [];
        this.isLoading = false;
        this.applySearch(this.searchTerm);
      },
      error: (err) => {
        console.error(err);
        this.error = "Failed to load applications.";
        this.isLoading = false;
      },
    });
  }

  applySearch(value: string): void {
    this.searchTerm = value ?? "";
    this.dataSource.filter = (this.searchTerm || "").trim().toLowerCase();
  }

  clearSearch(): void {
    this.applySearch("");
  }

  onDelete(app: LoanApplication): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: "520px" });

    dialogRef.componentInstance.data = {
      title: "Delete Application",
      message: "Are you sure you want to delete this application?",
      cancelText: "CANCEL",
      confirmText: "CONFIRM",
    };

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.api.deleteApplication(app.applicationNumber).subscribe({
        next: () => this.loadApplications(),
        error: (err) => {
          console.error(err);
          alert("Failed to delete application.");
        },
      });
    });
  }

  onEdit(app: LoanApplication): void {
    this.router.navigate(["/create-application"], {
      queryParams: { id: app.applicationNumber },
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
}

