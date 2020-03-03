import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'sorteio-app';
	sortedNumbers: boolean = true;
	disOnSort: boolean = false;
	disOnGenNewNumbers: boolean = false;
	disOnGenNewGame: boolean = false;

	listPrincipal = Array<{ number: number, visible: boolean }>();
	listGames = Array<Array<number>>();

	constructor(private dialog: MatDialog) { }

	ngOnInit(): void {
		this.listPrincipal = this.sortNumbers(false);

		this.listGames = [
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray()
		];
	}

	onSort() {
		this.sortedNumbers = false;
		this.disOnGenNewNumbers = true;
		this.disOnSort = true;
		this.disOnGenNewGame = true;

		this.listPrincipal = this.sortNumbers(true);

		this.cleanExistingMatchingNumber();

		let interval = setInterval(gen => {
			const { value, done } = gen.next()

			if (done) {
				clearInterval(interval);
				this.disOnGenNewNumbers = false;
				this.disOnSort = false;
				this.disOnGenNewGame = false;
			}
			else {
				this.listPrincipal[this.listPrincipal.indexOf(value)].visible = true;
				this.matchExistingNumbers(value);
			}

		}, 1000, this.listPrincipal[Symbol.iterator]());
	}

	onGenNewNumbers() {
		this.listGames = [
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray(),
			this.generateNewSimpleArray()
		];

		this.listPrincipal = [
			{ number: 0, visible: false },
			{ number: 0, visible: false },
			{ number: 0, visible: false },
			{ number: 0, visible: false },
			{ number: 0, visible: false },
			{ number: 0, visible: false }
		];
	}

	onGenNewGame() {
		const dialogRef = this.dialog.open(ModalComponent, { width: '350px' });

		dialogRef.afterClosed().subscribe(result => {
			let lst = [];
			result.list.forEach(f => lst.push(Number(f)));

			this.listGames.push(lst);
			this.listPrincipal.forEach(f => this.matchExistingNumbers(f));
		});
	}

	private matchExistingNumbers(value: any) {
		this.listGames.forEach((list, listIndex) => {
			list.forEach(child => {
				if (child == value.number) {
					var el = document.getElementById(`l${listIndex}c${child}`);

					if (el != null)
						el.style.background = 'green';
				}
			});
		});
	}

	private cleanExistingMatchingNumber() {
		this.listGames.forEach((list, listIndex) => {
			list.forEach(child => {
				document.getElementById(`l${listIndex}c${child}`).style.background = 'black';
			});
		});
	}

	private sortNumbers(genNumber: boolean) {
		return [
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: false },
		];
	}

	private generateNewSimpleArray() {
		var number = [];
		while (number.length < 6) {
			var r = Math.floor(Math.random() * 60) + 1;
			if (number.indexOf(r) === -1)
				number.push(r);
		}

		return number;
	}
}