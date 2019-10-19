import React, {Component} from 'react';
import axios from 'axios';
// import { response } from 'express';
import './css/styles.scss';
import CategoryDropdown from './CategoryDropdown';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            category: '',
            fact: '',
            recipient: '',
            isRandom: false,
        };

        this.getRandomFact = this.getRandomFact.bind(this);
        this.getFactFromCategory = this.getFactFromCategory.bind(this);
        this.makeRandom = this.makeRandom.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.onCheck = this.onCheck.bind(this);
    }

    componentDidMount(){
        axios
            .get('/get_categories')
            .then(response => response.data)
            .then(categories => this.setState({categories: categories}));
            
            // const categoriesTwo = JSON.stringify(this.categories);
            // console.log('The Thing: ', categoriesTwo);
    }

    getRandomFact(){
        axios
            .get('/random')
            .then(response => response.data)
            .then(fact => this.setState({fact: fact}));
    }

    getFactFromCategory(category){
        console.log('Category from Method: ', category);

        axios
            .get(`/fact/${category}`)
            .then(response => response.data)
            .then(fact => this.setState({fact: fact}));
    }

    makeRandom(){
        this.setState(prevState => ({
            isRandom: !prevState.isRandom
        }));
        // console.log('Is Random: ', this.state.isRandom);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // onCheck(e) {
    //     this.setState({ [this.state.category]: e.target.value });
    //     // this.setState({ [e.target.name]: value });
    // }

    render() {
        console.log('App Render');
        // console.log('Category in App: ', this.props.category);
        // console.log('App - is Random: ', this.state.isRandom);

        return(
            <div className='grid-container'>
                <div className='row row-one'>
                    <h1 className='header'>
                        Chuck Norris Fact Generator
                    </h1>
                </div>
                <div className='divider'></div>
                <div className='row row-two'>
                    <label>Pick a Category of Facts</label>
                    <CategoryDropdown 
                        categories = {this.state.categories}
                        onCheck={this.onCheck}
                        onChange={this.onChange}
                    ></CategoryDropdown>
                </div>
                <div className='row row-three'>
                    <label>Pick a Fact Recipient</label>
                    <select type='dropdown' name='recipient' value={this.state.recipient} onChange={this.onChange}>
                        <option value='Mike'>Mike</option>
                        <option value='Jess'>Jess</option>
                        <option value='Miles'>Miles</option>
                    </select>
                </div>
                <div className='row row-four'>
                    <input type='checkbox' name='isRandom' value={this.state.isRandom} href='#' onChange={this.makeRandom}></input>
                </div>
                <div className='row row-five'>
                    <div className='fact' name='fact' >{this.state.fact}</div>
                </div>
                <div className='row row-six'>
                    <button className='get-fact-button' name='getFact' 
                        href='#' onClick={this.state.isRandom == true ? this.getRandomFact() : this.getFactFromCategory(this.category)}
                    >Send a Chuck Fact</button>
                </div>
            </div>
        );
    }
}

export default App;