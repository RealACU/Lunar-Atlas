"use client";

import useControls from "@/hooks/useControls";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { ScrollArea } from "../ui/scroll-area";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { AlignJustify, Pause, Play, FastForward } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DesktopUI = () => {
  const controls = useControls();
  const [isOpen, setIsOpen] = useState(true);

  if (isOpen)
    return (
      <div className="h-1/3 sm:h-4/5 w-full sm:w-[30rem] flex flex-col gap-3 sm:absolute top-4 left-4 bg-slate-800 sm:bg-slate-700/30 text-slate-100 p-4 sm:rounded-xl">
        <Button
          variant="secondary"
          className="hidden sm:flex"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
        <ScrollArea>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-3 items-center">
                  Time
                  <Button onClick={() => controls.togglePaused()}>
                    {controls.paused ? <Play /> : <Pause />}
                  </Button>
                  <Button onClick={() => controls.toggleFastForwarding()}>
                    <FastForward />
                  </Button>
                </TableCell>
                <TableCell>
                  <DatePicker />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="flex flex-col">
                  World Axes
                  <p className="pl-2 text-sm">
                    x-axis: <span className="text-orange-600">orange</span>
                  </p>
                  <p className="pl-2 text-sm">
                    y-axis: <span className="text-green-600">green</span>
                  </p>
                  <p className="pl-2 text-sm">
                    z-axis: <span className="text-blue-600">blue</span>
                  </p>
                </TableCell>
                <TableCell>
                  <Button onClick={controls.toggleAxes}>
                    {controls.showAxes ? "On" : "Off"}
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Moon View</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => controls.setMoonView(value)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue="regular"
                        placeholder="Regular"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="latlon">
                          Latitude & Longitude
                        </SelectItem>
                        <SelectItem value="displacement">Height Map</SelectItem>
                        <SelectItem value="mineral">
                          Mineral Composition
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="flex flex-col gap-2">
                  <div className="flex relative">
                    <p>Rotation Speed</p>
                    <p className="font-bold absolute -right-2">
                      {controls.naturalRotationSpeed}
                    </p>
                  </div>
                  <Slider
                    onValueChange={(value) =>
                      controls.setNaturalRotationSpeed(value[0])
                    }
                    value={[controls.naturalRotationSpeed]}
                    max={0.004}
                    min={0}
                    step={0.001}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => controls.setNaturalRotationSpeed(0.002)}
                  >
                    Reset
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="flex flex-col gap-2">
                  <div className="flex relative">
                    <p>Direct Light Intensity</p>
                    <p className="font-bold absolute -right-2">
                      {controls.directLightIntensity}
                    </p>
                  </div>
                  <Slider
                    onValueChange={(value) =>
                      controls.setDirectLightIntensity(value[0])
                    }
                    value={[controls.directLightIntensity]}
                    max={600}
                    min={300}
                    step={5}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => controls.setDirectLightIntensity(500)}>
                    Reset
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="flex flex-col gap-2">
                  <div className="flex relative">
                    <p>Ambient Light Intensity</p>
                    <p className="font-bold absolute -right-2">
                      {controls.ambientLightIntensity}
                    </p>
                  </div>
                  <Slider
                    onValueChange={(value) =>
                      controls.setAmbientLightIntensity(value[0])
                    }
                    value={[controls.ambientLightIntensity]}
                    max={0.5}
                    min={0.1}
                    step={0.1}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => controls.setAmbientLightIntensity(0.2)}
                  >
                    Reset
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Notifications</TableCell>
                <TableCell>
                  <Button onClick={controls.toggleNotifications}>
                    {controls.showNotifications ? "On" : "Off"}
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Button
                    onClick={() =>
                      window.open("https://shivhax.itch.io/moonquake", "_blank")
                    }
                  >
                    View in first person!
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    );
  else
    return (
      <Button onClick={() => setIsOpen(true)} className="absolute top-4 left-4">
        <AlignJustify />
      </Button>
    );
};

export default DesktopUI;
