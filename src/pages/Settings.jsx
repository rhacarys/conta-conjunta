import { Box, Container, Paper, Typography } from "@mui/material";
import useCookies from "../hooks/useCookies";

const SettingsPage = () => {
  const [config] = useCookies("config");
  const [nathan] = useCookies("nathan");
  const [jeftally] = useCookies("jeftally");
  const [cleiton] = useCookies("cleiton");

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          Opções
        </Typography>
      </Box>

      <Paper elevation={3} style={{ padding: 16, marginBottom: 32 }}>
        <Box mt={2} mb={2}>
          Aplicação desenvolvida para auxiliar na divisão das despesas entre
          amigos. <br />
          Suporta as moedas BRL (real brasileiro) e ARS (peso argentino).
        </Box>
      </Paper>

      <Paper elevation={3} style={{ padding: 16 }}>
        <Box mt={2} mb={2}>
          Moeda atual: <strong>{config.currency}</strong>
        </Box>
        <Box mt={2} mb={2}>
          <Box mb={1}>
            <strong>Valores absolutos:</strong>
          </Box>
          Nathaniel:
          <Box display="flex" justifyContent="space-between" mb={1}>
            <span>{nathan.balanceBrl}</span>
            <span>{nathan.balanceArs}</span>
          </Box>
          Jeftally:
          <Box display="flex" justifyContent="space-between" mb={1}>
            <span>{jeftally.balanceBrl}</span>
            <span>{jeftally.balanceArs}</span>
          </Box>
          Cleiton:
          <Box display="flex" justifyContent="space-between" mb={1}>
            <span>{cleiton.balanceBrl}</span>
            <span>{cleiton.balanceArs}</span>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
