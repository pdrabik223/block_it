
export enum DebugLevel {
  Off,
  Engine,
  AllLogs,
  Error
}

export enum CellStyle {
  Simple,
  Classic,
  Fake3D,
  Diamond
}

import Cookies from "js-cookie";

export class GlobalState {


  public debugLevel = DebugLevel.Off
  public showPositionEvaluation = false
  public showMovesCount = false
  public cellStyle = CellStyle.Fake3D
  public condenseShapes = true
  public moveDelayMS: number = 100

  constructor() {
    this.initCookies()

  }
  initCookies() {

    let val = Cookies.get("debugLevel")
    if (val == undefined)
      Cookies.set("debugLevel", this.debugLevel.toString())
    else
      this.debugLevel = +val

    val = Cookies.get("showPositionEvaluation")
    if (val == undefined)
      Cookies.set("showPositionEvaluation", this.showPositionEvaluation.toString())
    else
      this.showPositionEvaluation = (val === "true")

    val = Cookies.get("showMovesCount")
    if (val == undefined)
      Cookies.set("showMovesCount", this.showMovesCount.toString())
    else
      this.showMovesCount = (val === "true")

    val = Cookies.get("condenseShapes")
    if (val == undefined)
      Cookies.set("condenseShapes", this.condenseShapes.toString())
    else
      this.condenseShapes = (val === "true")


    val = Cookies.get("cellStyle")
    if (val == undefined)
      Cookies.set("cellStyle", this.cellStyle.toString())
    else
      this.cellStyle = +val

    val = Cookies.get("moveDelayMS")
    if (val == undefined)
      Cookies.set("moveDelayMS", this.moveDelayMS.toString())
    else
      this.moveDelayMS = +val
  }

  updateCookies() {
    let val = Cookies.get("debugLevel")
    if (+val! != this.debugLevel)
      Cookies.set("debugLevel", this.debugLevel.toString())

    val = Cookies.get("cellStyle")
    if (+val! != this.cellStyle)
      Cookies.set("cellStyle", this.cellStyle.toString())

    val = Cookies.get("moveDelayMS")
    if (+val! != this.moveDelayMS)
      Cookies.set("moveDelayMS", this.moveDelayMS.toString())

    val = Cookies.get("showPositionEvaluation")
    if (val != this.showPositionEvaluation.toString())
      Cookies.set("showPositionEvaluation", this.showPositionEvaluation.toString())

    val = Cookies.get("showMovesCount")
    if (val != this.showMovesCount.toString())
      Cookies.set("showMovesCount", this.showMovesCount.toString())

    val = Cookies.get("condenseShapes")
    if (val != this.condenseShapes.toString())
      Cookies.set("condenseShapes", this.condenseShapes.toString())
  }
}
