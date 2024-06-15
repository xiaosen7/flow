/* eslint-disable react-hooks/rules-of-hooks */
import { useEventListener, useSetState } from "ahooks";
import { debounce } from "lodash-es";
import {
  DEVICE_WIDTH_LG,
  DEVICE_WIDTH_MD,
  DEVICE_WIDTH_SM,
  IS_SERVER_SIDE,
} from "../constants";

export const useMediaQuery = () => {
  if (IS_SERVER_SIDE) {
    return useMediaQueryServerSide();
  }

  const [{ width }, setState] = useSetState({
    width: document.body.clientWidth,
  });

  const isLessThanSM = width < DEVICE_WIDTH_SM;
  const isGreaterThanSM = width >= DEVICE_WIDTH_SM;
  const isLessThanMD = width < DEVICE_WIDTH_MD;
  const isGreaterThanMD = width >= DEVICE_WIDTH_MD;
  const isLessThanLG = width < DEVICE_WIDTH_LG;
  const isGreaterThanLG = width >= DEVICE_WIDTH_LG;

  useEventListener(
    "resize",
    debounce(() => {
      setState({ width: document.body.clientWidth });
    }, 200),
    { target: window }
  );

  return {
    isLessThanSM,
    isGreaterThanSM,
    isLessThanMD,
    isGreaterThanMD,
    isLessThanLG,
    isGreaterThanLG,
  };
};

const useMediaQueryServerSide = () => {
  const width = 1920;
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
};
