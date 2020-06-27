import TileObject from './TileObject';
import TileSet from './TileSet';

export default class ObjectLayer extends PIXI.Container {

  private static findTileSet(gid: number, tileSets: TileSet[]) {
    let tileset;
    for (let i = tileSets.length - 1; i >= 0; i--) {
      tileset = tileSets[i];
      if (tileset.firstGid && tileset.firstGid <= gid) {
        break;
      }
    }
    return tileset;
  }

  public layer: ILayerData;
  public tileSets: TileSet[];
  public objects: TileObject[];

  constructor(layer: ILayerData, tileSets: TileSet[]) {
    super();

    this.layer = layer;
    this.tileSets = tileSets;
    this.objects = [];

    Object.assign(this, layer);

    this.create();
  }

  public create() {
    (this.layer.objects || []).forEach((obj: ITileObjectData) => {
      const tileset = ObjectLayer.findTileSet(obj.gid, this.tileSets);

      if (tileset) {
        // it renders a bit high for some reason
        (obj as any).y -= obj.height;

        const newObj = new TileObject(obj, tileset, obj.name, obj.visible);

        newObj._x = newObj.x;
        newObj._y = newObj.y;
        newObj._width = newObj.width;
        newObj._height = newObj.height;

        this.objects.push(newObj);
        this.addChild(newObj);
      }
    });

  }
}
