import React, {Component} from 'react';

class CategoryDropdown extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const categories = this.props.categories;
        const categoryItems = categories.map((category) => <option key={category} value={category}>{category}</option>);
        
        return(
            <select type='dropdown' name='category' value={this.props.category} onChange={this.props.changeCategory}>
                {categoryItems}
            </select>
        );
    }
}

export default CategoryDropdown;