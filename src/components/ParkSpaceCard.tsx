import React from "react";
import { ParkingSpace } from "../typings/parking-space";

import { AiFillCar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import moment, { Moment } from "moment";

const ParkSpaceCard = ({
  id,
  maxVehicleTypeCapacity,
  dateTimeOccupied,
}: ParkingSpace) => {
  const dispatch = useAppDispatch();
  const maxVehicleSize = useMaxVehicleSize(maxVehicleTypeCapacity);
  const { entryPoints } = useAppSelector((state) => state.parking);

  return (
    <div className="flex flex-row justify-start items-center bg-white m-2 rounded-md w-[290px]">
      <div
        className={`bg-green-400 p-4 rounded-md h-full flex items-center justify-center`}
      >
        <AiFillCar className="text-white text-3xl" />
      </div>

      <div className="p-4 text-left text-sm">
        <h5>
          <span className="font-bold">Max Vehicle Size:</span> {maxVehicleSize}
        </h5>
        <h5 className="mt-1">
          <span className="font-bold">Occupied since:</span>&nbsp;
          {!dateTimeOccupied ? "available" : formatDateTime(dateTimeOccupied)}
        </h5>

        <h5 className="font-bold mt-1">Entry Points Distance:</h5>
        <div className="flex flex-row flex-wrap">
          {entryPoints.map((entryPoint, i) => (
            <h5 key={i}>
              <span className="font-bold">({i})</span>
              {entryPoint[Number(id)]}m&nbsp;
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helpers

const useMaxVehicleSize = (size: number) => {
  switch (size) {
    case 0:
      return "Small";

    case 1:
      return "Medium";

    case 2:
      return "Large";
  }
};

const formatDateTime = (moment: Moment) => {
  const date = moment.date();
  const month = moment.month();
  const year = moment.year();
  const time = moment.format("hh:mm A");

  return `${date}/${month}/${year} @${time}`;
};

export default ParkSpaceCard;
