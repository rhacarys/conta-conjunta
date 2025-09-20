import { useEffect, useState, useRef } from "react";
import { Payment, Person, Settings } from "@mui/icons-material";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import DashboardPage from "./Dashboard";
import FormPage from "./Form";
import SettingsPage from "./Settings";

const Home = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [pageIndex]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      {pageIndex === 0 ? (
        <DashboardPage />
      ) : pageIndex === 1 ? (
        <FormPage />
      ) : (
        <SettingsPage />
      )}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={pageIndex}
          onChange={(event, newValue) => {
            setPageIndex(newValue);
          }}
        >
          <BottomNavigationAction label="Início" icon={<Person />} />
          <BottomNavigationAction label="Pagamentos" icon={<Payment />} />
          <BottomNavigationAction label="Opções" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Home;
