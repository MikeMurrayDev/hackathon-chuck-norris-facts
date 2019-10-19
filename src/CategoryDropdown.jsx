import React, {Component} from 'react';

class CategoryDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <select type='dropdown' name='categories' value={this.state.category} onChange={this.onChange}>
                {this.props.categories.map( cat =>
                    <option key={cat.key} value={cat.key}>{cat.value}</option>
                )};
            </select>
        );
    }
}

export default CategoryDropdown;