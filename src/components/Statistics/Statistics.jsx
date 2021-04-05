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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <DayChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                        <DayChartCount data={statistics?.optional?.gameStatistics || {}}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <AllDayChart data={statistics?.optional?.wordStatistics || {}} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
