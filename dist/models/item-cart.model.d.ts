/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { ItemInterface } from "../interfaces/item.interface";
declare const ItemCartModel: import("mongoose").Model<ItemInterface, {}, {}, {}>;
export default ItemCartModel;
