import React from "react";
import UUID from "uuid";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ToDoItem from "./components/ToDoItem";
import EditModal from "./components/modal/edit";
import "./App.css";


const styles = () => ({
  app: {
    textAlign: "center"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: [],
      showEditModal: false,
      editedItem: null
    };
  }

  handleAddItem = () => {
    const { list, inputValue } = this.state;
    const generatedId = UUID.v4();
    if (inputValue.trim())
      this.setState({
        list: [...list, { id: generatedId, name: inputValue, checked: false }],
        inputValue: ""
      });
  };

  handleDeleteItem = itemId => {
    const { list } = this.state;
    const itemToDelete = list.find(item => item.id === itemId);
    if (itemToDelete) {
      const index = list.indexOf(itemToDelete);
      this.setState({
        list: [...list.slice(0, index), ...list.slice(index + 1)]
      });
    }
  };

  handleEditItem = item => {
    this.setState({ showEditModal: true, editedItem: item });
  };

  onEditModalClose = item => {
    this.setState({ showEditModal: false, editedItem: null });
  };

  onSave = (itemId, name) => {
    const { list } = this.state;
    const itemToUpdate = list.find(item => item.id === itemId);
    if (itemToUpdate) {
      const index = list.indexOf(itemToUpdate);
      this.setState({
        list: [
          ...list.slice(0, index),
          { ...itemToUpdate, name },
          ...list.slice(index + 1)
        ],
        showEditModal: false,
        editedItem: null
      });
    }
  };

  handleItemCheckChange = itemId => {
    const { list } = this.state;
    const itemToCheck = list.find(item => item.id === itemId);
    if (itemToCheck) {
      const index = list.indexOf(itemToCheck);
      this.setState({
        list: [
          ...list.slice(0, index),
          { ...itemToCheck, checked: !itemToCheck.checked },
          ...list.slice(index + 1)
        ]
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  renderItem = item => {
    return (
      <ToDoItem
        key={item.id}
        item={item}
        onDelete={this.handleDeleteItem}
        onEdit={this.handleEditItem}
        onCheckChange={this.handleItemCheckChange}
      />
    );
  };

  onKeyDown = event => {
    switch (event.keyCode) {
      case 13: {
        this.handleAddItem();
        break;
      }
      default: {
        break;
      }
    }
  };

  inputProps = {
    onKeyDown: this.onKeyDown
  };

  render() {
    const { inputValue, list, showEditModal, editedItem } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <div className={classes.wrapper}>
          <TextField
            id="outlined-dense"
            label="Dense"
            variant="outlined"
            value={inputValue}
            onChange={this.handleInputChange}
            InputProps={this.inputProps}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAddItem}
          >
            Add to do
          </Button>
        </div>
        {list.map(item => this.renderItem(item))}
        {showEditModal && (
          <EditModal
            item={editedItem}
            onClose={this.onEditModalClose}
            onSave={this.onSave}
          />
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({
    app: PropTypes.string,
    wrapper: PropTypes.string
  })
};

export default withStyles(styles)(App);
