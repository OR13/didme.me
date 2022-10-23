import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { toast } from 'react-toastify';

import gladstone from '../../services/Gladstone';

import DID from '../DID';

const database = 'Memes';
const collection = 'Keys';

const ImagePreview = ({ did }) => {
  const [image, setImage] = useState('https://via.placeholder.com/150');
  useEffect(() => {
    if (did) {
      (async () => {
        const images = await gladstone('Memes').open('Images');
        const maybeImage = await images.get(did);
        if (maybeImage) {
          setImage(maybeImage.dataUrl);
        }
      })();
    }
  }, [did]);
  return (
    <Box sx={{ p: 2 }}>
      <img alt="image for key" src={image} />
    </Box>
  );
};

const CustomTableRow = (props) => {
  const { row, isLoading, removeCollectionItem } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            <DID did={row.id} />
          </Box>
        </TableCell>
        <TableCell>{row.value.alg}</TableCell>
        <TableCell>
          {row.value.extractable || row.value.kty ? (
            <>
              <Button
                startIcon={<CopyAllIcon />}
                disabled={isLoading}
                onClick={() => {
                  toast(`Copied private key to clipboard!`);
                }}
              >
                Copy
              </Button>
            </>
          ) : (
            <>No</>
          )}
        </TableCell>

        <TableCell align="right">
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={() => {
              removeCollectionItem(row.id);
            }}
            disabled={isLoading}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ImagePreview did={row.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function KeyTable() {
  const [isLoading, setIsLoading] = useState(true);
  const extractable = true;
  const [keys, setKeys] = useState([]);
  const refreshList = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const store = await gladstone(database).open(collection);
      const docs = await store.list();
      setKeys(docs);
      setIsLoading(false);
    }, 1 * 1000);
  };

  const removeCollectionItem = async (id) => {
    const store = await gladstone(database).open(collection);
    await store.unset(id);
    refreshList();
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {isLoading && <LinearProgress color={'secondary'} />}
        <AppBar position="static">
          <Toolbar>
            <FormGroup sx={{ flexGrow: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={extractable}
                    disabled
                    // onChange={toggleExtractable}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={
                  extractable
                    ? 'Private keys are extractable'
                    : 'Private keys are not extractable'
                }
              />
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Identifier</TableCell>
              <TableCell>Algorithm</TableCell>
              <TableCell>Extractable</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((row) => (
              <CustomTableRow
                row={row}
                key={row.id}
                isLoading={isLoading}
                removeCollectionItem={removeCollectionItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
