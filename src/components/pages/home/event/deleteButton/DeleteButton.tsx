import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  withStyles,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getEvents } from '../../../../../state/events/action';
import axiosWithConfig from '../../../../../utils/axiosWithConfig';

export interface DeleteButtonProps {
  eventId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ eventId }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      await axiosWithConfig.delete(`/events/${eventId}`);
      await dispatch(getEvents());
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <Tooltip title="Usuń wydarzenie">
        <LogOutButton type="button" onClick={handleClickOpen}>
          <RiDeleteBin2LineStyled />
        </LogOutButton>
      </Tooltip>
      <DialogStyled
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentTextStyled id="alert-dialog-description">
            Czy napewno chcesz usunąć wydarzenie?
          </DialogContentTextStyled>
        </DialogContent>
        <DialogActions>
          <ButtonNoStyled onClick={handleClose} color="primary">
            Nie
          </ButtonNoStyled>
          <ButtonYesStyled onClick={handleClick} color="primary" autoFocus>
            Tak
          </ButtonYesStyled>
        </DialogActions>
      </DialogStyled>
    </>
  );
};

export default DeleteButton;

const LogOutButton = styled.button`
  border: none;
  border-radius: 20px;
  background-color: #202020;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  left: 5px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: #e74c3c;
  }
`;

const RiDeleteBin2LineStyled = styled(RiDeleteBin2Line)`
  font-size: 22px;
`;

const DialogStyled = withStyles({
  paper: {
    background: '#202020',
  },
})(Dialog);
const DialogContentTextStyled = withStyles({
  root: {
    color: 'white',
  },
})(DialogContentText);

const ButtonYesStyled = withStyles({
  root: {
    color: 'white',
    '&:hover': {
      color: ' #e74c3c',
    },
  },
})(Button);
const ButtonNoStyled = withStyles({
  root: {
    color: 'white',
    '&:hover': {
      color: '#2ecc71',
    },
  },
})(Button);
