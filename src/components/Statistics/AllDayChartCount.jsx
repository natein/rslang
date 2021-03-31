import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
    {
        year: '19.03',
        words: 19,
    },
    {
        year: '20.03',
        words: 13,
    },
    {
        year: '21.03',
        words: 14,
    },
    {
        year: '22.03',
        words: 13,
    },
    {
        year: '23.03',
        words: 15,
    },
    {
        year: '24.03',
        words: 16,
    },
    {
        year: '25.03',
        words: 12,
    },
    {
        year: '26.03',
        words: 11,
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

class AllDayChartCount extends React.PureComponent {
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

                    <LineSeries name="Кол-во" valueField="words" argumentField="year" />
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                    <Title text={`Увеличение общего количества  ${'\n'}изученных слов`} textComponent={TitleText} />
                    <Animation />
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(AllDayChartCount);
