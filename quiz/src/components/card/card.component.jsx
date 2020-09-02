import React from 'react';
import './card.component.scss';
export const Card = (props) => {
	// console.log(props.monsters.name);
	return (
		<div className="card-container">
			<img alt="monster" src={`https://robohash.org/${props.users.id}?set=set2&size=180x180`} />
			<h1> {props.users.name} </h1>
			<p> {props.users.email} </p>
		</div>
	);
};