import React, { useState } from "react";

import { ParkingSpace } from "../typings/parking-space";
import { AiFillCar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Moment } from "moment";
import { generateReceipt } from "../features/receipt-slice";
import Modal from "./Modal";
import { freeUpParkingSpace } from "../features/parking-slice";

const ParkSpaceCard = ({
  id,
  maxVehicleTypeCapacity,
  dateTimeOccupied,
  vehiclePlateNumber,
}: ParkingSpace) => {
  const dispatch = useAppDispatch();
  const maxVehicleSize = useMaxVehicleSize(maxVehicleTypeCapacity);
  const { entryPoints } = useAppSelector((state) => state.parking);
  const [showReceipt, setShowReceipt] = useState(false);

  const { timeConsumed, totalCost } = useAppSelector((state) => state.receipt);

  const onClickCard = () => {
    if (dateTimeOccupied === null) {
      return;
    }

    dispatch(
      generateReceipt({
        timeStarted: dateTimeOccupied,
        parkingSize: maxVehicleTypeCapacity,
        vehiclePlateNumber: vehiclePlateNumber ?? "",
      })
    );

    dispatch(freeUpParkingSpace({ parkingIndex: Number(id) }));

    setShowReceipt(true);
  };

  return (
    <>
      <Modal showModal={showReceipt} onClose={() => setShowReceipt(false)}>
        <div className="flex flex-col items-center justify-start">
          <div className="text-left">
            <h1 className="text-xl mb-4">Receipt</h1>

            <div className="flex flex-row">
              <h2 className="font-bold">Time Used:</h2> &nbsp;
              <h2>
                {timeConsumed.days} Days &nbsp; {timeConsumed.hours} Hours
                &nbsp; {timeConsumed.minutes} Minutes
              </h2>
            </div>

            <h2>
              <span className="font-bold">Total Cost:</span> ₱{totalCost}
            </h2>
          </div>
        </div>
      </Modal>

      <div
        className={`flex flex-row justify-start items-center bg-white m-2 rounded-md w-[290px] ${
          dateTimeOccupied !== null && "cursor-pointer hover:opacity-60"
        } `}
        onClick={onClickCard}
      >
        <div
          className={`${
            dateTimeOccupied === null ? "bg-green-400" : "bg-red-400"
          } p-4 rounded-md h-full flex items-center justify-center`}
        >
          <AiFillCar className="text-white text-3xl" />
        </div>

        <div className="p-4 text-left text-sm">
          <h5>
            <span className="font-bold">Max Vehicle Size:</span>{" "}
            {maxVehicleSize}
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
    </>
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
