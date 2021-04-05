import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
    ScatterSeries,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

import { symbol, symbolCircle } from 'd3-shape';

const format = () => (tick) => tick;
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = (theme) => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => <Legend.Root {...restProps} className={classes.root} />;
const legendLabelBase = ({ classes, ...restProps }) => <Legend.Label className={classes.label} {...restProps} />;
const legendItemBase = ({ classes, ...restProps }) => <Legend.Item className={classes.item} {...restProps} />;
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return <ValueAxis.Label {...props} text={`${text}%`} />;
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
    },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

const Point = (props) => {
    const { arg, val, color } = props;
    return (
        <path
            fill={color}
            transform={`translate(${arg} ${val})`}
            d={symbol()
                .size([10 ** 2])
                .type(symbolCircle)()}
            style={{
                stroke: 'white',
                strokeWidth: '1px',
            }}
        />
    );
};

const LineWithPoints = (props) => {
    return (
        <>
            <LineSeries.Path {...props} />
            <ScatterSeries.Path {...props} pointComponent={Point} />
        </>
    );
};

class AllDayChartCount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.recalculateStatistics(props.data, props.learnedWords);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.recalculateStatistics(this.props.data, this.props.learnedWords);
        }
    }

    recalculateStatistics = (data, learnedWords) => {
        const allDayStats = Object.getOwnPropertyNames(data)
            .sort((first, second) => {
                const firstDate = new Date(first).getTime();
                const secondDate = new Date(second).getTime();
                return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
            })
            .map((day) => ({
                date: day,
                percentage: Math.round((data[day] * 100) / learnedWords),
            }));
        this.setState({ data: allDayStats });
    };

    render() {
        const { data: chartData } = this.state;
        const { classes } = this.props;

        return (
            <Paper>
                <Chart data={chartData} className={classes.chart}>
                    <ArgumentAxis tickFormat={format} />
                    <ValueAxis labelComponent={ValueLabel} />

                    <LineSeries
                        name="Процент изученных слов в день к общему числу изученных слов"
                        valueField="percentage"
                        argumentField="date"
                        seriesComponent={LineWithPoints}
                    />
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                    <Title text={`Увеличение общего количества  ${'\n'}изученных слов`} textComponent={TitleText} />
                    <Animation />
                    <EventTracker />
                    <Tooltip contentComponent={({text}) => `${text} %`}/>
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(AllDayChartCount);
