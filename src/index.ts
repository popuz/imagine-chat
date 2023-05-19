import {
  ColliderLayer,
  engine,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  TransformType
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { createGLTF } from './factory'
import { changeRealm } from "~system/RestrictedActions"

// export all the functions required to make the scene work
export * from '@dcl/sdk'

// Base
createGLTF({ scale: { x: 2, y: 1, z: 1 } }, 'models/baseDarkWithCollider.glb')

const createTotem = (realmName: string, transform: Partial<TransformType>) => {
  const screenBody = createGLTF(transform, 'models/screen.glb')

  // Screen
  const screenDisplay = engine.addEntity()
  Transform.create(screenDisplay, {
    parent: screenBody,
    position: { x: 0, y: 6.15, z: 5 },
    scale: { x: 0.625, y: 0.625, z: 0.625 }
  })

  const screen = engine.addEntity()
  MeshRenderer.setPlane(screen)
  MeshCollider.setPlane(screen, ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS)
  Transform.create(screen, {
    parent: screenDisplay,
    scale: { x: 19.2, y: 10.8, z: 1 },
    rotation: Quaternion.fromEulerDegrees(0, 0, 0)
  })

  Material.setPbrMaterial(screen, {
    texture: Material.Texture.Common({ src: 
      `https://hackathon-server-lac.vercel.app/getRealmImage?realmName=${realmName}`}),
    emissiveIntensity: 0.6,
    roughness: 1.0
  })


  pointerEventsSystem.onPointerDown(
    screen,
    async () => {
      // change player realm
      await changeRealm({
        realm: realmName
      })
    },
    { button: InputAction.IA_POINTER, hoverText: `Go to '${realmName}' realm` }
  )
}

createTotem(
  'dg',
  { position: { x: 4.5, y: 0.0, z: 11.5 }, rotation: Quaternion.fromEulerDegrees(0, -45, 0), scale: { x: 0.25 , y: 0.25, z: 0.25 } }
)

createTotem(
  'loki',
  { position: { x: 16.0, y: 0.0, z: 11.5 }, rotation: Quaternion.fromEulerDegrees(0, 0, 0), scale: { x: 0.25 , y: 0.25, z: 0.25 } }
)