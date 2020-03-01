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
	listOne = Array<{ number: number, visible: boolean }>();
	listTwo = Array<{ number: number, visible: boolean }>();
	listThree = Array<{ number: number, visible: boolean }>();
	listFour = Array<{ number: number, visible: boolean }>();
	listFive = Array<{ number: number, visible: boolean }>();

	list = Array<Array<{ number: number, visible: boolean }>>();

	constructor(private dialog: MatDialog) { }

	ngOnInit(): void {
		this.listPrincipal = this.sortNumbers(false, false);
		this.listOne = this.sortNumbers(true, true);
		this.listTwo = this.sortNumbers(true, true);
		this.listThree = this.sortNumbers(true, true);
		this.listFour = this.sortNumbers(true, true);
		this.listFive = this.sortNumbers(true, true);

		this.list.push(this.listOne);
		this.list.push(this.listTwo);
		this.list.push(this.listThree);
		this.list.push(this.listFour);
		this.list.push(this.listFive);
	}

	onSort() {
		this.sortedNumbers = false;
		this.disOnGenNewNumbers = true;
		this.disOnSort = true;
		this.disOnGenNewGame = true;

		this.listPrincipal = this.sortNumbers(true, false);

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
		this.cleanExistingMatchingNumber();
		this.listOne = this.sortNumbers(true, true);
		this.listTwo = this.sortNumbers(true, true);
		this.listThree = this.sortNumbers(true, true);
		this.listFour = this.sortNumbers(true, true);
		this.listFive = this.sortNumbers(true, true);

		this.listPrincipal.forEach(f => this.matchExistingNumbers(f));
	}

	onGenNewGame() {
		const dialogRef = this.dialog.open(ModalComponent, { width: '350px' });

		dialogRef.afterClosed().subscribe(result => {
			var listaFilho = [];

			
			debugger;
			result.list.forEach(f => {
				listaFilho.push({ number: f, visible: true});
			});

			debugger;
			this.list.push( new Array() { listaFilho });
		});
	}

	private matchExistingNumbers(value: any) {
		if (this.listOne.filter(f => f.number == value.number).length > 0)
			document.getElementById(`lo${this.listOne.indexOf(this.listOne.filter(f => f.number == value.number)[0])}`).style.background = 'green';

		if (this.listTwo.filter(f => f.number == value.number).length > 0)
			document.getElementById(`lt${this.listTwo.indexOf(this.listTwo.filter(f => f.number == value.number)[0])}`).style.background = 'green';

		if (this.listThree.filter(f => f.number == value.number).length > 0)
			document.getElementById(`lr${this.listThree.indexOf(this.listThree.filter(f => f.number == value.number)[0])}`).style.background = 'green';

		if (this.listFour.filter(f => f.number == value.number).length > 0)
			document.getElementById(`lf${this.listFour.indexOf(this.listFour.filter(f => f.number == value.number)[0])}`).style.background = 'green';

		if (this.listFive.filter(f => f.number == value.number).length > 0)
			document.getElementById(`lv${this.listFive.indexOf(this.listFive.filter(f => f.number == value.number)[0])}`).style.background = 'green';
	}

	private cleanExistingMatchingNumber() {
		for (var i = 0; i < 6; i++) {
			document.getElementById(`lo${i}`).style.background = 'black';
			document.getElementById(`lt${i}`).style.background = 'black';
			document.getElementById(`lr${i}`).style.background = 'black';
			document.getElementById(`lf${i}`).style.background = 'black';
			document.getElementById(`lv${i}`).style.background = 'black';
		}
	}

	private sortNumbers(genNumber: boolean, isVisible: boolean) {
		return [
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
			{ number: genNumber ? Math.floor((Math.random() * 60) + 1) : 0, visible: isVisible },
		];
	}

	teste(item, index) {
		debugger;
		return item[index].number;
	}
}
