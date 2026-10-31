import { Canvas } from '@react-three/fiber';
import HeroScene from './HeroScene';

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 2]}>
      <HeroScene />
    </Canvas>
  );
}
