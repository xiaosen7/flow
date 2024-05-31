import {
  DEVICE_WIDTH_LG,
  DEVICE_WIDTH_MD,
  DEVICE_WIDTH_SM,
  IS_CLIENT_SIDE,
} from "@/constants";
import { useSize } from "ahooks";

export function useMediaQuery() {
  const { width = 1920 } = IS_CLIENT_SIDE
    ? useSize(document.body) ?? {}
    : { width: 1920 };

  const isLessThanSM = width < DEVICE_WIDTH_SM;
  const isGreaterThanSM = width >= DEVICE_WIDTH_SM;
  const isLessThanMD = width < DEVICE_WIDTH_MD;
  const isGreaterThanMD = width >= DEVICE_WIDTH_MD;
  const isLessThanLG = width < DEVICE_WIDTH_LG;
  const isGreaterThanLG = width >= DEVICE_WIDTH_LG;

  return {
    isLessThanSM,
    isGreaterThanSM,
    isLessThanMD,
    isGreaterThanMD,
    isLessThanLG,
    isGreaterThanLG,
  };
}
