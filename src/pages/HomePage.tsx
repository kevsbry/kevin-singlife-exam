import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import PageLayout from "../components/PageLayout";
import ParkSpaceCard from "../components/ParkSpaceCard";
import {
  generateParkingSpaces,
  generateInitialEntryPoints,
} from "../features/parking-slice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { parkingSpaces } = useAppSelector((state) => state.parking);

  useEffect(() => {
    dispatch(generateParkingSpaces({ parkingSpaceQty: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(generateInitialEntryPoints({ parkingSpaces, entryPointsQty: 3 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parkingSpaces]);

  return (
    <PageLayout>
      <div className="flex flex-row flex-wrap justify-center">
        {parkingSpaces.map(
          ({
            dateTimeOccupied,
            id,
            vehiclePlateNumber,
            maxVehicleTypeCapacity,
          }) => (
            <ParkSpaceCard
              key={id}
              id={id}
              vehiclePlateNumber={vehiclePlateNumber}
              dateTimeOccupied={dateTimeOccupied}
              maxVehicleTypeCapacity={maxVehicleTypeCapacity}
            />
          )
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
