import { h, Component } from 'preact';
import { Card, TextField, Button, Switch, Dialog } from 'preact-mdl';
import data from '../data/pastOrders';

export default class Shelter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
	}

	componentWillMount() {
		google.charts.load('current', {'packages':['corechart', 'bar']});
	}

	componentDidMount() {
    	google.charts.setOnLoadCallback(this.drawChart);
	}

	componentDidUpdate() {
		google.charts.setOnLoadCallback(this.drawChart);
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}

	drawChart = () => {
		// create pie chart data
		const pieData = new google.visualization.DataTable();
        pieData.addColumn('string', 'Topping');
        pieData.addColumn('number', 'Slices');
        pieData.addRows([
          ['Restaurant 1', 2],
          ['Restaurant 2', 4],
          ['Restaurant 3', 1]
        ])
	    const pieOptions = {'title':'Food Most Bought From',
                       'width':'100%',
                       'height': 220};
		const pieChart = new google.visualization.PieChart(document.getElementById('analytics'));

		const pieData2 = new google.visualization.DataTable();
        pieData2.addColumn('string', 'Topping');
        pieData2.addColumn('number', 'Slices');
        pieData2.addRows([
          ['Shelter 1', 2],
          ['Shelter 2', 2],
          ['Shelter 3', 1]
        ])
	    const pieOptions2 = {'title':'Distribution per Homeless Shelter',
                       'width':'100%',
                       'height': 220};
		const pieChart2 = new google.visualization.PieChart(document.getElementById('analytics4'));

		// create line chart
		const lineData = google.visualization.arrayToDataTable([
          ['Month', 'Dollars'],
          ['Jan',  600],
          ['Feb',  450],
          ['Mar',  500],
          ['Apr',  420],
		  ['May',  675],
		  ['June',  700],
		  ['July',  490],
		  ['Aug',  520],
		  ['Sep',  400],
		  ['Oct',  640],
		  ['Nov',  400],
		  ['Dec',  210]
        ]);

        const lineOptions = {
          title: 'Monthy Budget',
          curveType: 'function',
		  width: '100%',
		  Height: 250,
          legend: { position: 'bottom' }
        };

        const lineChart = new google.visualization.LineChart(document.getElementById('analytics2'));

		// line 2 graph 
		const lineData2 = google.visualization.arrayToDataTable([
          ['Month', 'People'],
          ['Jan',  200],
          ['Feb',  220],
          ['Mar',  300],
          ['Apr',  190],
		  ['May',  150],
		  ['June',  160],
		  ['July',  210],
		  ['Aug',  230],
		  ['Sep',  190],
		  ['Oct',  250],
		  ['Nov',  300],
		  ['Dec',  400]
        ]);

        const lineOptions2 = {
          title: 'People Fed',
          curveType: 'function',
		  width: '100%',
		  Height: 250,
          legend: { position: 'bottom' }
        };

        const lineChart2 = new google.visualization.LineChart(document.getElementById('analytics5'));

		
		// draw charts
		
    	pieChart.draw(pieData, pieOptions);
		lineChart.draw(lineData, lineOptions);
		lineChart2.draw(lineData2, lineOptions2);
    }

	renderItems = () => {
		return data.map(i =>
				<Card
				style={{
					boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
					margin: 10,
					position: 'relative',
					width: '100%',
					height: 100,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginLeft: 0,
					marginRight: 0
				}}
				>

				<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}>
					<h1 style={{marginBottom:15}}>
						{i.name}
					</h1>
				</div>


				</Card>
		);
	}
	render() {
		return (
			<div>
				{
					this.state.isModalOpen &&
					<Dialog
					modal={true}
					open={this.state.isModalOpen}
					style={{
						width: 500,
						height: 300,
						zIndex: 9999,
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center'
					}}
					>
					<div
					style={{
						textAlign: 'center',
						width: 400,
						float: 'left'
					}}
					>
						<TextField
						onChange={this.onInputChange}
						name='newItem'
						>Month</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newItem'
						>Day</TextField>
						<TextField
						onChange={this.onInputChange}
						name='newItem'
						>Year</TextField>
					</div>

					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Cancel</Button>
					<Button
					style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)', margin: 5}}
					onClick={this.toggleModal}
					>Set Date</Button>
					</Dialog>
				}
				<div
					style={{
						display:'flex'
					}}
				>
					<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
						width: 400,
						marginRight: 15,
						textAlign: 'center'
					}}>
					<h1
					>Past Deliveries</h1>
					<div
					style={{
						maxHeight: '830',
						height: 780,
						width: 260,
						overflow: 'scroll'
					}}
					>
						{this.renderItems()}
					</div>
					</div>

					<div
					style={{
						display: 'flex',
						flexWrap: 'wrap'
					}}
					>
						<div
						style={{
							display: 'flex',
							flexWrap: 'no-wrap',
							flexDirection: 'row',
							maxHeight: '100px',
							marginBottom: 3,
							width: '100%'
						}}
						>
							<Card
							style={{
								margin: 3,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								flexGrow: 1,
								display: 'flex',
								alignContent: 'center',
								textAlign:'center'
							}}
							>
							<h3>Deliver Food Today</h3>
							<div style={{marginLeft:'47%'}}><div style={{width: '50%'}}><Switch/></div></div>
							</Card>
							<Card
							style={{
								margin: 3,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								flexGrow: 1,
								alignContent: 'center',
								textAlign:'center'
							}}
							>
							<h3>Pick a Delivery Date</h3>
							<div>
								<Button style={{boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'}} onClick={this.toggleModal}>Pick Date</Button>
							</div>
							</Card>

							<Card
							style={{
								margin: 3,
								flexGrow: 1,
								boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
								height: '100px',
								minHeight: '100px',
								alignContent: 'center',
								textAlign:'center'
							}}
							><h3>$600 Donated This Month</h3></Card>
						</div>


						<Card style={{
							float:'right',
							boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
							width: '100%',
							height: '86%',
							overflow: 'hide'
						}}
							>
							<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'center'
							}}
							>	
								<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
								>	
									<div id='analytics'></div>
									<div id='analytics4'></div>
								</div>

								<div
								style={{
									width: '100%'
								}}
								id='analytics2'></div>
								<div
								style={{
									width: '100%'
								}}
								id='analytics5'></div>
							</div>
							

						</Card>
					</div>
				</div>
			</div>
		);
	}
}
