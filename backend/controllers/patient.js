import Patient from "../models/patient.js";
const patientController = {
  createPatient: async (req, res) => {
    try {
      //get  patient data from body
      const { name, age, NIC, address, mobileNumber, description, image } = req.body;
      //check NIC
      const ExistingPatient = await Patient.findOne({ NIC });
      if (ExistingPatient)
        return res.status(400).json({
          message: "This Patient  already Add to system.",
        });
      //checking all fields are fill
      if (!name || !age || !NIC || !address || !mobileNumber || !description || !image)
        return res.status(400).json({
          msg: "Please fill in all fields.",
        });

      const newPatient = new Patient({
        name,
        age,
        NIC,
        address,
        mobileNumber,
        description,
        image
      });
      await newPatient.save();
      res.json({
        message: "Readable file create success",
        data: newPatient,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //get all patients
  getPatient: async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json({
        message: "patients fetch success",
        data: patients
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //get one Patient
  getOnePatient: async (req, res) => {
    const id = req.params.id;
    try {
      const patient = await Patient.findOne({ _id: id });
      res.json({
        message: "patients fetch success",
        data: patient
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  updatePatient: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, age, NIC, address, mobileNumber, description, image } = req.body;

      await Patient.findOneAndUpdate(
        { _id: id },
        { name, age, NIC, address, mobileNumber, description, image }
      );
      res.json({
        message: "Patient update success",
        data: { name, age, NIC, address, mobileNumber, description, image },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deletePatient: async (req, res) => {
    try {
      const id = req.params.id;

      await Patient.findByIdAndDelete({ _id: id });
      res.json({ message: "Patient delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
export default patientController;