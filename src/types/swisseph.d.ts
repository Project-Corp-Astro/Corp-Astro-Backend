declare module "swisseph" {
    export const SE_GREG_CAL: number;
    export const SEFLG_SWIEPH: number;
  
    export const SE_SUN: number;
    export const SE_MOON: number;
    export const SE_MARS: number;
    export const SE_MERCURY: number;
    export const SE_JUPITER: number;
    export const SE_VENUS: number;
    export const SE_SATURN: number;
  
    export function swe_julday(
      year: number,
      month: number,
      day: number,
      hour: number,
      calendarType: number
    ): number;
  
    export function swe_calc_ut(
      julianDay: number,
      planetIndex: number,
      flag: number
    ): {
      longitudeSpeed: any; rc: number; longitude: number; latitude: number; speed: number 
};

  export function swe_set_ephe_path(arg0: string) {
    throw new Error("Function not implemented.");
  }
  }
  