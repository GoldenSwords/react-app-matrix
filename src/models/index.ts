// import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
// import { RootState as Common } from "src/reducer/Common";
// import { RootState as Tree } from "src/reducer/Tree";
// import { RootState as Temp } from "src/reducer/Temp";
// import { RootState as Zoom } from "src/reducer/Zoom";
import { RootState as JurisdictionState } from "src/reducer/Jurisdiction";
import { RootState as Common } from "src/reducer/Common";
import { RootState as Tree } from "src/reducer/Tree";
import { RootState as Temp } from "src/reducer/Temp";
import { RootState as Zoom } from "src/reducer/Zoom";

export interface RootState {
  jurisdiction: JurisdictionState,
  common: Common
  tree: Tree,
  zoom: Zoom,
  temp: Temp,
}