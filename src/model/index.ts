import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
import { RootState as Common } from "src/reducer/Common";
export interface RootState {
  jurisdiction: JurisdictionState,
  common: Common
}