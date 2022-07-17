import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  generateParkingSpaces,
  generateInitialEntryPoints,
  getClosestParkingSpace,
} from "../features/parking-slice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { parkingSpaces, currentClosestParkingSpace } = useAppSelector(
    (state) => state.parking
  );

  useEffect(() => {
    dispatch(generateParkingSpaces({ parkingSpaceQty: 20 }));
  }, []);

  useEffect(() => {
    dispatch(generateInitialEntryPoints({ parkingSpaces, entryPointsQty: 3 }));
  }, [parkingSpaces]);

  return (
    <div
      onClick={() => {
        dispatch(getClosestParkingSpace({ entryPoint: 1, vehicleSize: 1 }));
      }}
    >
      HomePage {currentClosestParkingSpace}
    </div>
  );
};

export default HomePage;
