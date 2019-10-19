import React, {Component} from 'react';

class CategoryDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
        };

        // this.onChange = this.onChange.bind(this);
    }

    // onChange(e){
    //     this.setState({[e.target.name]: e.target.value})
    //     console.log('Category: ', e.target.value);
    // }

    // console.log('Component Category: ', category);

    render(){
        console.log('Component Render');
        
        const categories = this.state.categories;
        const categoryItems = categories.map((category) => <option key={category} value={category}>{category}</option>);
        
        return(
            <select type='dropdown' name='category' value={this.state.category} onChange={this.props.onChange}>
                {categoryItems}
            </select>
        );
    }
}

export default CategoryDropdown;