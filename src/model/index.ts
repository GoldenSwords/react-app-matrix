import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
import { RootState as Common } from "src/reducer/Common";
import { RootState as Tree } from "src/reducer/Tree";
import { RootState as Temp } from "src/reducer/Temp";
export interface RootState {
  jurisdiction: JurisdictionState,
  common: Common
  tree: Tree,
  temp: Temp,
}