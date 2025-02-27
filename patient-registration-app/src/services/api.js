import axios from 'axios'

const API_URL = 'https://y2zso6hvujedviob622jarj3vm.appsync-api.ap-south-1.amazonaws.com/graphql'
const API_KEY = 'da2-szecay4cfrejnksxg6zvtd4la4'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
})

export const getPatients = async () => {
  const query = `
    query {
      listPatients {
        PATIENT_ID
        FIRST_NAME
        MIDDLE_NAME
        LAST_NAME
        EMAIL_ID
        PHONE_NUMBER_1
        DOB
        address_line1
        city_code
        state_name
        ACTIVE_IND
      }
    }
  `

  try {
    const response = await apiClient.post('', { query })
    return response.data.data.listPatients
  } catch (error) {
    console.error('Error fetching patients:', error)
    throw error
  }
}

export const getPatientById = async (id) => {
  const query = `
    query {
      getPatient(PATIENT_ID: ${id}) {
        PATIENT_ID
        FIRST_NAME
        MIDDLE_NAME
        LAST_NAME
        EMAIL_ID
        PHONE_NUMBER_1
        DOB
        address_line1
        address_line2
        city_code
        state_name
        country_name
        pin_code
        GENDER_ID
        blood_group
        marital_status
        HEIGHT
        WEIGHT
        ALLERGIES
        profilePictureData
        profilePictureName
        Education
        Occupation
        Religion
        ACTIVE_IND
      }
    }
  `

  try {
    const response = await apiClient.post('', { query })
    return response.data.data.getPatient
  } catch (error) {
    console.error('Error fetching patient:', error)
    throw error
  }
}

export const createPatient = async (patientData) => {
    // Convert the patient data object to a string with proper field types
    const inputFields = Object.entries(patientData)
      .filter(([key]) => key !== 'PATIENT_ID') // Remove PATIENT_ID from the input
      .map(([key, value]) => {
        // Special handling for phone number fields
        if (key === 'PHONE_NUMBER_1') {
          // Convert to string
          return `${key}: "${value.toString().replace(/^0+/, '')}"`
        } else if (key === 'PHONE_NUMBER_2') {
          // Convert to integer, removing leading zeros
          const phoneNumber = value ? parseInt(value.toString().replace(/^0+/, ''), 10) : null
          return `${key}: ${phoneNumber}`
        } else if (typeof value === 'string') {
          return `${key}: "${value.replace(/"/g, '\\"')}"`
        } else if (value === null || value === undefined) {
          return `${key}: null`
        } else {
          return `${key}: ${value}`
        }
      })
      .join(', ')
  
    // Add PATIENT_ID directly in the mutation string
    const mutation = `
      mutation {
        createPatient(input: {PATIENT_ID: 0, ${inputFields}}) {
          PATIENT_ID
          FIRST_NAME
          LAST_NAME
          EMAIL_ID
          Case_ID
        }
      }
    `
  
    try {
      const response = await apiClient.post('', { query: mutation })
      if (response.data.errors) {
        console.error('GraphQL errors:', response.data.errors)
        throw new Error(response.data.errors[0].message)
      }
      return response.data.data.createPatient
    } catch (error) {
      console.error('Error creating patient:', error)
      throw error
    }
  }

export const updatePatient = async (patientData) => {
  // Convert the patient data object to a string with proper field types
  const inputFields = Object.entries(patientData)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: "${value.replace(/"/g, '\\"')}"`
      } else if (value === null || value === undefined) {
        return `${key}: null`
      } else {
        return `${key}: ${value}`
      }
    })
    .join(', ')

  const mutation = `
    mutation {
      updatePatient(input: {${inputFields}}) {
        PATIENT_ID
        FIRST_NAME
        LAST_NAME
        EMAIL_ID
      }
    }
  `

  try {
    const response = await apiClient.post('', { query: mutation })
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors)
      throw new Error(response.data.errors[0].message)
    }
    return response.data.data.updatePatient
  } catch (error) {
    console.error('Error updating patient:', error)
    throw error
  }
}

export const deletePatient = async (id) => {
  const mutation = `
    mutation {
      deletePatient(PATIENT_ID: ${id}) {
        PATIENT_ID
        FIRST_NAME
        LAST_NAME
      }
    }
  `

  try {
    const response = await apiClient.post('', { query: mutation })
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors)
      throw new Error(response.data.errors[0].message)
    }
    return response.data.data.deletePatient
  } catch (error) {
    console.error('Error deleting patient:', error)
    throw error
  }
}