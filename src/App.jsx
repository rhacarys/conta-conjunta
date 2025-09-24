import { Menu, Sync } from "@mui/icons-material";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import Home from "./pages/Home";
import useCookies from "./hooks/useCookies";
import { useEffect } from "react";

const App = () => {
  const [config, setConfig, reset] = useCookies("config");
  const [, setNathan] = useCookies("nathan");
  const [, setJeftally] = useCookies("jeftally");
  const [, setCleiton] = useCookies("cleiton");

  useEffect(() => {
    if (!config) {
      setConfig({ currency: "BRL", history: [] });
      setNathan({
        id: "nathan",
        name: "Nathaniel",
        balanceBrl: 0.0,
        balanceArs: 0.0,
      });
      setJeftally({
        id: "jeftally",
        name: "Jeftally",
        balanceBrl: 0.0,
        balanceArs: 0.0,
      });
      setCleiton({
        id: "cleiton",
        name: "Cleiton",
        balanceBrl: 0.0,
        balanceArs: 0.0,
      });
    }
  }, [config, setConfig, setNathan, setJeftally, setCleiton]);

  return (
    config && (
      <>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Conta Conjunta
            </Typography>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                confirm("Tem certeza que deseja apagar todos os dados?") &&
                  reset();
              }}
            >
              <Sync />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Home />
      </>
    )
  );
};

export default App;
