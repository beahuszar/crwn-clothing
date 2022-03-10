import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import SECTIONS_DATA from "./sections.data";
import "./directory.styles.scss";

export default class Directory extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sections: SECTIONS_DATA,
		}
	}

	render() {
		return (
			<div className="directory-menu">
				{
					this.state.sections.map(({ id, ...otherSectionProps }) => {
						return (
							<MenuItem key={id} {...otherSectionProps}/>
						)
					})
				}
			</div>
		)
	}
}
