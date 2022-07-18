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
    dispatch(generateParkingSpaces({ parkingSpaceQty: 20 }));
  }, []);

  useEffect(() => {
    dispatch(generateInitialEntryPoints({ parkingSpaces, entryPointsQty: 3 }));
  }, [parkingSpaces]);

  return (
    <PageLayout>
      <div className="flex flex-row flex-wrap justify-center">
        {parkingSpaces.map(
          ({ dateTimeOccupied, id, maxVehicleTypeCapacity }) => (
            <ParkSpaceCard
              key={id}
              id={id}
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
