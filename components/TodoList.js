import React, { useState } from "react";
import { Fragment } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(to bottom, #e1f5fe, #b3e5fc)",
    minHeight: "100vh",
    padding: "20px",
  },
  "@keyframes slideUp": {
    from: { transform: "translate(0, 50%)", opacity: 0 },
    to: { transform: "translate(0, 0)", opacity: 1 },
  },
  slideUpEffect: {
    animationName: "$slideUp",
    animationDuration: ".3s",
  },
  "@keyframes slideLeft": {
    from: { transform: "translate(0, 0)", opacity: 0.7 },
    to: { transform: "translate(-100%, 0)", opacity: 0 },
  },
  slideLeftEffect: {
    animationName: "$slideLeft",
    animationDuration: ".4s",
  },
  listItem: {
    "&.MuiListItem-root": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

const TodoList = () => {
  const classes = useStyles();
  let inRef = null;
  const [idIndex, setIdIndex] = useState(3);
  const [todoList, setTodoList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleItem = (value) => () => {
    const copy = [...todoList];
    copy.forEach((e) => {
      if (e.id === value) e.checked = !e.checked;
    });
    setTodoList(copy);
  };

  const deleteRequestItem = (value) => () => {
    const copy = [...todoList];
    let removeItem = undefined;
    copy.forEach((e) => {
      if (e.id === value) {
        e.anim = true;
        removeItem = e;
      }
    });
    setTodoList(copy);
    setTimeout(() => {
      deleteItem(removeItem);
    }, 300);
  };

  const deleteItem = (value) => {
    const copy = [...todoList];
    let index = copy.indexOf(value);
    if (index !== -1) {
      copy.splice(index, 1);
      setTodoList(copy);
    }
  };

  const addItem = () => {
    const data = {
      id: idIndex,
      checked: false,
      text: inRef.value,
      date: selectedDate ? selectedDate.toLocaleDateString() : null,
      anim: false,
    };
    setIdIndex(idIndex + 1);
    const copy = [...todoList];
    copy.push(data);
    setTodoList(copy);
    inRef.value = "";
    setSearchQuery("");
    setSelectedDate(null);
  };

  const filteredList = todoList.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={classes.root}>
      <ListItem
        key={"input"}
        button
        disableRipple
      >
        <TextField
          fullWidth={true}
          label='Add'
          inputRef={(ref) => (inRef = ref)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label='Select Date'
            value={selectedDate}
            onChange={handleDateChange}
            format='MM/dd/yyyy'
            clearable
            disablePast
          />
        </MuiPickersUtilsProvider>
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            onClick={addItem}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem
        key={"input"}
        button
        disableRipple
      >
        <TextField
          fullWidth={true}
          label='Search'
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </ListItem>

      <List>
        {filteredList.map((value, index) => {
          return (
            <ListItem
              key={value.id}
              button
              onClick={toggleItem(value.id)}
              className={
                value.anim ? classes.slideLeftEffect : classes.slideUpEffect
              }
            >
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  edge='start'
                  checked={value.checked}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  value.checked ? (
                    <b>
                      <strike>{value.text}</strike>
                    </b>
                  ) : (
                    value.text
                  )
                }
                secondary={
                  value.date && (
                    <Typography variant='caption'>
                      <br />
                      {value.date}
                    </Typography>
                  )
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  onClick={deleteRequestItem(value.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;

