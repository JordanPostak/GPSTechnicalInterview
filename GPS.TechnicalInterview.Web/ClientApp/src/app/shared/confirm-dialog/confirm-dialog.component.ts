import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  // data will be assigned by the opener via dialogRef.componentInstance.data
  public data!: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  };

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}