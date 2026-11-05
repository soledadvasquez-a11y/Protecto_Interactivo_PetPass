import alerts from '../data/alerts.js'

export function getAlerts(req, res) {
  const type = req.query.type
  const zone = req.query.zone

  const visibleAlerts = alerts.filter(
    (alert) => {
      const matchesType =
        !type || alert.type === type

      const matchesZone =
        !zone || alert.zone === zone

      return matchesType && matchesZone
    }
  )

  res.json(visibleAlerts)
}

export function getAlertById(req, res) {
  const alert = alerts.find(
    (item) => item.id === Number(req.params.id)
  )

  if (!alert) {
    return res.status(404).json({
      error: 'Alerta no encontrada',
    })
  }

  res.json(alert)
}
