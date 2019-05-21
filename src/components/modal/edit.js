import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name
    };
  }

  handleInputChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSave = () => {
    const { name } = this.state;
    const {
      item: { id },
      onSave
    } = this.props;
    onSave(id, name);
  };

  render() {
    const { name } = this.state;
    const { onClose } = this.props;
    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditModal.propTypes = {
  item: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EditModal;
