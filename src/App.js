import React, { useState } from 'react';
import { MuuriComponent } from 'muuri-react';
import './App.css';

export function oneOf(array) {
	return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
	const items = [];
	for (let i = 0; i < 3; i++) {
		const color = oneOf(['red', 'green', 'blue']);
		const width = oneOf([1, 2]);
		const height = oneOf([1, 2]);

		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		const title = oneOf(alphabet) + oneOf(alphabet);
		const id = uuid++;

		items.push({ id, color, width, height, title });
	}

	return items;
}

const App = () => {
	// Items state.
	const [items, setItems] = useState(generateItems());

	// Children.
	const children = items.map(({ id, color, title, width, height }) => (
		<Item
			key={id}
			color={color}
			title={title}
			width={width}
			height={height}
			remove={() => setItems(items.filter((item) => item.id !== id))}
		/>
	));

	return (
		<div>
			{/* Content */}
			<MuuriComponent>{children}</MuuriComponent>
			{/* Footer */}
			<footer>
				<button onClick={() => setItems(items.concat(generateItems()))}>
					Add stuff
				</button>
			</footer>
		</div>
	);
};

// Item component.
const Item = ({ color, width, height, title, remove }) => {
	return (
		<div className={`item h${height} w${width} ${color}`}>
			<div className="item-content">
				<div className="card">
					<div className="card-title">{title}</div>
					<div className="card-remove">
						<i className="material-icons" onMouseDown={remove}>
							&#xE5CD;
						</i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
