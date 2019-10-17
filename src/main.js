import React, {Component} from 'react';
import axios from 'axios';
import { response } from 'express';
import './css/styles.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            category: '',
            joke: '',
        };

        this.handleClickEvent = this.handleClickEvent.bind(this)
    }

    componentDidMount() {
        axios
            .get('/random')
            .then(response => response.data)
            .then(joke => this.setState({joke: joke}));

        axios
            .get('/get_categories')
            .then(response => response.data)
            .then(categories => this.setState({categories: categories}));

        // axios
        //     .get()

    }

    render() {
        return(
            <div className='grid-container'>

            </div>
        );
    }
}

export default App;