import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
import { RootState as Common } from "src/reducer/Common";
import { RootState as Tree } from "src/reducer/Tree";
export interface RootState {
  jurisdiction: JurisdictionState,
  common: Common
  tree: Tree,
}