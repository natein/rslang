import * as React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import DayChart from './DayChart';
import DayChartCount from './DayChartCount';
import AllDayChart from './AllDayChart';
import AllDayChartCount from './AllDayChartCount';

import * as statisticsActions from '../../actions/statisticsActions';

function Statistics({ statistics, loadStatistics, clearStatistics }) {
    React.useEffect(() => {
        clearStatistics();
        loadStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item sx={12} sm={12} md={7} lg={9} style={{overflow: 'hidden'}}>
                    <Paper>
                        <DayChart data={statistics?.optional?.gameStatistics}/>
                    </Paper>
                </Grid>
                <Grid item sx={12} sm={12} md={5} lg={3} style={{overflow: 'hidden'}}>
                    <Paper>
                        <DayChartCount data={statistics?.optional?.gameStatistics || {}}/>
                    </Paper>
                </Grid>
                <Grid item sx={12} sm={12} md={6} lg={6} style={{overflow: 'hidden'}}>
                    <Paper>
                        <AllDayChart data={statistics?.optional?.wordStatistics || {}} />
                    </Paper>
                </Grid>
                <Grid item sx={12} sm={12} md={6} lg={6} style={{overflow: 'hidden'}}>
                    <Paper>
                        <AllDayChartCount data={statistics?.optional?.wordStatistics || {}} learnedWords={statistics.learnedWords || 0}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    statistics: state.statistics
});

const mapDispatchToProps = (dispatch) => ({
    loadStatistics: () => dispatch(statisticsActions.getUserStatistics()),
    clearStatistics: () => dispatch(statisticsActions.clearUserStatistics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
