import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    {
        year: 1993,
        tvNews: 19,
        church: 29,
        military: 32,
    },
    {
        year: 1995,
        tvNews: 13,
        church: 32,
        military: 33,
    },
    {
        year: 1997,
        tvNews: 14,
        church: 35,
        military: 30,
    },
    {
        year: 1999,
        tvNews: 13,
        church: 32,
        military: 34,
    },
    {
        year: 2001,
        tvNews: 15,
        church: 28,
        military: 32,
    },
    {
        year: 2003,
        tvNews: 16,
        church: 27,
        military: 48,
    },
    {
        year: 2006,
        tvNews: 12,
        church: 28,
        military: 41,
    },
    {
        year: 2008,
        tvNews: 11,
        church: 26,
        military: 45,
    },
    {
        year: 2010,
        tvNews: 10,
        church: 25,
        military: 44,
    },
    {
        year: 2012,
        tvNews: 11,
        church: 25,
        military: 43,
    },
    {
        year: 2014,
        tvNews: 10,
        church: 25,
        military: 39,
    },
    {
        year: 2016,
        tvNews: 8,
        church: 20,
        military: 41,
    },
    {
        year: 2018,
        tvNews: 10,
        church: 20,
        military: 43,
    },
];

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

class AllDayChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
        const { classes } = this.props;

        return (
            <Paper>
                <Chart data={chartData} className={classes.chart}>
                    <ArgumentAxis tickFormat={format} />
                    <ValueAxis max={50} labelComponent={ValueLabel} />

                    <LineSeries name="TV news" valueField="tvNews" argumentField="year" />
                    <LineSeries name="Church" valueField="church" argumentField="year" />
                    <LineSeries name="Military" valueField="military" argumentField="year" />
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                    <Title
                        text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
                        textComponent={TitleText}
                    />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(AllDayChart);
