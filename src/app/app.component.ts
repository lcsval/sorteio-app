import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'sorteio-app';
	list: Array<{ number: number, visible: boolean }>;

	onSort() {
		this.sortNumbers();

		let interval = setInterval(gen => {
			const { value, done } = gen.next()

			if (done)
				clearInterval(interval)
			else 
				this.list[this.list.indexOf(value)].visible = true;

		}, 1000, this.list[Symbol.iterator]())

	}

	private sortNumbers() {
		this.list = [
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
			{ number: Math.floor((Math.random() * 60) + 1), visible: false },
		];
	}
}
