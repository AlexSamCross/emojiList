import React from 'react';

function Emojis (props) {
	return props.parentState.map(function(emojiObject, i){
		return (
			<span key={i}>{emojiObject.symbol}</span>
		)
	})
}

export default Emojis;