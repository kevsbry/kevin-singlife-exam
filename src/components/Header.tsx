import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addEntryPoint, occupyParkingSpace } from "../features/parking-slice";
import { getClosestParkingSpaceIndex } from "../helpers/get-closest-parking-space-index";
import { VehicleTypes } from "../typings/parking-space";
import { BsPlusLg } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

import Modal from "./Modal";

const Header = () => {
  const dispatch = useAppDispatch();
  const [vehicleSize, setVehicleSize] = useState(0);
  const vehicleSizes: VehicleTypes[] = [0, 1, 2];

  const [showErrorModal, setShowErrorModal] = useState(false);

  const { parkingSpaces, entryPoints } = useAppSelector(
    (state) => state.parking
  );

  const onClickEntryPoint = (entryPoint: number) => {
    const closestParkingSpace = getClosestParkingSpaceIndex({
      parkingSpaces,
      vehicleSize,
      entryPoints,
      selectedEntryPoint: entryPoint,
    });

    if (closestParkingSpace === null) {
      setShowErrorModal(true);

      return;
    }

    dispatch(occupyParkingSpace({ parkingIndex: closestParkingSpace }));
  };

  return (
    <>
      <Modal
        showModal={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      >
        <BiErrorCircle className="text-4xl ml-auto mr-auto mb-2 text-red-400" />
        <h5 className="text-slate-400">
          No Available parking space for you vehicle
        </h5>
      </Modal>

      <div className="bg-white w-[60vw] p-2 ml-auto mr-auto mb-8 rounded-md flex flex-wrap flex-row justify-start items-center">
        <div className="flex flex-row items-center">
          <h5 className="">Vehicle Size:</h5>
          <select
            className="ml-2 mr-4 bg-slate-100 rounded-md p-1"
            onChange={(e) => {
              const value = Number(e.target.value);
              setVehicleSize(value);
            }}
          >
            {vehicleSizes.map((size, i) => (
              <option key={i} value={size}>
                {getSizeName(size)}
              </option>
            ))}
          </select>
        </div>

        {entryPoints.map((_, i) => (
          <button
            key={i}
            className="bg-yellow-400 text-white p-1 rounded-md m-2 hover:opacity-80 transition-opacity"
            onClick={() => {
              onClickEntryPoint(i);
            }}
          >
            Entry Point {i}
          </button>
        ))}

        <button
          className="text-yellow-400 hover:bg-yellow-100 transition-colors p-2 rounded-full m-2 hover:opacity-80"
          onClick={() => {
            dispatch(addEntryPoint());
          }}
        >
          <BsPlusLg className="" />
        </button>
      </div>
    </>
  );
};

// Helpers

const getSizeName = (size: VehicleTypes) => {
  switch (size) {
    case 0:
      return "Small";

    case 1:
      return "Medium";

    case 2:
      return "Large";
  }
};

export default Header;
