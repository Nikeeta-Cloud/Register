import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getPatients, deletePatient } from '../services/api'

const PatientList = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await getPatients()
      setPatients(data)
    } catch (error) {
      console.error('Error fetching patients:', error)
      toast.error('Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id)
        toast.success('Patient deleted successfully')
        fetchPatients()
      } catch (error) {
        console.error('Error deleting patient:', error)
        toast.error('Failed to delete patient')
      }
    }
  }

  if (loading) {
    return <div className="loading-container">Loading patients...</div>
  }

  return (
    <div>
      <h2>Patient List</h2>
      <Link to="/register" className="register-button" style={registerButtonStyle}>Register New Patient</Link>
      
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.PATIENT_ID}>
                <td>{patient.PATIENT_ID}</td>
                <td>
                  {patient.FIRST_NAME} {patient.MIDDLE_NAME ? `${patient.MIDDLE_NAME} ` : ''}
                  {patient.LAST_NAME}
                </td>
                <td>{patient.EMAIL_ID}</td>
                <td>{patient.PHONE_NUMBER_1}</td>
                <td>{patient.city_code}</td>
                <td>{patient.ACTIVE_IND === 'Y' ? 'Active' : 'Inactive'}</td>
                <td className="action-buttons">
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(patient.PATIENT_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const registerButtonStyle = {
  display: 'inline-block',
  padding: '10px 15px',
  backgroundColor: '#4a90e2',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  marginBottom: '20px',
  fontWeight: '500'
}

export default PatientList