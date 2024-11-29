import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';

function PredictionForm() {
  const [formData, setFormData] = useState({
    kilometrage: 15000,
    annee: 2020,
    marque: '',
    carburant: 'Essence',
    transmission: 'Manuelle',
    modele: '208',
    etat: 'Occasion',
  });
  const [prediction, setPrediction] = useState(null);

  const marquesDisponibles = [
    'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep', 
    'Kia', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 
    'Peugeot', 'Renault', 'Seat', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 
    'Toyota', 'Volkswagen', 'Volvo'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSliderChange = (field) => (event, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/predict_combined`,
        formData
      );
      setPrediction(response.data);
    } catch (error) {
      console.error('Erreur lors de la prédiction', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Prédiction des Voitures d&apos;Occasion
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Kilométrage</InputLabel>
          <Slider
            value={formData.kilometrage}
            onChange={handleSliderChange('kilometrage')}
            min={0}
            max={300000}
            step={1000}
            valueLabelDisplay="auto"
            name="kilometrage"
          />
        </FormControl>
        <FormControl fullWidth>
          <Slider
            value={formData.annee}
            onChange={handleSliderChange('annee')}
            min={1980}
            max={2024}
            step={1}
            valueLabelDisplay="auto"
            name="annee"
            />
            <InputLabel>Année</InputLabel>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Marque</InputLabel>
          <Select
            name="marque"
            value={formData.marque}
            onChange={handleChange}
          >
            {marquesDisponibles.map((marque) => (
              <MenuItem key={marque} value={marque}>
                {marque}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Modèle"
          variant="outlined"
          name="modele"
          type="text"
          value={formData.modele}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel></InputLabel>
          <Select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
          >
            <MenuItem value="Manuelle">Manuelle</MenuItem>
            <MenuItem value="Automatique">Automatique</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Type de Carburant"
          variant="outlined"
          name="carburant"
          type="text"
          value={formData.carburant}
          onChange={handleChange}
        />
        <TextField
          label="État"
          variant="outlined"
          name="etat"
          type="text"
          value={formData.etat}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Prédire le Prix
        </Button>
      </Box>
      {prediction && (
        <Box mt={4}>
          <Typography variant="h6">Prix estimé : {prediction.predicted_price} €</Typography>
          <Typography variant="h6">Classification : {prediction.deal_classification}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default PredictionForm;
