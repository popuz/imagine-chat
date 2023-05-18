import {
  ColliderLayer,
  engine,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Quaternion } from '@dcl/sdk/math'

import { createGLTF } from './factory'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

// Base
createGLTF({ scale: { x: 1, y: 1, z: 1 } }, 'models/baseDarkWithCollider.glb')

const screenBody = createGLTF({ position: { x: 22, y: 0.05, z: 22 }, rotation: Quaternion.fromEulerDegrees(0, 45, 0), scale: { x: 0.5 , y: 0.5, z: 0.5 } }, 'models/screen.glb')
const screenBody2 = createGLTF({ position: { x: 8, y: 0.05, z: 22 }, rotation: Quaternion.fromEulerDegrees(0, -45, 0), scale: { x: 0.5 , y: 0.5, z: 0.5 } }, 'models/screen.glb')
const screenBody3 = createGLTF({ position: { x: 8, y: 0.05, z: 8 }, rotation: Quaternion.fromEulerDegrees(0, -135, 0), scale: { x: 0.5 , y: 0.5, z: 0.5 } }, 'models/screen.glb')
const screenBody4 = createGLTF({ position: { x: 22, y: 0.05, z: 8 }, rotation: Quaternion.fromEulerDegrees(0, -225, 0), scale: { x: 0.5 , y: 0.5, z: 0.5 } }, 'models/screen.glb')

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
    'https://hackathon-server-lac.vercel.app/showImage'}),
  emissiveIntensity: 0.6,
  roughness: 1.0
})


pointerEventsSystem.onPointerDown(
  screen,
  () => {
     // change player realm
  },
  { button: InputAction.IA_POINTER, hoverText: 'Go to realm' }
)
