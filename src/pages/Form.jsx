import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useCookies from "../hooks/useCookies";
import { useState } from "react";

const calc = (balance, toSum, toSubtract) => balance + toSum - toSubtract;

const FormPage = () => {
  const [config, setConfig] = useCookies("config");
  const [nathan, setNathan] = useCookies("nathan");
  const [jeftally, setJeftally] = useCookies("jeftally");
  const [cleiton, setCleiton] = useCookies("cleiton");
  const people = [nathan, jeftally, cleiton];

  const [paying, setPaying] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [involved, setInvolved] = useState({
    nathan: false,
    jeftally: false,
    cleiton: false,
  });

  const handleInvolvedChange = (event) => {
    const { name, checked } = event.target;
    setInvolved((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    if (!paying || !amount || Object.values(involved).every((v) => !v)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    const involvedPeople = people.filter((person) => involved[person.id]);
    const split = amt / involvedPeople.length;

    if (config.currency === "BRL") {
      const nathanBrl = calc(
        nathan.balanceBrl,
        paying === "nathan" ? amt : 0,
        involved["nathan"] ? split : 0
      );
      const jeftallyBrl = calc(
        jeftally.balanceBrl,
        paying === "jeftally" ? amt : 0,
        involved["jeftally"] ? split : 0
      );
      const cleitonBrl = calc(
        cleiton.balanceBrl,
        paying === "cleiton" ? amt : 0,
        involved["cleiton"] ? split : 0
      );
      setNathan({ ...nathan, balanceBrl: nathanBrl });
      setJeftally({ ...jeftally, balanceBrl: jeftallyBrl });
      setCleiton({ ...cleiton, balanceBrl: cleitonBrl });
    } else {
      const nathanArs = calc(
        nathan.balanceArs,
        paying === "nathan" ? amt : 0,
        involved["nathan"] ? split : 0
      );
      const jeftallyArs = calc(
        jeftally.balanceArs,
        paying === "jeftally" ? amt : 0,
        involved["jeftally"] ? split : 0
      );
      const cleitonArs = calc(
        cleiton.balanceArs,
        paying === "cleiton" ? amt : 0,
        involved["cleiton"] ? split : 0
      );
      setNathan({ ...nathan, balanceArs: nathanArs });
      setJeftally({ ...jeftally, balanceArs: jeftallyArs });
      setCleiton({ ...cleiton, balanceArs: cleitonArs });
    }

    setConfig({
      ...config,
      history: [
        ...config.history,
        {
          id: Date.now(),
          paying,
          amount: amt,
          involved,
          currency: config.currency,
          description,
          date: new Date().toLocaleString("PT-br"),
        },
      ],
    });

    setPaying("");
    setAmount("");
    setInvolved({
      nathan: false,
      jeftally: false,
      cleiton: false,
    });
  };

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          Novo Pagamento
        </Typography>
      </Box>

      <Paper elevation={3} style={{ padding: 16 }}>
        <Box mt={2} mb={2} display="flex" flexDirection="column" gap={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quem pagou?</InputLabel>
            <Select
              value={paying}
              label="Quem pagou?"
              onChange={(e) => setPaying(e.target.value)}
            >
              {people.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display={"flex"} justifyContent={"space-between"} gap={2}>
            <TextField
              label="Valor"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Moeda</InputLabel>
              <Select
                value={config.currency}
                label="Moeda"
                onChange={(e) =>
                  setConfig({ ...config, currency: e.target.value })
                }
              >
                <MenuItem value="BRL">REAL</MenuItem>
                <MenuItem value="ARS">PESO</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Descrição (opcional)"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormGroup>
            {people.map((person) => (
              <FormControlLabel
                key={person.id}
                label={`${person.name} (${
                  config.currency === "BRL"
                    ? person.balanceBrl?.toFixed(2)
                    : person.balanceArs?.toFixed(0)
                })`}
                control={
                  <Checkbox
                    size="large"
                    checked={involved[person.id]}
                    onChange={handleInvolvedChange}
                    name={person.id}
                  />
                }
              />
            ))}
          </FormGroup>

          <Button variant="contained" size="large" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormPage;
