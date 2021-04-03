import * as React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LanguageIcon from '@material-ui/icons/Language';
import PeopleIcon from '@material-ui/icons/People';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BarChartIcon from '@material-ui/icons/BarChart';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FeedbackIcon from '@material-ui/icons/Feedback';

const link = {
    color: 'grey',
    textDecoration: 'none',
    fontSize: '16px',
    // fontWeight: '900',
};

export const mainListItems = (
    <div>
        <Link to="/" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Главная" />
            </ListItem>
        </Link>
        <Link to="/ebook" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Учебник" />
            </ListItem>
        </Link>
        <Link to="/dictionary" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Словарь" />
            </ListItem>
        </Link>
        <Link to="/games" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Игры" />
            </ListItem>
        </Link>
        <Link to="/statistics" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Статистика" />
            </ListItem>
        </Link>
        <Link to="/about" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="О команде" />
            </ListItem>
        </Link>
        <Link to="/review" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Отзывы" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Раздел игр</ListSubheader>
        <Link to="/" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Своя игра" />
            </ListItem>
        </Link>
        <Link to="/games/sprint/new" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Спринт" />
            </ListItem>
        </Link>
        <Link to="/" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Аудиовызов" />
            </ListItem>
        </Link>
        <Link to="/games/savanna" style={link}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Саванна" />
            </ListItem>
        </Link>
    </div>
);
