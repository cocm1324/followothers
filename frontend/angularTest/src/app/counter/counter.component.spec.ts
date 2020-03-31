import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
	let component: CounterComponent;
	let fixture: ComponentFixture<CounterComponent>
	let debugElement: DebugElement;
	let htmlElement: HTMLElement; // to read html element

	// why async? for compileComponents(load html, css)
	// TestBed is imported from angular core
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CounterComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		// fixture is some kind of Class that holds reference to component instances and other metadata
		fixture = TestBed.createComponent(CounterComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();

		debugElement = fixture.debugElement.query(By.css('p'));
		htmlElement = debugElement.nativeElement;
	});

	it('should increment the counter number by one', () => {
		// arrange
		const initialValue = component.counter;

		// act
		component.increment();
		const newValue = component.counter;

		// Assert
		expect(newValue).toBeGreaterThan(initialValue);
	})

	
	it('should decrement the counter number by one', () => {
		// arrange
		const initialValue = component.counter;

		// act
		component.decrement();
		fixture.detectChanges();
		const newValue = component.counter;

		// Assert
		expect(newValue).toBeLessThan(initialValue);
	})

	it('should display the current number of the counter', () => {
		// Assert that the text on screen is of number 1
		expect(htmlElement.textContent).toEqual('Number: 1');
	});
});
