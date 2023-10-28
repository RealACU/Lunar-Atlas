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
import { moonquakeData } from "@/data/moonquakeData";
import { toast } from "react-hot-toast";

const UI = () => {
  const controls = useControls();
  const [isOpen, setIsOpen] = useState(true);
  const dates = Object.keys(moonquakeData);

  const controlPanel = (
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
            <Button
              className="mt-2"
              variant="secondary"
              onClick={() => {
                for (let i = 0; i < dates.length; i++) {
                  if (+dates[i] > controls.date.getTime()) {
                    return controls.setDate(new Date(+dates[i]));
                  }
                }

                return toast.error("There are no more events", {
                  position: "top-center",
                });
              }}
            >
              Skip to next event
            </Button>
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
            <Select onValueChange={(value) => controls.setMoonView(value)}>
              <SelectTrigger>
                <SelectValue defaultValue="regular" placeholder="Regular" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="latlon">Latitude & Longitude</SelectItem>
                  <SelectItem value="displacement">Height Map</SelectItem>
                  <SelectItem value="mineral">Mineral Composition</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="flex flex-col gap-2">
            <div className="flex relative">
              <p>Rotation Speed</p>
              <p className="font-bold absolute -right-2 sm:right-0">
                {controls.naturalRotationSpeed}
              </p>
            </div>
            <Slider
              onValueChange={(value) =>
                controls.setNaturalRotationSpeed(value[0])
              }
              value={[controls.naturalRotationSpeed]}
              max={4}
              min={0}
              step={1}
            />
          </TableCell>
          <TableCell>
            <Button onClick={() => controls.setNaturalRotationSpeed(1)}>
              Reset
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Show Locations</TableCell>
          <TableCell>
            <Button onClick={controls.toggleLocations}>
              {controls.showLocations ? "On" : "Off"}
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="flex flex-col gap-2">
            <div className="flex relative">
              <p>Direct Light Intensity</p>
              <p className="font-bold absolute -right-2 sm:right-0">
                {controls.directLightIntensity}
              </p>
            </div>
            <Slider
              onValueChange={(value) =>
                controls.setDirectLightIntensity(value[0])
              }
              value={[controls.directLightIntensity]}
              max={30}
              min={10}
              step={1}
            />
          </TableCell>
          <TableCell>
            <Button onClick={() => controls.setDirectLightIntensity(20)}>
              Reset
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="flex flex-col gap-2">
            <div className="flex relative">
              <p>Ambient Light Intensity</p>
              <p className="font-bold absolute -right-2 sm:right-0">
                {controls.ambientLightIntensity}
              </p>
            </div>
            <Slider
              onValueChange={(value) =>
                controls.setAmbientLightIntensity(value[0])
              }
              value={[controls.ambientLightIntensity]}
              max={50}
              min={10}
              step={5}
            />
          </TableCell>
          <TableCell>
            <Button onClick={() => controls.setAmbientLightIntensity(10)}>
              Reset
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Show Notifications</TableCell>
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
  );

  if (isOpen)
    return (
      <section className="h-1/3 sm:h-4/5 w-full sm:w-[30rem] flex flex-col gap-3 sm:absolute top-4 left-4 bg-slate-800 sm:bg-slate-700/30 text-slate-100 p-4 sm:rounded-xl">
        <Button
          variant="secondary"
          className="hidden sm:flex"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
        <ScrollArea className="hidden sm:flex">{controlPanel}</ScrollArea>
        <div className="flex sm:hidden overflow-y-scroll hide-scrollbar">
          {controlPanel}
        </div>
      </section>
    );
  else
    return (
      <Button onClick={() => setIsOpen(true)} className="absolute top-4 left-4">
        <AlignJustify />
      </Button>
    );
};

export default UI;
