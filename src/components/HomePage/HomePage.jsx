import React from 'react';
import Box from '@material-ui/core/Box';

// import background from "../../assets/main_bg.jpg";

function HomePage() {

    return (
        <div style={{ width: '100%' }}>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
            RSLang
            </Box>
            {/* <div style={{ backgroundImage: `url(${background})` }}> */}
            <div>
            <Box p={1} bgcolor="grey.300">
              Item 2
            </Box>
            <Box p={1} bgcolor="grey.300">
              Item 3
            </Box>
            </div>
          </Box>
          <h2>
                Изучи английский язык не выходя из дома! Ты расширишь свой словарный запас на 4000 слов, используя
                современную методику обучения.
            </h2>
        </div>
      );
}

export default HomePage;
