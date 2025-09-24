import { Box, Container, Paper, Typography } from "@mui/material";
import useCookies from "../hooks/useCookies";

const DashboardPage = () => {
  const [nathan] = useCookies("nathan");
  const [jeftally] = useCookies("jeftally");
  const [cleiton] = useCookies("cleiton");

  const people = [nathan, jeftally, cleiton];

  return (
    <Container>
      <Box mt={2} mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Buenos Aires
        </Typography>
      </Box>
      <Box display="flex" gap={4} flexDirection="column">
        {people.map((person) => (
          <Paper key={person.id} elevation={3} style={{ padding: 16 }}>
            <Box key={person.id}>
              <Typography variant="h6">{person.name}</Typography>
              <Box mt={2} mb={2} display="flex" justifyContent="space-between">
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  color={person.balanceBrl >= 0 ? "green" : "red"}
                >
                  R$ {person.balanceBrl?.toFixed(2)}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  color={person.balanceArs >= 0 ? "green" : "red"}
                >
                  $ {person.balanceArs?.toFixed(0)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default DashboardPage;
