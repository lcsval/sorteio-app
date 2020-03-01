import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent {
	list = Array<number>();

	constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
	}

	number1Change(event) {
		this.list[0] = event.target.value;
	}

	number2Change(event) {
		this.list[1] = event.target.value;
	}

	number3Change(event) {
		this.list[2] = event.target.value;
	}

	number4Change(event) {
		this.list[3] = event.target.value;
	}

	number5Change(event) {
		this.list[4] = event.target.value;
	}

	number6Change(event) {
		this.list[5] = event.target.value;
	}

	public confirm(list) {
		this.dialogRef.close({
			message: 'Confirm',
			list
		});
	}
}