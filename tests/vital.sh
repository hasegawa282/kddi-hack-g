curl -X POST -H "Content-Type: application/json" -d '{
  "startLat": 35.692429,
  "startLng": 139.699572,
  "endLat": 35.68985,
  "endLng": 139.704292,
  "meshSize": 5,
  "timeUnit": 15,
  "startTime": "202207060900",
  "endTime": "202207060915"
}' https://l955buebw3.execute-api.ap-northeast-1.amazonaws.com/vital-statistics/latlng -H 'x-api-key: ********' | jq