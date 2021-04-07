import React from 'react';

import { Avatar, Grid, Paper } from '@material-ui/core';

function LastReview({ review }) {

    return (
        <div style={{ padding: 14, marginBottom: '16px' }} className="App">
            <h1 style={{ color: 'white' }}>Отзывы о проекте</h1>
            {review.map((review) => {
                return (
                    <Paper key={review._id} style={{ padding: '40px 20px', marginBottom: 10 }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={review.avatar} />
                            </Grid>
                            <Grid justifycontent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: 'left' }}>{review.name}</h4>
                                <p style={{ textAlign: 'left', fontFamily: 'Segoe script, cursive', fontSize: 'larger' }}>
                                    {review.review}
                                </p>
                                <p style={{ textAlign: 'left', color: 'gray' }}>{review.date}</p>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            })}
        </div>
    );
}

export default LastReview;
