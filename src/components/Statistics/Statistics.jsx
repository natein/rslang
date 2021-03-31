import * as React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import DayChart from './DayChart';
import DayChartCount from './DayChartCount';
import AllDayChart from './AllDayChart';
import AllDayChartCount from './AllDayChartCount';

function Statistics() {
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
                        <DayChartCount />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <AllDayChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <AllDayChartCount />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;
