import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loan-application.model";

@Component({
  selector: "app-create-application",
  templateUrl: "./create-application.component.html",
  styleUrls: ["./create-application.component.scss"],
})
export class CreateApplicationComponent {
  public applicationForm: FormGroup;
  public statuses: Array<string> = ["New", "Approved", "Funded"];

  public isSaving = false;
  public error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      applicationNumber: [null, Validators.required],
      status: ["New", Validators.required],
      amount: [null, Validators.required],
      monthlyPayAmount: [null],
      terms: [null, Validators.required],
    });
  }

  private statusToNumber(status: string): number {
    switch (status) {
      case "Approved":
        return 1;
      case "Funded":
        return 2;
      case "New":
      default:
        return 0;
    }
  }

  private toMoneyNumber(value: any): number {
    // Allows inputs like "10000", "10,000", "$10,000.50"
    const cleaned = String(value ?? "").replace(/[^0-9.]/g, "");
    return Number(cleaned);
  }

  onSave(): void {
    this.error = null;

    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      this.error = "Please fill out all required fields.";
      return;
    }

    const v = this.applicationForm.value;

    // Debug: see what's coming from the form
    console.log("Raw terms value:", v.terms, "type:", typeof v.terms);

    // Parse + validate numeric fields
    const terms = parseInt(String(v.terms ?? "").trim(), 10);
    console.log("Parsed terms:", terms);

    if (!Number.isFinite(terms) || terms <= 0) {
      this.error = "Terms must be a whole number greater than 0.";
      return;
    }

    const amount = this.toMoneyNumber(v.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      this.error = "Amount must be a number greater than 0.";
      return;
    }

    const monthlyPayment = this.toMoneyNumber(v.monthlyPayAmount ?? 0);
    if (!Number.isFinite(monthlyPayment) || monthlyPayment < 0) {
      this.error = "Monthly payment must be a valid number.";
      return;
    }

    const payload: LoanApplication = {
      applicationNumber: String(v.applicationNumber ?? "").trim(),
      status: this.statusToNumber(v.status),
      dateApplied: new Date().toISOString(), // backend will overwrite anyway
      loanTerms: {
        amount,
        monthlyPayment,
        terms,
      },
      personalInformation: {
        name: { first: String(v.firstName ?? "").trim(), last: String(v.lastName ?? "").trim() },
        phoneNumber: String(v.phoneNumber ?? "").trim(),
        email: String(v.email ?? "").trim(),
      },
    };

    console.log("CreateApplication payload:", payload);

    this.isSaving = true;

    this.api.createApplication(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(["/applications"]);
      },
      error: (err) => {
        console.error("CreateApplication failed:", err);
        this.isSaving = false;

        // Surface backend validation errors if present
        if (typeof err?.error === "string") {
          this.error = err.error;
        } else if (err?.error?.errors) {
          this.error = JSON.stringify(err.error.errors, null, 2);
        } else if (err?.error?.message) {
          this.error = err.error.message;
        } else {
          this.error = `Failed to save application (${err?.status ?? "?"}).`;
        }
      },
    });
  }
}
