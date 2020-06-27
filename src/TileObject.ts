import TileSet from './TileSet';

export default class TileObject extends PIXI.extras.AnimatedSprite {
  private static getTextures(object: ITileObjectData, tileSet: TileSet) {
    const textures = [];
    textures.push(tileSet.textures[object.gid - tileSet.firstGid]);

    return textures;
  }

  public gid: number = 0;

  public name: string = '';

  // tslint:disable-next-line:variable-name
  public _x: number = 0;
  // tslint:disable-next-line:variable-name
  public _y: number = 0;
  // tslint:disable-next-line:variable-name
  public _width: number = 0;
  // tslint:disable-next-line:variable-name
  public _height: number = 0;

  public visible: boolean;

  public object: ITileObjectData;
  public tileSet: TileSet;

  constructor(
    object: ITileObjectData,
    tileSet: TileSet,
    name: string,
    visible: boolean,
  ) {

    super(TileObject.getTextures(object, tileSet));

    this.textures = TileObject.getTextures(object, tileSet);
    this.object = object;
    this.tileSet = tileSet;

    this.name = name;
    this.visible = visible;

    Object.assign(this, object);
  }

  public setVisibility(visible: boolean) {
    this.visible = visible;
  }

  public setInteractive(interactive: boolean) {
    this.interactive = interactive;
    this.buttonMode = true;
  }

  public setOnCallback(event: string, callback: () => void) {
    this.on(event, callback);
  }
}
