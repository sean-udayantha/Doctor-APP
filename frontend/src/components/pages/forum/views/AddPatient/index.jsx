import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
import AddSnackBar from "../components/AddSnackBar";
import ForumPostAPI from "../../../../../core/services/ForumPostAPI";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import AlertDialog from "../DeleteConfirmation";
import PSnackBar from "../components/PSnackBar";
import TakePhoto from "../TakePhoto";
import PatientAPI from "../../../../../core/services/PatientAPI";

const AddPatient = () => {
    const [photoRef, setPhotoRef] = React.useState(); 
    const [getReport, setGetReport] = React.useState(true);
    console.log("🚀 ~ file: index.jsx:22 ~ AddPost ~ photoRef", photoRef)
    const { user } = useSelector((state) => state.auth);
    const [files, setFiles] = React.useState();
    const [error, setError] = React.useState({ field: "", message: "" });
    const [open, setOpen] = React.useState(false);
    const [photoOpen, setPhotoOpen] = React.useState(false);
    const [createSuccess, setCreateSuccess] = React.useState(false);
    const [postPayload, setPostPayload] = React.useState({
      name: "",
      age: "", 
      NIC: "",
      address: "",
      mobileNumber: "",
      description: "",
      image: "",
    });
    console.log("🚀 ~ file: index.jsx:37 ~ AddPost ~ postPayload", postPayload)
    const [snack, setSnack] = React.useState({
      open: false,
      severity: "",
      message: "",
    });
  
    const onClickShare = async (e) => {
      e.preventDefault();
      if (isValid()) {
        const response = await PatientAPI.create(postPayload);
        console.log("~ onClickShare ~ response", response);
        if (response.status === 200) {
          setCreateSuccess(true);
          setOpen(true);
        } else {
          setCreateSuccess(false);
        }
      }
    };
    const isValid = () => {
      if (postPayload.description === "") {
        setError({ field: "description", message: "Please fill me" });
        return false;
      }
      if (postPayload.title === "") {
        setError({ field: "title", message: "Please fill me" });
        return false;
      }
      return true;
    };
  
    const onChangeInput = (e) => {
      setError({ field: "", message: "" });
      setPostPayload({
        ...postPayload,
        [e.target.name]: e.target.value,
        userId: user._id,
        userName: user.userName, 
      });
    };
  
    const handleChange = (e) => {
      try{
        setPostPayload({
          ...postPayload,
          image:photoRef
        });
        toast.success("image uploaded successfully");
      }catch{
  
      }
    }
  
    const handleImageChange = async (e) => {
      console.log("🚀 ~ file: index.jsx:85 ~ handleImageChange ~ handleImageChange", handleImageChange)
      
      e.preventDefault();
      try {
        const file = e.target.files[0];
        if (!file) return alert("File not exist.");
        if (file.size > 1024 * 1024)
          // 1mb
          return alert("Size too large!");
        if (file.type !== "image/jpeg" && file.type !== "image/png")
          // 1mb
          return alert("File format is incorrect.");
        let formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          "http://localhost:5000/api/imageUpload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        setPostPayload({
          ...postPayload,
          image: res.data.url,
        });
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response.data.msg);
      }
    };
  
    const onClickDelete = (id) => {
     
      setPhotoOpen(true);
    };
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
          {/* <AddPostAlerts
            alertType={"error"}
            alertTitle={"ERROR"}
            alertMessage={"Woops this is an error !"}
          /> */}
          <AddSnackBar open={open} setOpen={setOpen} success={createSuccess} />
          <Typography variant="PageHeader" gutterBottom>
            Add patient 
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel>patient Name</InputLabel>
            <TextField
              required
              id="name"
              name="name"
              // label="Title"
              fullWidth
              multiline
              error={error.field === "title"}
              helperText={!postPayload.title && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel>Age</InputLabel>
            <TextField
              required
              id="age"
              name="age"
              fullWidth
              multiline
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>NIC number</InputLabel>
            <TextField
              required
              id="NIC"
              name="NIC"
              fullWidth
              multiline
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>patient address</InputLabel>
            <TextField
              required
              id="address"
              name="address"
              fullWidth
              multiline
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>         
           <Grid item xs={12} sm={6}>
            <InputLabel>patient mobile number</InputLabel>
            <TextField
              required
              id="mobileNumber"
              name="mobileNumber"
              fullWidth
              multiline
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}></Grid> */}
          <Grid item xs={12} sm={6}>
            <InputLabel>Description</InputLabel>
            <TextField
              required
              id="description"
              name="description"
              fullWidth
              multiline
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Add patient reports!</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden  onChange={handleImageChange}/>
              {postPayload.image ? (
                <img
                  alt="forum_post"
                  src={postPayload.image}
                  style={{ height: 600, width: 600, objectFit: "cover" }}
                />
              ) : (
                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
              )}
               {/* {photoRef  && (
                <img
                  alt="forum_post"
                  src={photoRef}
                  style={{ height: 600, width: 600, objectFit: "cover" }}
                />
              
              )} */}
            </ImageUploadButton>
          </Grid>
          {/* <div>
                  <img src={photoRef} alt="Screenshot" />
          </div> */}
          <Grid
            item
            xs={12} sm={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
           {/* <Button onClick={(e)=>handleImageChange(e)}>upload photo</Button> */}
          </Grid>
          <Grid
            item
            xs={12} sm={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!photoRef  && (
           <Button onClick={(e) => onClickDelete(e)}>take photo</Button>
           )}   {photoRef  && (
            <Button onClick={(e) => handleChange(e)}>upload photo</Button>
            )} 
          </Grid>
          
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button onClick={(e) => onClickShare(e)}>submit patient</Button>
          </Grid>
        </Grid>
        <TakePhoto
        photoRef={setPhotoRef}
        open={photoOpen}
        setOpen={setPhotoOpen}
        GetReport={setGetReport}
        snack={snack}
        setSnack={setSnack}
      />
      <PSnackBar
        open={snack.open}
        snack={snack}
        setOpen={setSnack}
        severity={snack.severity}
        message={snack.message}
      />
      </Container>
    </>
  );
};

export default AddPatient;