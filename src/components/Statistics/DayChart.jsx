import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation, EventTracker } from '@devexpress/dx-react-chart';

const INITIAL_DATA = [
    {
        gameName: 'Саванна',
        learnedWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestSeries: 0,
    },
    {
        gameName: 'Аудиовызов',
        learnedWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestSeries: 0,
    },
    {
        gameName: 'Спринт',
        learnedWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestSeries: 0,
    },
    {
        gameName: 'Своя игра',
        learnedWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestSeries: 0,
    },
];

const gamesMapping = {
    sprint: 'Спринт',
    savanna: 'Саванна',
    audio: 'Аудиовызов',
    own: 'Своя игра'
};

const getGameName = (gameCode) => {
    return gamesMapping[gameCode] || gamesMapping.own;
}

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
export default class DayChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.recalculateStatistics(props.data) || INITIAL_DATA,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            const data = this.recalculateStatistics(this.props.data) || INITIAL_DATA;
            this.setState({ data });
        }
    }

    recalculateStatistics = (data) => {
        if (data) {
            const today = new Date().toLocaleDateString('ru-RU');
            const result = Object.getOwnPropertyNames(data)
                .filter((game) => data[game].lastChanged === today)
                .map((game) => {
                    const stats = data[game];
                    stats.gameName = getGameName(game);
                    return stats
                }).map((data) => {
                    data.correctAnswersPercent = Math.round(data.correctAnswers * 100 / (data.correctAnswers + data.wrongAnswers)) || 0;
                    return data;
                });
                return result;
        }
    };

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        name="Изученные слова"
                        valueField="learnedWords"
                        argumentField="gameName"
                        color="#ffd700"
                    />
                    <BarSeries
                        name="Правильные ответы(%)"
                        valueField="correctAnswersPercent"
                        argumentField="gameName"
                        color="#c0c0c0"
                    />
                    <BarSeries
                        name="Серия правильных ответов"
                        valueField="longestSeriesOfCorrectAnswers"
                        argumentField="gameName"
                        color="#cd7f32"
                    />
                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text={`Дневная статистика на ${new Date().toLocaleDateString()}`} />
                    <Stack />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
        );
    }
}
