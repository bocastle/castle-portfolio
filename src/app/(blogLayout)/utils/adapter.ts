import { BlogTag, DataBaseMetaDataResponse } from "../api/types";

export class NotionDataBaseMetaDataAdapter {
  private metaData: DataBaseMetaDataResponse;

  constructor(metaData: DataBaseMetaDataResponse) {
    this.metaData = metaData;
  }

  convertToTagList(): BlogTag[] {
    return this.metaData.properties.tags.multi_select.options;
  }
}
