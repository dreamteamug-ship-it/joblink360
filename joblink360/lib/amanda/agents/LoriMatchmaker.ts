export const matchTruckToCargo = async (cargoId: string) => {
  return {
    cargoId,
    assignedTruck: "ALX-990",
    routeEfficiency: "96%",
    status: "DISPATCH_READY"
  };
};
