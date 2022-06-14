import { useEffect, useState } from "react";
import { getClients } from "./util/getClientes";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

function Clientes({ setClients, clients }) {
  useEffect(() => {
    getClients(setClients);
  }, []);

  function deleteClient(id) {
    fetch(`https://facec-webapi-2022.herokuapp.com/clientes/${id}`, {
      cache: "no-cache",
      method: "DELETE",
      mode: "cors",
    })
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // setClients(data);
      })
      .catch((err) => console.log(err));
  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const styleBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    borderRadius: "10%",
    boxShadow: 24,
    p: 4,
  };
  const styleInput = {
    margin: "15px",
    marginLeft: "75px",
  };

  const styleTable = {
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginBottom: "2.5%",
    width: "95%",
    borderRadius: "1.5%",
  };
  const styleButton = {
    marginLeft: "2.5%",
    marginTop: "30px",
    marginBottom: "30px",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [sex, setSex] = useState(0);

  async function saveClient() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log(headers);

    const res = await fetch(
      "https://facec-webapi-2022.herokuapp.com/clientes",
      {
        headers,
        cache: "no-cache",
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ nome: name, documento: cpf, sexo: sex }),
      }
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        getClients(setClients);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
    console.log(res);
  }

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen} sx={styleButton}>
        Cadastrar novo cliente
      </Button>
      <TableContainer component={Paper} sx={styleTable}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Numero</StyledTableCell>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Documento</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients &&
              clients.map((client, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>{client.nome}</StyledTableCell>
                    <StyledTableCell>{client.documento} </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        onClick={() => deleteClient(client.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <h1>Cadastro de novo cliente</h1>
          <FormControl variant="standard">
            <TextField
              sx={styleInput}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              label="Nome"
              variant="outlined"
            />
            <TextField
              sx={styleInput}
              onChange={(e) => setCpf(e.target.value)}
              id="outlined-basic"
              label="CPF"
              variant="outlined"
            />
            <Button
              sx={styleInput}
              onClick={saveClient}
              disabled={name.length == 0 || cpf.length == 0}
              type="submit"
              variant="contained"
              size="large"
            >
              Save
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
}
export default Clientes;
