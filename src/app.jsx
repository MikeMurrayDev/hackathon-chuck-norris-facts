import React, {Component} from 'react';
import axios from 'axios';
import './css/styles.scss';
import CategoryDropdown from './CategoryDropdown';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            category: 'animal',
            fact: '',
            recipient: 'Mike',
            isRandom: false,
        };

        this.getRandomFact = this.getRandomFact.bind(this);
        this.getFactFromCategory = this.getFactFromCategory.bind(this);
        this.makeRandom = this.makeRandom.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeRecipient = this.changeRecipient.bind(this);
        this.sendFact = this.sendFact.bind(this);
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
        .then(response => JSON.stringify(response.data.value))
        .then(fact => this.setState({fact: fact}));
    }

    getFactFromCategory(){
        axios
            .get(`/fact/${this.state.category}`)
            .then(response => JSON.stringify(response.data.value))
            .then(fact => this.setState({fact: fact}));
    }

    makeRandom(){
        this.setState(prevState => ({
            isRandom: !prevState.isRandom
        }));
    }

    changeCategory(e) {
        let categoryValue = e.target.value;
        this.setState({ category: categoryValue });
    }

    changeRecipient(e){
        let recipientValue = e.target.value;
        this.setState({ recipient: recipientValue });
    }

    sendFact(){
        const body = {
            fact: this.state.fact,
            recipient: this.state.recipient
        };

        fetch(`/send_fact`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
    }

    render() {
        return(
            <div className='grid-container'>
                <div className='row'>
                    <h1 className='header'>
                        Chuck Norris Fact Generator
                    </h1>
                </div>
                <div className='divider'></div>
                <div className='row'>
                    <label>Pick a Category of Facts</label>
                    <CategoryDropdown 
                        categories = {this.state.categories}
                        changeCategory={this.changeCategory}
                    ></CategoryDropdown>
                </div>
                <div className='row'>
                    <label>Pick a Fact Recipient</label>
                    <select type='dropdown' name='recipient' value={this.state.recipient} onChange={this.changeRecipient}>
                        <option value='Mike'>Mike</option>
                        <option value='Jess'>Jess</option>
                        <option value='Miles'>Miles</option>
                    </select>
                </div>
                <div className='row'>
                    <label>Random Fact</label>
                    <input type='checkbox' name='isRandom' value={this.state.isRandom} href='#' onChange={this.makeRandom}></input>
                    <div className='divider'></div>
                </div>
                <div className='row'>
                    <button className='get-fact-button' name='getFact' 
                        href='#' onClick={this.state.isRandom == true ? this.getRandomFact : this.getFactFromCategory}
                    >Get a Chuck Fact</button>
                </div>
                <div className='row'>
                    <label>Fact to be sent:</label>
                    <div>{this.state.fact}</div>
                    <div className='divider'></div>
                </div>
                <div className='row'>
                <div className='divider'></div>
                    <button className='send-fact-button' name='sendFact' 
                        href='#' onClick={this.sendFact}
                    >Send this Chuck Fact</button>
                </div>
            </div>
        );
    }
}

export default App;