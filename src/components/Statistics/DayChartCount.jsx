import * as React from 'react';
import { Chart, ArgumentAxis, ValueAxis, AreaSeries, Title, Legend, Tooltip } from '@devexpress/dx-react-chart-material-ui';

import { ArgumentScale, Animation, EventTracker } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';
import { withStyles } from '@material-ui/core/styles';

const INITIAL_POINT = { date: 'Start', learnedWordsCount: 0, correctAnswersPercent: 0 };

const chartRootStyles = {
    chart: {
        paddingRight: '20px',
    },
};
const legendStyles = {
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        paddingTop: '0px',
        paddingBottom: '0px',
        overflow: 'hidden'
    },
};
const legendLabelStyles = (theme) => ({
    label: {
        paddingTop: theme.spacing(1),
    },
});
const legendItemStyles = {
    item: {
        whiteSpace: 'nowrap',
    },
};

const ChartRootBase = ({ classes, ...restProps }) => <Chart.Root {...restProps} className={classes.chart} />;
const LegendRootBase = ({ classes, ...restProps }) => <Legend.Root {...restProps} className={classes.root} />;
const LegendLabelBase = ({ classes, ...restProps }) => <Legend.Label {...restProps} className={classes.label} />;
const LegendItemBase = ({ classes, ...restProps }) => <Legend.Item {...restProps} className={classes.item} />;
const ChartRoot = withStyles(chartRootStyles, { name: 'ChartRoot' })(ChartRootBase);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);
const LegendItem = withStyles(legendItemStyles, { name: 'LegendItem' })(LegendItemBase);

export default class DayChartCount extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [INITIAL_POINT, this.processGamesDayStatistics(props.data)],
        };
    }

    processGamesDayStatistics = (data) => {
        const today = new Date().toLocaleDateString('ru-RU');
        const result = Object.getOwnPropertyNames(data)
            .filter((game) => data[game].lastChanged === today)
            .reduce(
                (accumulator, game) => ({
                    learnedWordsCount: accumulator.learnedWordsCount + data[game].learnedWords,
                    correctAnswersCount: accumulator.correctAnswersCount + data[game].correctAnswers,
                    wrongAnswersCount: accumulator.wrongAnswersCount + data[game].wrongAnswers,
                }),
                { learnedWordsCount: 0, correctAnswersCount: 0, wrongAnswersCount: 0 },
            );
        result.date = 'Current';
        result.correctAnswersPercent = Math.round(result.correctAnswersCount * 100 / (result.correctAnswersCount + result.wrongAnswersCount)) || 0;
        return result;
    };

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const data = [INITIAL_POINT, this.processGamesDayStatistics(this.props.data)];
            this.setState({ data });
        }
    }

    render() {
        const { data: chartData } = this.state;
        return (
            <Chart data={chartData} rootComponent={ChartRoot}>
                <ArgumentScale factory={scalePoint} />
                <ArgumentAxis />
                <ValueAxis />

                <AreaSeries name="Правильные ответы(%)" valueField="correctAnswersPercent" argumentField="date" />
                <AreaSeries name="Изученные слова" valueField="learnedWordsCount" argumentField="date" />
                <Animation />
                <Legend
                    position="bottom"
                    rootComponent={LegendRoot}
                    itemComponent={LegendItem}
                    labelComponent={LegendLabel}
                />
                <Title text="Общая дневная статистика" />
                <EventTracker />
                <Tooltip />
            </Chart>
        );
    }
}
