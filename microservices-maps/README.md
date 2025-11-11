# Microservicio Maps

Gestiona mapas de navegación para proyectos. Cada mapa tiene una imagen base y marcadores que apuntan a escenas.

## Modelo
```
Map {
  projectId: string,
  baseImagePath: string,
  markers: [
    { _id, sceneId: string, x: number, y: number, description?: string }
  ],
  createdAt, updatedAt
}
``` 

## Mensajes (RabbitMQ)
Cola: `maps`

| MSG | Payload | Descripción |
|-----|---------|------------|
| CREATE_MAP | CreateMapDTO | Crear mapa |
| FIND_MAPS_BY_PROJECT | projectId:string | Listar mapas por proyecto |
| FIND_MAP | id:string | Obtener mapa por id |
| UPDATE_MAP | { id, dto: UpdateMapDTO } | Actualizar mapa |
| DELETE_MAP | id:string | Eliminar mapa |
| ADD_MARKER | { mapId, marker: MarkerDTO } | Agregar marcador |
| UPDATE_MARKER | { mapId, markerId, marker: UpdateMarkerDTO } | Actualizar marcador |
| DELETE_MARKER | { mapId, markerId } | Eliminar marcador |

## DTOs
```ts
CreateMapDTO { projectId, baseImagePath, markers? }
UpdateMapDTO { projectId?, baseImagePath?, markers? }
MarkerDTO { sceneId, x, y, description? }
UpdateMarkerDTO { sceneId?, x?, y?, description? }
```

## Ejemplo creación
```json
{
  "projectId": "123",
  "baseImagePath": "/uploads/maps/mapa1.png",
  "markers": [
    { "sceneId": "sceneA", "x": 0.25, "y": 0.6, "description": "Entrada" }
  ]
}
```

## Notas
- La subida física del PNG se gestiona en el API Gateway; acá solo se almacena la ruta.
- `x` y `y` pueden representar coordenadas relativas (0-1) sobre la imagen.
