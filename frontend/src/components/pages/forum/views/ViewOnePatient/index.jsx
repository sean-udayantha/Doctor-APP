import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Container, Divider, InputLabel, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ImageUploadButton, PostContainer, StyledLink, WarningButton } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import AlertDialog from "../DeleteConfirmation";
import moment from "moment";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientAPI from "../../../../../core/services/PatientAPI";
import EditSnackBar from "../components/EditSnackBar";


const ViewOnePatient = () => {
    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const postId = params.id;
    const [commentsVisible, setCommentsVisible] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [patients, setPatients] = React.useState({
      name: "",
      age: "", 
      NIC: "",
      address: "",
      mobileNumber: "",
      description: "",
      image: "",
    });
   
    const getDate = (date) => {
      return moment(date).format("LL");
    };
    async function fetchData() {
      const response = await PatientAPI.getOne(postId);
      setPatients(response.data.data);
    }
    React.useEffect(() => {
      fetchData();
    }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            pb: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <EditSnackBar open={open} setOpen={setOpen}  />
          <Typography variant="PageHeader" gutterBottom>
            {patients.name} 's medical reports
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
          <Typography component="h2" variant="button">
               patients Details 
          </Typography>
            <InputLabel>
            name: {patients.name}
            <br/>
            age: {patients.age}
            <br/>
            NIC number: {patients.NIC} 
            <br/> 
            address: {patients.address}
            <br/>
            mobile number: {patients.mobileNumber}

            </InputLabel>
        </Grid>
          
          
         
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Description</InputLabel>
            <TextField
              required
              id="description"
              name="description"
              fullWidth
              multiline
              value={patients.description}
            //   onChange={(e) => onChangeInput(e)}
            //   error={error.field === "description"}
            //   helperText={!payload.description && error.message}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>reports</InputLabel>
            <ImageUploadButton component="label">
              <img
                  alt="forum_post"
                  src={patients.image}
                  style={{ height: 600, width: 600 }}
                />
            </ImageUploadButton>
          </Grid>
          
        </Grid>
      </Container>
    </>
  );
};

export default ViewOnePatient;