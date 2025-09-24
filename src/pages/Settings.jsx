import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import useCookies from "../hooks/useCookies";
import { Delete, InfoOutline } from "@mui/icons-material";
import { useState } from "react";

const SettingsPage = () => {
  const [config, , reset] = useCookies("config", {});
  const [nathan] = useCookies("nathan", {});
  const [jeftally] = useCookies("jeftally", {});
  const [cleiton] = useCookies("cleiton", {});

  const [popup, setPopup] = useState(null);
  const openPopup = (event) => {
    setPopup(event.currentTarget);
  };
  const closePopup = () => {
    setPopup(null);
  };

  return (
    <Container>
      <Box
        mt={2}
        mb={2}
        display={"flex"}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
          Opções
        </Typography>
        <IconButton size="large" color="inherit" onClick={openPopup}>
          <InfoOutline />
        </IconButton>
        <Popover
          open={!!popup}
          anchorEl={popup}
          onClose={closePopup}
          anchorOrigin={{
            vertical: "bottom",
          }}
        >
          <Box width={300} p={2}>
            <Box>
              Moeda atual: <strong>{config.currency}</strong>
            </Box>
            <Box mt={2} mb={2}>
              <Box
                mb={2}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={1}
              >
                Nathaniel:
                <Box display="flex" justifyContent="space-between">
                  <span>{nathan.balanceBrl}</span>
                  <span>{nathan.balanceArs}</span>
                </Box>
              </Box>
              <Box
                mb={2}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={1}
              >
                Jeftally:
                <Box display="flex" justifyContent="space-between">
                  <span>{jeftally.balanceBrl}</span>
                  <span>{jeftally.balanceArs}</span>
                </Box>
              </Box>
              <Box
                mb={2}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={1}
              >
                Cleiton:
                <Box display="flex" justifyContent="space-between">
                  <span>{cleiton.balanceBrl}</span>
                  <span>{cleiton.balanceArs}</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>

      <Box mb={2}>
        Aplicação desenvolvida para auxiliar na divisão das despesas entre
        amigos. <br />
        Suporta as moedas BRL (real brasileiro) e ARS (peso argentino).
      </Box>

      <Paper elevation={3} style={{ padding: 16, marginBottom: 32 }}>
        <Box mb={2}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            Histórico
          </Typography>
        </Box>
        {config.history?.toReversed().map((item) => (
          <Box
            key={item.id}
            display="flex"
            flexDirection="column"
            mb={2}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={1}
          >
            <strong>{item.description}</strong>
            <Box mt={1} sx={{ textTransform: "capitalize" }}>
              <small>{item.date}</small>
              <Box display="flex" justifyContent="space-between">
                <span>
                  <strong>{item.paying}</strong>
                </span>
                <span>
                  {item.amount} {item.currency}
                </span>
              </Box>
              {Object.entries(item.involved)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(", ")}
            </Box>
          </Box>
        ))}
      </Paper>

      <Button
        fullWidth
        variant="secondary"
        startIcon={<Delete />}
        onClick={() => {
          confirm("Tem certeza que deseja apagar todos os dados?") && reset();
        }}
      >
        Apagar Tudo
      </Button>
    </Container>
  );
};

export default SettingsPage;
