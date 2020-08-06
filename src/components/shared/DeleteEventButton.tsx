import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { useSnackbar } from 'notistack';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getEvents } from '../../state/events/action';
import axiosWithConfig from '../../utils/axiosWithConfig';

export interface DeleteEventButtonProps {
  eventId: string;
}

const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({ eventId }) => {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
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
      enqueueSnackbar('Wydarzenie zostało usunięte', { variant: 'success' });
      history.push('/');
    } catch (err) {
      enqueueSnackbar('Nie udało się usunąć wydarzenia', { variant: 'error' });
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Usuń wydarzenie">
        <ButtonDelete type="button" onClick={handleClickOpen}>
          <RiDeleteBin2LineStyled />
        </ButtonDelete>
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
          <ButtonNoStyled onClick={handleClose}>Nie</ButtonNoStyled>
          <ButtonYesStyled onClick={handleClick} autoFocus>
            Tak
          </ButtonYesStyled>
        </DialogActions>
      </DialogStyled>
    </>
  );
};

export default DeleteEventButton;

const ButtonDelete = styled.button`
  z-index: ${({ theme }) => theme.zIndex.level1};
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  position: absolute;
  top: 70px;
  left: 4px;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.hoverDelete};
  }
`;

const RiDeleteBin2LineStyled = styled(RiDeleteBin2Line)`
  font-size: 22px;
`;

const DialogStyled = styled(Dialog)`
  && .MuiDialog-paper {
    background-color: ${({ theme }) => theme.colors.dialog.background} !important;
  }
`;

const DialogContentTextStyled = styled(DialogContentText)`
  && {
    color: ${({ theme }) => theme.colors.dialog.text} !important;
  }
`;
const ButtonYesStyled = styled(Button)`
  && {
    color: ${({ theme }) => theme.colors.dialog.text} !important;
    &:hover {
      color: ${({ theme }) => theme.colors.dialog.accept} !important;
    }
  }
`;
const ButtonNoStyled = styled(Button)`
  && {
    color: ${({ theme }) => theme.colors.dialog.text} !important;
    &:hover {
      color: ${({ theme }) => theme.colors.dialog.cancel} !important;
    }
  }
`;
