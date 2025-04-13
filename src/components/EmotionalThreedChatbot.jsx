import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../compo/Experience";
import { UI } from "../compo/UI";

export default function EmotionalThreedChatbot(){
    return (
        <>
          <Loader />
          <Leva hidden />
          <UI />
          <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
            <Experience />
          </Canvas>
        </>
      );    
}