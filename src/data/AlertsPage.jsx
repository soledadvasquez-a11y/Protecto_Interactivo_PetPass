import { useState } from 'react';
import initialAlerts from '../data/alerts.js';

// Mapeo para relacionar los filtros de interfaz con los tipos de datos
const filterToType = {
  'Todos': 'all',
  'Perdidos': 'lost',
  'Adopción': 'adoption',
  'Emergencias': 'emergency',
};

function AlertsPage() {
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedZone, setSelectedZone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState('lost');

  // Filtrado real de la lista
  const filteredAlerts = alertsList.filter((alert) => {
    const targetType = filterToType[activeFilter];
    const matchesType = activeFilter === 'Todos' || alert.type === targetType;
    const matchesZone = !selectedZone || alert.zone === selectedZone;
    return matchesType && matchesZone;
  });

  // Construcción e inserción de nueva alerta
  const handleSubmitReport = (newAlertData) => {
    const newAlert = {
      id: Date.now(),
      type: reportType,
      petId: null,
      petName: newAlertData.petName || 'Mascota',
      photo: newAlertData.photo || '',
      zone: newAlertData.zone || 'general',
      location: newAlertData.location || '',
      date: 'Hoy',
      description: newAlertData.description || '',
      contact: newAlertData.contact || '',
      status: 'active',
    };

    setAlertsList([newAlert, ...alertsList]);
    setIsModalOpen(false);
  };

  // Alternar entre active y resolved
  const toggleAlertStatus = (id) => {
    setAlertsList((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? { ...alert, status: alert.status === 'active' ? 'resolved' : 'active' }
          : alert
      )
    );
  };

  // ... (JSX del componente)
}