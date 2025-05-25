import { useState, useEffect, useRef } from 'react';

function ListItem({ text }) { return <li>{text}</li> }


export function InfiniteScroll() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const loadingRef = useRef(null)

	useEffect(() => {

		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0]
			console.log('entry', entry)
			if (entry.isIntersecting) loadItems()
		}, { root: null, rootMargin: '0px',threshold:1 })

		if (observer) {
			observer.observe(loadingRef.current)
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, []);


	function loadItems() {
		if (isLoading) return;
		setIsLoading(true);
		setTimeout(() => {
			setItems((prevItems) => {
				const newItems = [...prevItems];
				for (let i = 0; i < 10; i++) {
					newItems.push(`Item ${prevItems.length + i + 1}`);
				}
				return newItems
			})
			setIsLoading(false);
		}, 1000);
	}


	return (
		<div className="infinite-scroll">
			<h1>Infinite scrolling with intersection observer example</h1>
			<ul>
				{items.map((item, index) => (
					<ListItem key={index} text={item} />
				))}
			</ul>
			{isLoading && <p>Loading more items...</p>}
			<div style={{ height: '100px', backgroundColor: 'yellow' }}></div>
			<div id="loading" style={{ height: '5px', backgroundColor: 'red' }} ref={loadingRef}></div>
		</div>
	);
}

