import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import { useSnackbar } from 'notistack';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getEvents } from '../../../../../state/events/action';
import axiosWithConfig from '../../../../../utils/axiosWithConfig';

export interface DeleteProps {
  eventId: string;
}

const Delete: React.FC<DeleteProps> = ({ eventId }) => {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

export default Delete;

const ButtonDelete = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  position: absolute;
  top: 38px;
  left: 4px;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hoverDelete};
  }
`;

const RiDeleteBin2LineStyled = styled(RiDeleteBin2Line)`
  font-size: 22px;
`;

const DialogStyled = styled(Dialog)`
  && .MuiDialog-paper {
    background-color: ${(props) => props.theme.colors.dialog.background} !important;
  }
`;

const DialogContentTextStyled = styled(DialogContentText)`
  && {
    color: ${(props) => props.theme.colors.dialog.text} !important;
  }
`;
const ButtonYesStyled = styled(Button)`
  && {
    color: ${(props) => props.theme.colors.dialog.text} !important;
    &:hover {
      color: ${(props) => props.theme.colors.dialog.accept} !important;
    }
  }
`;
const ButtonNoStyled = styled(Button)`
  && {
    color: ${(props) => props.theme.colors.dialog.text} !important;
    &:hover {
      color: ${(props) => props.theme.colors.dialog.cancel} !important;
    }
  }
`;