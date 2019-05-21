import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  root: {
    textAlign: "center"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15
  },
  checked: {
    color: "red"
  }
});

class ToDoItem extends React.Component {
  handleDeleteItem = event => {
    const {
      onDelete,
      item: { id }
    } = this.props;
    onDelete(id);
    event.stopPropagation();
  };

  handleEdit = event => {
    const { onEdit, item } = this.props;
    onEdit(item);
    event.stopPropagation();
  };

  handleItemClick = () => {
    const {
      onCheckChange,
      item: { id }
    } = this.props;
    onCheckChange(id);
  };

  render() {
    const {
      classes,
      item: { name, checked }
    } = this.props;
    return (
      <div onClick={this.handleItemClick} className={classes.root}>
        <div
          className={classNames(classes.wrapper, {
            [classes.checked]: false
          })}
        >
          {checked && <span>checked</span>}
          {name}
          <Button variant="contained" color="primary" onClick={this.handleEdit}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleDeleteItem}
          >
            Romove
          </Button>
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    wrapper: PropTypes.string,
    checked: PropTypes.string
  }),
  item: PropTypes.any.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheckChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ToDoItem);
