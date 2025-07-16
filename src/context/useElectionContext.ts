import { useContext } from "react";
import { ElectionContext } from "./ElectionContext";

export const useElectionContext = () => useContext(ElectionContext);
