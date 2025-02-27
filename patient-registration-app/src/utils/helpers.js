// Format date to display in a more readable format
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Convert a file to base64
  export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  // Extract only needed fields for patient summary
  export const getPatientSummary = (patient) => {
    if (!patient) return null;
    
    return {
      id: patient.PATIENT_ID,
      name: `${patient.FIRST_NAME} ${patient.MIDDLE_NAME || ''} ${patient.LAST_NAME}`,
      email: patient.EMAIL_ID,
      phone: patient.PHONE_NUMBER_1,
      address: patient.address_line1,
      city: patient.city_code,
      state: patient.state_name
    };
  };