import React, { useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const styles = makeStyles({
    input: {
        display: 'none',
    },
    button: {
        color: blue[900],
        margin: 10,
    },
    avatar: {
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '10px auto',
      width: '56px',
      height: '56px',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '&>img': {
        width: '56px',
        height: '56px',
        objectFit: 'cover',
      }
    }
});

const ImageUploadCard = (props, ref) => {
    const classes = styles();
    const [image, setImage] = useState(null);
    const [isImageUploaded, setImageUploaded] = useState(false);

    const handleUploadClick = (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            ref.current = [reader.result];
            setImage([reader.result]);
        };
        setImageUploaded(true);
    };

    const imageResetHandler = () => {
        setImageUploaded(false);
        ref.current = null;
    };

    return (
        <>
            {!isImageUploaded && (
                <Grid container justify="center" alignItems="center">
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="avatar"
                        multiple
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="avatar">
                        <Fab component="span" className={classes.button}>
                            <AddPhotoAlternateIcon />
                        </Fab>
                    </label>
                </Grid>
            )}
            {isImageUploaded && (
                <CardActionArea onClick={imageResetHandler} className={classes.avatar}>
                    <img src={image} alt="avatar" />
                </CardActionArea>
            )}
        </>
    );
};

export default React.forwardRef(ImageUploadCard);