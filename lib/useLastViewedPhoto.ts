import { createGlobalState } from "react-hooks-global-state";

const initialState: { lastViewedPhoto: string | null } = {
  lastViewedPhoto: null,
};

const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedPhoto = () => {
  return useGlobalState("lastViewedPhoto");
};
