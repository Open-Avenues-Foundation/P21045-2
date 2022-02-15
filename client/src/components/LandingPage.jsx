import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [contacts, setContacts] = useState([]);
  const [matchingContacts, setMatchingContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1336/api/contact").then((payload) => {
      const { data } = payload;
      setContacts(data);
      setMatchingContacts(data);
    });
  }, []);

  const filteredContacts = (userInput) => {
    const matchingContacts = contacts.filter((contact) => {
      return contact.firstName
        .toLowerCase()
        .startsWith(userInput.toLowerCase());
    });

    setMatchingContacts(matchingContacts);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: 3 }}
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <TextField
            className="searchBox"
            variant="outlined"
            name="search"
            label="Search Contact..."
            fullWidth
            onChange={(event) => filteredContacts(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Link to={"/contact/upload"}>
            <Button fullWidth variant="outlined">
              Upload Contacts
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Link to={"/campaign"}>
            <Button fullWidth variant="outlined">
              View Campaigns
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        xs={12}
        sx={{ mx: 3 }}
      >
        {matchingContacts.map((contact) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card key={contact.id}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {contact.firstName} {contact.lastName}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    {contact.city}, {contact.state}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
