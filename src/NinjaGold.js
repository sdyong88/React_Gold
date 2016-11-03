var React = require('react')
var ReactDOM = require('react-dom')

var App = React.createClass({
	getInitialState: function(){
		return {
			gold: 0,
			locations: [
				{name: 'Farm', min: 10, max: 20},
				{name: 'Cave', min: 5, max: 10},
				{name: 'House', min: 2, max: 5},
				{name: 'Casino', min: -50, max: 50}
			],
			history: []
		}
	},
	render: function (){
		var _that = this;
		var goldSources = this.state.locations.map(function(location){
			return <GoldSource key={location.name} name={location.name} min={location.min} max={location.max} findGold={_that.findGold}/>
		});
		return (
			<div className='app'>
				<h3>Local Time:</h3>
				<p>{new Date().toLocaleTimeString()}</p>
				<GoldDisplay gold={this.state.gold}/>
				<div className='location-container'>
					{goldSources}
				</div>
				<SearchHistory history={this.state.history}/>
			</div>
		);
	},
	findGold: function(result, location){
		var verb = (result < 0) ? 'lost' : 'found'
		var resultDescription = `You ${verb} ${result} golds from the ${location}`
		this.setState({
			gold: this.state.gold +=result,
			history: this.state.history.concat([{verb, resultDescription}])
		});
	}
});

var GoldSource = React.createClass({
	render: function (){
		return (
			<div className='gold-source'>
				<h3>{this.props.name}</h3>
				<p>{(this.props.name !== 'Casino') ? `Earns ${this.props.min}-${this.props.max}` : `Earns/Takes 0-${this.props.max}`}</p>
				<button onClick={this.goldSearch}>Find Gold!</button>
			</div>
		);
	},
	goldSearch: function(){
		var result = Math.round(Math.random()*(this.props.max - this.props.min) + this.props.min);
		this.props.findGold(result, this.props.name);
	}
});

var GoldDisplay = React.createClass({
	render: function (){
		return (
			<div className='gold-display'>
				<h3>Your gold: {this.props.gold}</h3>
			</div>
		);
	}
});

var SearchHistory = React.createClass({
	render: function (){
		var searchEvents = this.props.history.map(function(event, index){
			return <SearchEvent key={index} event={event}/>
		});
		return (
			<div>
				<ul className='search-history'>
					<h3>Activities:</h3>
					{searchEvents.reverse()}
				</ul>
			</div>
		);
	}
});

var SearchEvent = React.createClass({
	render: function (){
		return (
			<li className={this.props.event.verb}>{this.props.event.resultDescription}</li>
		);
	}
});
module.exports = App
// ReactDOM.render(<App />, document.getElementById('root'))
