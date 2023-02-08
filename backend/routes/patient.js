import { Router } from "express";
const patientRoute = Router();
import patientController from "../controllers/patient.js";


patientRoute.post(
    "/api/patient/create",
    patientController.createPatient
  );
  patientRoute.get(
    "/api/patient/all",
    patientController.getPatient
  );
  patientRoute.get(
    "/api/patient/:id",
    patientController.getOnePatient
  );
  patientRoute.put(
    "/api/patient/update/:id",
    patientController.updatePatient
  );
  patientRoute.delete(
    "/api/patient/delete/:id",
    patientController.deletePatient
  );
  export default patientRoute;