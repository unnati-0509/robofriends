import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchfield, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.returnRequestRobots.robots,
        error: state.returnRequestRobots.error,
        isPending: state.returnRequestRobots.isPending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App(props){
    const { searchField, onSearchChange, robots, onRequestRobots, isPending} = props;

    useEffect(() => {
        onRequestRobots();
    }, [onRequestRobots])

    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    return (isPending) ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             robots: [],
//             searchfield: ''
//         }
//     }

//     componentDidMount() {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//             .then(users=> this.setState({robots: users}));
//     }

//     onSearchChange = (event) => {
//         this.setState({ searchfield: event.target.value })
//     }

//     render() {
//         const { robots, searchfield } = this.state;
//         const filteredRobots = robots.filter(robot =>{
//             return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//         })
//         return (!robots.length) ?
//              <h1>Loading</h1> :
//             (
//                 <div className='tc'>
//                     <h1 className='f1'>RoboFriends</h1>
//                     <SearchBox searchChange={this.onSearchChange} />
//                     <Scroll>
//                         <ErrorBoundary>
//                             <CardList robots={filteredRobots}/>
//                         </ErrorBoundary>
//                     </Scroll>
//                 </div>
//             );
//     }
// }

//export default App;