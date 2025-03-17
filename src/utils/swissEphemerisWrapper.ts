// import * as swisseph from "swisseph";


// // Set the ephemeris path
// //swisseph.swe_set_ephe_path('C:\Users\malay\Downloads\swisseph-master\swisseph-master\ephe');

// // // Set the path to the Swiss Ephemeris files
//  swisseph.swe_set_ephe_path("C:\Users\malay\Downloads\swisseph-master\swisseph-master\ephe");

// export const generateNatalChart = async (birthDetails: any) => {
//   const { date, time, latitude, longitude } = birthDetails;

//   // Ensure date is a Date object
//   const birthDate = new Date(date);

//   // Convert date/time to Julian Day Number
//   const jd = swisseph.swe_julday(
//     birthDate.getFullYear(),
//     birthDate.getMonth() + 1,
//     birthDate.getDate(),
//     time.hours + time.minutes / 60 + time.seconds / 3600,
//     swisseph.SE_GREG_CAL
//   );

//   // Fetch planetary positions
//   const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
//   const positions: any = {};

//   planets.forEach((planet) => {
//     const planetIndex: number = (swisseph as any)[`SE_${planet.toUpperCase()}`];
//     const position = swisseph.swe_calc_ut(jd, planetIndex, swisseph.SEFLG_SWIEPH) as any;

//     if ('longitude' in position) {
//       positions[planet] = {
//         longitude: position.longitude,
//         latitude: position.latitude,
//         speed: position.longitudeSpeed,
//       };
//     } else if ('ra' in position) {
//       positions[planet] = {
//         ra: position.ra,
//         decl: position.decl,
//         speed: position.raSpeed,
//       };
//     } else if (!('error' in position)) {
//       positions[planet] = {
//         x: position.x,
//         y: position.y,
//         z: position.z,
//         speed: position.dx,
//       };
//     } else {
//       positions[planet] = {
//         error: position.error,
//       };
//     }
//   });

//   return positions;
// };



import * as swisseph from "swisseph";

// Set the path to the Swiss Ephemeris files
swisseph.swe_set_ephe_path("C:\\Users\\malay\\Downloads\\swisseph-master\\swisseph-master\\ephe");

// Define types for possible position structures returned by Swiss Ephemeris
type EphemerisPosition = {
  longitude?: number;
  latitude?: number;
  speed?: number;
  rectAscension?: number;
  declination?: number;
  rectAscensionSpeed?: number;
  x?: number;
  y?: number;
  z?: number;
  dx?: number;
  error?: string;
};

export const generateNatalChart = async (birthDetails: any) => {
  const { date, time, latitude, longitude } = birthDetails;

  // Ensure date is a Date object
  const birthDate = new Date(date);

  // Convert date/time to Julian Day Number
  const jd = swisseph.swe_julday(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    birthDate.getDate(),
    time.hours + time.minutes / 60 + time.seconds / 3600,
    swisseph.SE_GREG_CAL
  );

  // Fetch planetary positions
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const positions: Record<string, EphemerisPosition> = {};

  planets.forEach((planet) => {
    const planetIndex: number = (swisseph as any)[`SE_${planet.toUpperCase()}`];
    const position = swisseph.swe_calc_ut(jd, planetIndex, swisseph.SEFLG_SWIEPH) as EphemerisPosition;

    if ('longitude' in position && 'latitude' in position && 'speed' in position) {
      positions[planet] = {
        longitude: position.longitude,
        latitude: position.latitude,
        speed: position.speed,
      };
    } else if ('rectAscension' in position && 'declination' in position && 'rectAscensionSpeed' in position) {
      positions[planet] = {
        rectAscension: position.rectAscension,
        declination: position.declination,
        rectAscensionSpeed: position.rectAscensionSpeed,
      };
    } else if ('x' in position && 'y' in position && 'z' in position && 'dx' in position) {
      positions[planet] = {
        x: position.x,
        y: position.y,
        z: position.z,
        dx: position.dx,
      };
    } else {
      positions[planet] = {
        error: position.error,
      };
    }
  });

  return positions;
};