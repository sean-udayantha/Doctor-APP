import React, { useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningButton, WarningButtonOutlined } from "../../styles";
import Button from "@mui/material/Button";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const TakePhoto = (props) => {
  const { open, setOpen, GetReport, snack, setSnack, photoRef } = props;
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  console.log("🚀 ~ file: index.jsx:21 ~ TakePhoto ~ url", url);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      await photoRef(url);
      GetReport(false);
      setOpen(false);
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:43 ~ handleDelete ~ error", error);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <>
            <DialogTitle id="alert-dialog-title">
              {"Get report photo"}
            </DialogTitle>
            <DialogContent>
              {!url && (
                <DialogContentText id="alert-dialog-description">
                  take photo to press Capture
                </DialogContentText>
              )}

              {url && (
                <DialogContentText id="alert-dialog-description">
                  if you want reCapture the photo please press Refresh
                </DialogContentText>
              )}

              {!url && (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMedia={onUserMedia}
                />
              )}
              {url && (
                <div>
                  <img src={url} alt="Screenshot" />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <WarningButtonOutlined onClick={handleClose}>
                no
              </WarningButtonOutlined>
              <WarningButton onClick={handleDelete} autoFocus>
                Add photo
              </WarningButton>
              <Button onClick={capturePhoto} autoFocus>
                Capture
              </Button>
              <Button onClick={() => setUrl(null)} autoFocus>
                Refresh
              </Button>
            </DialogActions>
          </>
        </Dialog>
      </div>
    </>
  );
};

export default TakePhoto;
