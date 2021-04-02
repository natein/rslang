import React from 'react';

import { Avatar, Grid, Paper } from '@material-ui/core';

const imgLink =
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

const data = [
    {
        review: 'very good',
        date: '02.04.2021',
        name: 'second@gmail.com',
        avatar: imgLink,
    },
    {
        review: 'very good, very good, very good, very good, very good, very good, very good',
        date: '12.03.2021',
        name: 'third@gmail.com',
        avatar: imgLink,
    },
    {
        review: 'magnificent, very good, very good и по русски НЕМНОГО',
        date: '25.03.2021',
        name: 'first@gmail.com',
        avatar: imgLink,
    },
    {
        review: 'magnificent and other and other',
        date: '17.03.2021',
        name: 'four@gmail.com',
        avatar: imgLink,
    },
    {
        review: 'go go go learning',
        date: '05.03.2021',
        name: 'five@gmail.com',
        avatar: imgLink,
    },
    {
        review: 'want some more english words',
        date: '23.03.2021',
        name: 'six@gmail.com',
        avatar: imgLink,
    },
];

function LastReview() {
    const threeReview = data.sort(() => Math.random() - Math.random()).slice(0, 3);

    return (
        <div style={{ padding: 14, marginBottom: '16px' }} className="App">
            <h1>Отзывы о проекте</h1>
            {threeReview.map((review) => {
                return (
                    <Paper style={{ padding: '40px 20px', marginBottom: 10 }}>
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
