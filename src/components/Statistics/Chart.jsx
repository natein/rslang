import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

// import { olimpicMedals as data } from '../../../demo-data/data-vizualization';
const data = [
    {
        country: 'Саванна',
        gold: 36,
        silver: 38,
        bronze: 36,
    },
    {
        country: 'Аудиовызов',
        gold: 120,
        silver: 21,
        bronze: 28,
    },
    {
        country: 'Спринт',
        gold: 23,
        silver: 21,
        bronze: 28,
    },
    {
        country: 'Своя игра',
        gold: 19,
        silver: 13,
        bronze: 15,
    },
];

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        paddingTop: '0px',
        paddingBottom: '0px',
    },
});
const legendRootBase = ({ classes, ...restProps }) => <Legend.Root {...restProps} className={classes.root} />;
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => <Legend.Label className={classes.label} {...restProps} />;
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries name="Изученные слова" valueField="gold" argumentField="country" color="#ffd700" />
                    <BarSeries name="Правильные ответы" valueField="silver" argumentField="country" color="#c0c0c0" />
                    <BarSeries
                        name="Серия правильных ответов"
                        valueField="bronze"
                        argumentField="country"
                        color="#cd7f32"
                    />
                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text={`Дневная статистика на ${new Date().toLocaleDateString()}`} />
                    <Stack />
                </Chart>
            </Paper>
        );
    }
}
