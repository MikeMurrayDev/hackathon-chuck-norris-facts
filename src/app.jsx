import React, {Component} from 'react';
// import axios from 'axios';
// import { response } from 'express';
import './css/styles.scss';
import CategoryDropdown from './CategoryDropdown';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            fact: '',
            recipient: '',
            isRandom: false,
        };

        this.getRandomFact = this.getRandomFact.bind(this)
        this.getFactFromCategory = this.getFactFromCategory.bind(this)
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        axios
            .get('/get_categories')
            .then(response => response.data)
            .then(categories => this.setState({categories: categories}));
    }

    getRandomFact(){
        axios
            .get('/random')
            .then(response => response.data)
            .then(fact => this.setState({fact: fact}));
    }

    getFactFromCategory(category){
        axios
            .get(`/fact/${category}`)
            .then(response => response.data)
            .then(fact => this.setState({fact: fact}));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
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
                    <CategoryDropdown></CategoryDropdown>
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
                    <input type='checkbox' name='isRandom' href='#' onChange={() => this.state.isRandom(!this.state.isRandom)}></input>
                </div>
                <div className='row row-five'>
                    <div className='fact' name='fact' >{this.state.fact}</div>
                </div>
                <div className='row row-six'>
                    <button className='get-fact-button' name='getFact' 
                        href='#' onChange={() => this.getRandomFact()}
                    >Get Random Fact</button>
                </div>
            </div>
        );
    }
}

export default App;