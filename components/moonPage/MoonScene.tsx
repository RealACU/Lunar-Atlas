"use client";

import { useEffect, useRef, MutableRefObject, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Cylinder } from "@react-three/drei";
import { TextureLoader, ClampToEdgeWrapping, Group } from "three";
import useControls from "@/hooks/useControls";
import { toast } from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { moonquakeData } from "@/data/moonquakeData";
import { Button } from "../ui/button";
import { format } from "date-fns";
import Image from "next/image";

const MoonScene = () => {
  const controls = useControls();
  const [showCrosshair, setShowCrosshair] = useState(false);
  const moonRotation = useRef<[number, number]>([0, 0]);
  const isDragging = useRef(false);

  const data = useMemo(() => {
    return new Map(Object.entries(moonquakeData));
  }, []);

  const notificationText = (type: string | null | undefined) => {
    // If there is a type in the dataset, format it
    if (type) {
      type = "The Apollo " + type;
      type = type.replace("LM", "Lunar Module");
      return type + " has landed!";
    }

    return "A moonquake has occured!";
  };

  useEffect(() => {
    let intervalId: any;

    if (!controls.paused) {
      intervalId = setInterval(
        () => {
          const newDate = new Date(controls.date);

          // Increment the day by 1
          newDate.setDate(newDate.getDate() + 1);

          controls.setDate(newDate);
        },
        controls.fastForwarding ? 200 : 500
      ); // Increments the day every 500ms (regular speed) or 200ms (fast forwarding)
    }

    const date = controls.date.getTime().toString();
    const info = data.get(date);

    if (info) {
      toast((t) => (
        <Alert>
          <AlertTitle>{notificationText(info.type)}</AlertTitle>
          <AlertDescription className="flex gap-2">
            <Button
              onClick={() => {
                const lat_radians = (parseFloat(info.latitude) * Math.PI) / 180;
                const lon_radians =
                  (parseFloat(info.longitude) * Math.PI) / 180;

                moonRotation.current[0] = Math.PI / 2 - lat_radians;
                moonRotation.current[1] = -lon_radians;

                controls.setNaturalRotationSpeed(0);
                setShowCrosshair(true);

                setInterval(() => {
                  setShowCrosshair(false);
                }, 800);

                toast(
                  (t) => (
                    <Alert>
                      <AlertTitle>Info</AlertTitle>
                      <AlertDescription className="flex flex-col">
                        <p>Date: {format(parseInt(date), "PPP")}</p>
                        <p>Time (Hours/Minutes/Seconds): {info.time}</p>
                        <p>Latitude: {info.latitude}</p>
                        <p>Longitude: {info.longitude}</p>
                        <p>Magnitude: {info.magnitude || "N/A"}</p>
                        <p>Type: {info.type ? "Landing" : "Moonquake"}</p>
                        <Button onClick={() => toast.dismiss(t.id)}>
                          Dismiss
                        </Button>
                      </AlertDescription>
                    </Alert>
                  ),
                  { position: "bottom-center" }
                );

                toast.dismiss(t.id);
              }}
            >
              View
            </Button>
            <Button onClick={() => toast.dismiss(t.id)} variant="secondary">
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      ));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [controls, data]);

  const handleDrag = (e: MouseEvent) => {
    isDragging.current = true;
    const moonRotationY = (moonRotation.current[1] + e.movementY * 0.01) % 360;
    const moonRotationX =
      (moonRotation.current[0] +
        e.movementX * 0.01 * Math.sign(Math.cos(moonRotationY))) %
      360;

    moonRotation.current[1] = moonRotationY;
    moonRotation.current[0] = moonRotationX;
  };

  // Register mouse event listeners
  const addMouseListeners = () => {
    window.addEventListener("mousemove", handleDrag);
  };

  // Unregister mouse event listeners
  const removeMouseListeners = () => {
    window.removeEventListener("mousemove", handleDrag);
    isDragging.current = false;
  };

  return (
    <div className="h-2/3 sm:h-full relative">
      <Image
        src="/crosshair.png"
        alt="crosshair"
        height={200}
        width={200}
        className={`opacity-0 pointer-events-none absolute z-50 top-[calc(50%-100px)] left-[calc(50%-100px)] ${
          showCrosshair ? "show" : ""
        }`}
      />
      <Canvas
        className="canvas"
        onPointerDown={addMouseListeners}
        onPointerUp={removeMouseListeners}
      >
        <ambientLight intensity={controls.ambientLightIntensity} />
        <pointLight
          position={[20, 0, 0]}
          intensity={controls.directLightIntensity}
        />
        <Moon moonRotation={moonRotation} isDragging={isDragging} />
      </Canvas>
    </div>
  );
};

export default MoonScene;

interface MoonProps {
  moonRotation: MutableRefObject<[number, number]>;
  isDragging: MutableRefObject<boolean>;
}

const Moon: React.FC<MoonProps> = ({ moonRotation, isDragging }) => {
  const controls = useControls();
  const textureLoader = useMemo(() => {
    return new TextureLoader();
  }, []);
  const moonTexture = useMemo(
    () => textureLoader.load("/moon_texture.jpg"),
    [textureLoader]
  );
  const moonLatLonTexture = useMemo(
    () => textureLoader.load("/moon_latlon_texture.jpg"),
    [textureLoader]
  );
  const moonDisplacementTexture = useMemo(
    () => textureLoader.load("/moon_displacement_texture.jpg"),
    [textureLoader]
  );
  const moonMineralTexture = useMemo(
    () => textureLoader.load("/moon_mineral_texture.png"),
    [textureLoader]
  );

  // Texture wrapping scales to fit object
  moonTexture.wrapS = moonTexture.wrapT = ClampToEdgeWrapping;

  // Automatic rotation
  const meshRef = useRef<Group | null>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = moonRotation.current[1];

      if (!isDragging.current) {
        moonRotation.current[0] += controls.naturalRotationSpeed;
        meshRef.current.rotation.y = moonRotation.current[0];
      } else {
        meshRef.current.rotation.y = moonRotation.current[0];
      }
    }
  });

  const getTexture = (value: string) => {
    switch (value) {
      case "regular":
        return moonTexture;
      case "latlon":
        return moonLatLonTexture;
      case "displacement":
        return moonDisplacementTexture;
      case "mineral":
        return moonMineralTexture;
    }
  };

  return (
    <group ref={meshRef}>
      <Sphere args={[2, 40, 40]}>
        <meshPhongMaterial map={getTexture(controls.moonView)} />
      </Sphere>
      {controls.showAxes && (
        <>
          <Cylinder args={[0.01, 0.01, 5, 32]} rotation={[0, 0, 80.11]}>
            <meshBasicMaterial attach="material" color="orange" />
          </Cylinder>
          <Cylinder args={[0.01, 0.01, 5, 32]}>
            <meshBasicMaterial attach="material" color="green" />
          </Cylinder>
          <Cylinder args={[0.01, 0.01, 5, 32]} rotation={[80.11, 0, 0]}>
            <meshBasicMaterial attach="material" color="blue" />
          </Cylinder>
        </>
      )}
    </group>
  );
};
