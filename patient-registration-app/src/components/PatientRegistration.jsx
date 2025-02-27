// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { toast } from 'react-toastify'
// import { createPatient } from '../services/api'

// const PatientRegistration = () => {
//   const navigate = useNavigate()
//   const [profileImage, setProfileImage] = useState(null)
//   const [previewImage, setPreviewImage] = useState(null)

//   const initialValues = {
//     FIRST_NAME: '',
//     MIDDLE_NAME: '',
//     LAST_NAME: '',
//     EMAIL_ID: '',
//     PHONE_NUMBER_1: '',
//     DOB: null,
//     GENDER_ID: 1, // Default to male (1)
//     blood_group: '',
//     marital_status: '',
//     Religion: '',
//     Education: '',
//     Occupation: '',
//     address_line1: '',
//     address_line2: '',
//     city_code: '',
//     state_name: '',
//     country_name: '',
//     pin_code: '',
//     Current_address_line1: '',
//     Current_address_line2: '',
//     Current_city_code: '',
//     Current_state_name: '',
//     Current_country_name: '',
//     Current_pin_code: '',
//     HEIGHT: '',
//     WEIGHT: '',
//     ALLERGIES: '',
//     PHONE_NUMBER_2: '',
//     Landline_number: '',
//     PHONE_CONTRY_CODE: 91, // Default to India
//     IDcard: '',
//     PatientType: '',
//     ON_GOING_TREATMENT: '',
//     OTHER_ON_GOING_TREATMENT: '',
//     OTHER_COMORBIDITIES: ''
//   }

//   const validationSchema = Yup.object({
//     FIRST_NAME: Yup.string().required('First name is required'),
//     LAST_NAME: Yup.string().required('Last name is required'),
//     EMAIL_ID: Yup.string().email('Invalid email format').required('Email is required'),
//     PHONE_NUMBER_1: Yup.string().required('Phone number is required'),
//     DOB: Yup.date().nullable().required('Date of birth is required'),
//     address_line1: Yup.string().required('Address is required'),
//     city_code: Yup.string().required('City is required'),
//     state_name: Yup.string().required('State is required'),
//     country_name: Yup.string().required('Country is required')
//   })

//   const handleImageChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       setProfileImage(file)
      
//       // Create preview URL
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviewImage(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const convertImageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.onload = () => resolve(reader.result)
//       reader.onerror = error => reject(error)
//       reader.readAsDataURL(file)
//     })
//   }

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       values.PATIENT_ID = 0;
//       // Process image if selected
//       if (profileImage) {
//         const base64Image = await convertImageToBase64(profileImage)
//         values.profilePictureData = base64Image.split(',')[1] // Remove the data URL prefix
//         values.profilePictureName = profileImage.name
//       }
  
//       // Format date to ISO string
//       if (values.DOB) {
//         const dobDate = new Date(values.DOB)
//         if (!isNaN(dobDate.getTime())) {
//           values.DOB = dobDate.toISOString()
//         } else {
//           values.DOB = String(values.DOB)
//         }
//       }
  
//       // Ensure PHONE_NUMBER_1 is a string
//       values.PHONE_NUMBER_1 = values.PHONE_NUMBER_1 ? 
//         values.PHONE_NUMBER_1.toString().replace(/^0+/, '') : null;
      
//       // Ensure PHONE_NUMBER_2 is an integer
//       values.PHONE_NUMBER_2 = values.PHONE_NUMBER_2 ? 
//         parseInt(values.PHONE_NUMBER_2.toString().replace(/^0+/, ''), 10) : null;
  
//       // Submit the data
//       await createPatient(values)
  
//       toast.success('Patient registered successfully!')
//       resetForm()
//       setProfileImage(null)
//       setPreviewImage(null)
//       navigate('/')
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       toast.error('Failed to register patient. Please try again.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Patient Registration</h2>
      
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, setFieldValue, values }) => (
//           <Form>
//             {/* Personal Information Section */}
//             <div className="form-section">
//               <h3 className="section-title">Personal Information</h3>
              
//               <div className="image-upload">
//                 <div className="image-preview">
//                   {previewImage ? (
//                     <img src={previewImage} alt="Profile Preview" />
//                   ) : (
//                     <span>No Image</span>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   id="profileImage"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   style={{ display: 'none' }}
//                 />
//                 <label htmlFor="profileImage" className="upload-button">
//                   Upload Photo
//                 </label>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="FIRST_NAME">First Name *</label>
//                   <Field type="text" id="FIRST_NAME" name="FIRST_NAME" />
//                   <ErrorMessage name="FIRST_NAME" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="MIDDLE_NAME">Middle Name</label>
//                   <Field type="text" id="MIDDLE_NAME" name="MIDDLE_NAME" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="LAST_NAME">Last Name *</label>
//                   <Field type="text" id="LAST_NAME" name="LAST_NAME" />
//                   <ErrorMessage name="LAST_NAME" component="div" className="error-message" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="DOB">Date of Birth *</label>
//                   <DatePicker
//                     id="DOB"
//                     selected={values.DOB}
//                     onChange={date => setFieldValue('DOB', date)}
//                     dateFormat="yyyy-MM-dd"
//                     className="form-control"
//                     placeholderText="Select date"
//                     maxDate={new Date()}
//                   />
//                   <ErrorMessage name="DOB" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="GENDER_ID">Gender *</label>
//                   <Field as="select" id="GENDER_ID" name="GENDER_ID">
//                     <option value={1}>Male</option>
//                     <option value={2}>Female</option>
//                     <option value={3}>Other</option>
//                   </Field>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="blood_group">Blood Group</label>
//                   <Field as="select" id="blood_group" name="blood_group">
//                     <option value="">Select Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                   </Field>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="marital_status">Marital Status</label>
//                   <Field as="select" id="marital_status" name="marital_status">
//                     <option value="">Select Marital Status</option>
//                     <option value="single">Single</option>
//                     <option value="married">Married</option>
//                     <option value="divorced">Divorced</option>
//                     <option value="widowed">Widowed</option>
//                   </Field>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="Religion">Religion</label>
//                   <Field type="text" id="Religion" name="Religion" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="Education">Education</label>
//                   <Field type="text" id="Education" name="Education" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="Occupation">Occupation</label>
//                   <Field type="text" id="Occupation" name="Occupation" />
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="IDcard">ID Card</label>
//                   <Field type="text" id="IDcard" name="IDcard" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="PatientType">Patient Type</label>
//                   <Field type="text" id="PatientType" name="PatientType" />
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information Section */}
//             <div className="form-section">
//               <h3 className="section-title">Contact Information</h3>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="EMAIL_ID">Email *</label>
//                   <Field type="email" id="EMAIL_ID" name="EMAIL_ID" />
//                   <ErrorMessage name="EMAIL_ID" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="PHONE_NUMBER_1">Mobile Number *</label>
//                   <Field type="int" id="PHONE_NUMBER_1" name="PHONE_NUMBER_1" />
//                   <ErrorMessage name="PHONE_NUMBER_1" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="PHONE_NUMBER_2">Alternate Mobile</label>
//                   <Field type="int" id="PHONE_NUMBER_2" name="PHONE_NUMBER_2" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="Landline_number">Landline Number</label>
//                   <Field type="int" id="Landline_number" name="Landline_number" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="PHONE_CONTRY_CODE">Country Code</label>
//                   <Field type="number" id="PHONE_CONTRY_CODE" name="PHONE_CONTRY_CODE" />
//                 </div>
//               </div>
//             </div>

//             {/* Permanent Address Section */}
//             <div className="form-section">
//               <h3 className="section-title">Permanent Address</h3>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="address_line1">Address Line 1 *</label>
//                   <Field type="text" id="address_line1" name="address_line1" />
//                   <ErrorMessage name="address_line1" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="address_line2">Address Line 2</label>
//                   <Field type="text" id="address_line2" name="address_line2" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="city_code">City *</label>
//                   <Field type="text" id="city_code" name="city_code" />
//                   <ErrorMessage name="city_code" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="state_name">State *</label>
//                   <Field type="text" id="state_name" name="state_name" />
//                   <ErrorMessage name="state_name" component="div" className="error-message" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="country_name">Country *</label>
//                   <Field type="text" id="country_name" name="country_name" />
//                   <ErrorMessage name="country_name" component="div" className="error-message" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="pin_code">Postal Code</label>
//                   <Field type="text" id="pin_code" name="pin_code" />
//                 </div>
//               </div>
//             </div>

//             {/* Current Address Section */}
//             <div className="form-section">
//               <h3 className="section-title">Current Address</h3>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="Current_address_line1">Address Line 1</label>
//                   <Field type="text" id="Current_address_line1" name="Current_address_line1" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="Current_address_line2">Address Line 2</label>
//                   <Field type="text" id="Current_address_line2" name="Current_address_line2" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="Current_city_code">City</label>
//                   <Field type="text" id="Current_city_code" name="Current_city_code" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="Current_state_name">State</label>
//                   <Field type="text" id="Current_state_name" name="Current_state_name" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="Current_country_name">Country</label>
//                   <Field type="text" id="Current_country_name" name="Current_country_name" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="Current_pin_code">Postal Code</label>
//                   <Field type="text" id="Current_pin_code" name="Current_pin_code" />
//                 </div>
//               </div>
//             </div>

//             {/* Medical Information Section */}
//             <div className="form-section">
//               <h3 className="section-title">Medical Information</h3>
              
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="HEIGHT">Height (cm)</label>
//                   <Field type="text" id="HEIGHT" name="HEIGHT" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="WEIGHT">Weight (kg)</label>
//                   <Field type="text" id="WEIGHT" name="WEIGHT" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="ALLERGIES">Allergies</label>
//                   <Field as="textarea" id="ALLERGIES" name="ALLERGIES" rows="3" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="ON_GOING_TREATMENT">Ongoing Treatment</label>
//                   <Field as="textarea" id="ON_GOING_TREATMENT" name="ON_GOING_TREATMENT" rows="3" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="OTHER_ON_GOING_TREATMENT">Other Ongoing Treatment</label>
//                   <Field as="textarea" id="OTHER_ON_GOING_TREATMENT" name="OTHER_ON_GOING_TREATMENT" rows="3" />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="OTHER_COMORBIDITIES">Other Comorbidities</label>
//                   <Field as="textarea" id="OTHER_COMORBIDITIES" name="OTHER_COMORBIDITIES" rows="3" />
//                 </div>
//               </div>
//             </div>

//             <button type="submit" className="submit-button" disabled={isSubmitting}>
//               {isSubmitting ? 'Registering...' : 'Register Patient'}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   )
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PatientRegistration.css';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    FIRST_NAME: '',
    MIDDLE_NAME: '',
    LAST_NAME: '',
    EMAIL_ID: '',
    PHONE_NUMBER_1: '',
    DOB: null,
    GENDER_ID: 1, // Default to male
    blood_group: '',
    marital_status: '',
    Religion: '',
    Education: '',
    Occupation: '',
    IDcard: '',
    PatientType: '',

    // Contact Information
    PHONE_NUMBER_2: '',
    Landline_number: '',
    PHONE_CONTRY_CODE: 91, // Default to India

    // Permanent Address
    address_line1: '',
    address_line2: '',
    city_code: '',
    state_name: '',
    country_name: '',
    pin_code: '',

    // Current Address
    Current_address_line1: '',
    Current_address_line2: '',
    Current_city_code: '',
    Current_state_name: '',
    Current_country_name: '',
    Current_pin_code: '',

    // Medical Information
    HEIGHT: '',
    WEIGHT: '',
    ALLERGIES: '',
    ON_GOING_TREATMENT: '',
    OTHER_ON_GOING_TREATMENT: '',
    OTHER_COMORBIDITIES: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for submission
      const submissionData = { ...formData };
      
      // Process image if selected
      if (profileImage) {
        const base64Image = await convertImageToBase64(profileImage);
        submissionData.profilePictureData = base64Image.split(',')[1];
        submissionData.profilePictureName = profileImage.name;
      }

      // Format date to ISO string
      if (submissionData.DOB) {
        const dobDate = new Date(submissionData.DOB);
        if (!isNaN(dobDate.getTime())) {
          submissionData.DOB = dobDate.toISOString();
        }
      }

      // Ensure phone numbers are processed
      submissionData.PHONE_NUMBER_1 = submissionData.PHONE_NUMBER_1 ? 
        submissionData.PHONE_NUMBER_1.toString().replace(/^0+/, '') : null;
      
      submissionData.PHONE_NUMBER_2 = submissionData.PHONE_NUMBER_2 ? 
        parseInt(submissionData.PHONE_NUMBER_2.toString().replace(/^0+/, ''), 10) : null;

      // Simulate API call (replace with actual service)
      // await createPatient(submissionData);
      
      toast.success('Patient registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to register patient. Please try again.');
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="patient-registration-page">
      <div className="registration-container">
        <h2 className="page-title">Patient Registration</h2>
        
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            {/* Image Upload */}
            <div className="image-upload">
              <div className="image-preview">
                {previewImage ? (
                  <img src={previewImage} alt="Profile Preview" />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profileImage" className="upload-button">
                Upload Photo
              </label>
            </div>

            {/* Name Inputs */}
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input 
                  type="text"
                  name="FIRST_NAME"
                  value={formData.FIRST_NAME}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Middle Name</label>
                <input 
                  type="text"
                  name="MIDDLE_NAME"
                  value={formData.MIDDLE_NAME}
                  onChange={handleInputChange}
                  placeholder="Enter Middle Name"
                />
              </div>
              
              <div className="form-group">
                <label>Last Name *</label>
                <input 
                  type="text"
                  name="LAST_NAME"
                  value={formData.LAST_NAME}
                  onChange={handleInputChange}
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>

            {/* Date of Birth and Gender */}
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input 
                  type="date"
                  name="DOB"
                  value={formData.DOB || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
  <label>Gender *</label>
  <div className="gender-selection">
    <label className="gender-radio">
      <input 
        type="radio"
        name="GENDER_ID"
        value={1}
        checked={formData.GENDER_ID === 1}
        onChange={handleInputChange}
        required
      />
      <span>Male</span>
    </label>
    <label className="gender-radio">
      <input 
        type="radio"
        name="GENDER_ID"
        value={2}
        checked={formData.GENDER_ID === 2}
        onChange={handleInputChange}
      />
      <span>Female</span>
    </label>
    <label className="gender-radio">
      <input 
        type="radio"
        name="GENDER_ID"
        value={3}
        checked={formData.GENDER_ID === 3}
        onChange={handleInputChange}
      />
      <span>Other</span>
    </label>
  </div>
</div>
              <div className="form-group">
                <label>Blood Group</label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleInputChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

            </div>

            {/* Additional Personal Details */}
            <div className="form-row">
              <div className="form-group">
                <label>Marital Status</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Religion</label>
                <input 
                  type="text"
                  name="Religion"
                  value={formData.Religion}
                  onChange={handleInputChange}
                  placeholder="Enter Religion"
                />
              </div>

              <div className="form-group">
                <label>Education</label>
                <input 
                  type="text"
                  name="Education"
                  value={formData.Education}
                  onChange={handleInputChange}
                  placeholder="Enter Education"
                />
              </div>
            </div>

            {/* Occupation and Additional Details */}
            <div className="form-row">
              <div className="form-group">
                <label>Occupation</label>
                <input 
                  type="text"
                  name="Occupation"
                  value={formData.Occupation}
                  onChange={handleInputChange}
                  placeholder="Enter Occupation"
                />
              </div>
              
              <div className="form-group">
                <label>ID Card</label>
                <input 
                  type="text"
                  name="IDcard"
                  value={formData.IDcard}
                  onChange={handleInputChange}
                  placeholder="Enter ID Card"
                />
              </div>

              <div className="form-group">
                <label>Patient Type</label>
                <input 
                  type="text"
                  name="PatientType"
                  value={formData.PatientType}
                  onChange={handleInputChange}
                  placeholder="Enter Patient Type"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)</label>
                <input 
                  type="text"
                  name="HEIGHT"
                  value={formData.HEIGHT}
                  onChange={handleInputChange}
                  placeholder="Enter Height"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input 
                  type="text"
                  name="WEIGHT"
                  value={formData.WEIGHT}
                  onChange={handleInputChange}
                  placeholder="Enter Weight"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email"
                  name="EMAIL_ID"
                  value={formData.EMAIL_ID}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input 
                  type="tel"
                  name="PHONE_NUMBER_1"
                  value={formData.PHONE_NUMBER_1}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile Number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Alternate Mobile</label>
                <input 
                  type="tel"
                  name="PHONE_NUMBER_2"
                  value={formData.PHONE_NUMBER_2}
                  onChange={handleInputChange}
                  placeholder="Enter Alternate Mobile"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Landline Number</label>
                <input 
                  type="tel"
                  name="Landline_number"
                  value={formData.Landline_number}
                  onChange={handleInputChange}
                  placeholder="Enter Landline Number"
                />
              </div>

              <div className="form-group">
                <label>Country Code</label>
                <input 
                  type="number"
                  name="PHONE_CONTRY_CODE"
                  value={formData.PHONE_CONTRY_CODE}
                  onChange={handleInputChange}
                  placeholder="Enter Country Code"
                />
              </div>
            </div>
          </div>

          {/* Permanent Address Section */}
          <div className="form-section">
            <h3 className="section-title">Permanent Address</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Address Line 1 *</label>
                <input 
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input 
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input 
                  type="text"
                  name="city_code"
                  value={formData.city_code}
                  onChange={handleInputChange}
                  placeholder="Enter City"
                  required
                />
              </div>

              <div className="form-group">
                <label>State *</label>
                <input 
                  type="text"
                  name="state_name"
                  value={formData.state_name}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input 
                  type="text"
                  name="country_name"
                  value={formData.country_name}
                  onChange={handleInputChange}
                  placeholder="Enter Country"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input 
                  type="text"
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleInputChange}
                  placeholder="Enter Postal Code"
                />
              </div>
            </div>
          </div>

          {/* Current Address Section */}
          <div className="form-section">
            <h3 className="section-title">Current Address</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Address Line 1</label>
                <input 
                  type="text"
                  name="Current_address_line1"
                  value={formData.Current_address_line1}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 1"
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input 
                  type="text"
                  name="Current_address_line2"
                  value={formData.Current_address_line2}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text"
                  name="Current_city_code"
                  value={formData.Current_city_code}
                  onChange={handleInputChange}
                  placeholder="Enter City"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input 
                  type="text"
                  name="Current_state_name"
                  value={formData.Current_state_name}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input 
                  type="text"
                  name="Current_country_name"
                  value={formData.Current_country_name}
                  onChange={handleInputChange}
                  placeholder="Enter Country"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input 
                  type="text"
                  name="Current_pin_code"
                  value={formData.Current_pin_code}
                  onChange={handleInputChange}
                  placeholder="Enter Postal Code"
                />
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="form-section">
            <h3 className="section-title">Medical Information</h3>
            

            <div className="form-row">
              <div className="form-group">
                <label>Allergies</label>
                <textarea 
                  name="ALLERGIES"
                  value={formData.ALLERGIES}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter Allergies"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ongoing Treatment</label>
                <textarea 
                  name="ON_GOING_TREATMENT"
                  value={formData.ON_GOING_TREATMENT}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter Ongoing Treatment"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Other Ongoing Treatment</label>
                <textarea 
                  name="OTHER_ON_GOING_TREATMENT"
                  value={formData.OTHER_ON_GOING_TREATMENT}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter Other Ongoing Treatment"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Other Comorbidities</label>
                <textarea 
                  name="OTHER_COMORBIDITIES"
                  value={formData.OTHER_COMORBIDITIES}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter Other Comorbidities"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register Patient
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;