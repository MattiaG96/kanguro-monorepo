export const DEFAULT_COORDINATES: number[] = [40.428374, -3.707911];

export const setMapCenterUtility = (
  setMapCenter: (value: number[]) => void,
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setMapCenter([longitude, latitude]);
      },
      () => setMapCenter(DEFAULT_COORDINATES),
    );
    return;
  }
  setMapCenter(DEFAULT_COORDINATES);
};
