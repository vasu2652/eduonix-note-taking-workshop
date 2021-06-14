import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { DeleteRounded } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    listItemText:{
      fontSize:'22px',//Insert your required size
    }
}));

export default function CheckboxListSecondary(props) {
    const { items } = props;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <List dense className={classes.root}>
            {items.map((value, index) => {
              console.log(value)
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={index} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${index+1}. ${value.title}`} classes={{primary:classes.listItemText}}/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <DeleteRounded onClick ={()=>props.handleDelete(value.id)}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
        </List>
    );
}
