import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  message: String

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) message: String
  ) { 
    this.message = message
  }

  ngOnInit(): void {
  }

  yes(): void {
    this.dialogRef.close(true)
  }

  no(): void {
    this.dialogRef.close(false)
  }

}
