import * as React from 'react';
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
        overflow: 'hidden'
    },
});
const legendLabelStyles = (theme) => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
        '&>span': {
            whiteSpace: 'normal'
        }
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

    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return <ValueAxis.Label {...props} text={`${text}`} />;
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
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
            data: this.recalculateStatistics(props.data, props.learnedWords),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const data = this.recalculateStatistics(this.props.data);
            this.setState({ data });
        }
    }

    recalculateStatistics = (data) => {
        let summ = 0;
        return Object.getOwnPropertyNames(data)
            .sort((first, second) => {
                const firstDate = new Date(first).getTime();
                const secondDate = new Date(second).getTime();
                return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
            })
            .map((day) => {
                summ += data[day];
                data[day] = summ;
                return day;
            })
            .map((day) => ({
                date: day,
                count: data[day],
            }));
    };

    render() {
        const { data: chartData } = this.state;
        const { classes } = this.props;

        return (
            <Chart data={chartData} className={classes.chart}>
                <ArgumentAxis tickFormat={format} />
                <ValueAxis labelComponent={ValueLabel} />

                <LineSeries
                    name="Общее кол-во изучаемых слов на определенный день"
                    valueField="count"
                    argumentField="date"
                    seriesComponent={LineWithPoints}
                />
                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                <Title text={`Увеличение общего количества  ${'\n'}изученных слов`} textComponent={TitleText} />
                <Animation />
                <EventTracker />
                <Tooltip />
            </Chart>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(AllDayChartCount);
