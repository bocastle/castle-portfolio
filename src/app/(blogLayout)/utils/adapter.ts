import {
  AllArticle,
  ArticleLinkerData,
  ArticlePageHeaderData,
  BlogCategory,
  BlogTag,
  DataBaseCategoryResponse,
  DataBaseMetaDataResponse,
  FeaturedArticle,
  QueryPageResponse,
} from "../api/types";

export class NotionQueryPageResponse {
  protected page: QueryPageResponse | Array<QueryPageResponse>;

  constructor(page: QueryPageResponse | Array<QueryPageResponse>) {
    this.page = page;
  }
}

export class NotionDataBaseMetaDataAdapter {
  private metaData: DataBaseMetaDataResponse;

  constructor(metaData: DataBaseMetaDataResponse) {
    this.metaData = metaData;
  }

  convertToTagList(): BlogTag[] {
    return this.metaData.properties.tags.multi_select.options;
  }
}

export class NotionPageAdapter extends NotionQueryPageResponse {
  private list = this.page as QueryPageResponse;
  convertToArticlePageHeaderData(): ArticlePageHeaderData {
    const {
      properties: { name, description, category, tags, createdAt, thumbnail },
      created_time,
    } = this.list;
    return {
      title: name.title?.[0]?.plain_text ?? "",
      description: description.rich_text?.[0]?.plain_text ?? "",
      categoryList: category.multi_select.map(({ id, name, description }) => ({
        id,
        name,
        description,
      })),
      tagList: tags.multi_select.map(({ id, name }) => ({ id, name })),
      createdAt: new Date(createdAt.date?.start ?? created_time),
      thumbnailUrl: thumbnail?.files?.[0]?.file.url ?? "기본 이미지 url",
    };
  }

  convertToArticleLinkerData(): ArticleLinkerData {
    const {
      id: pageId,
      properties: { name },
    } = this.list;

    return {
      pageId,
      title: name.title?.[0]?.plain_text ?? "",
    };
  }
}

export class NotionPageListAdapter extends NotionQueryPageResponse {
  private list = this.page as Array<QueryPageResponse>;

  convertToFeaturedArticleList(): FeaturedArticle[] {
    return this.list.map(
      ({
        id: pageId,
        properties: { ID, name, description, createdAt, updatedAt, thumbnail },
        created_time,
      }) => ({
        id: ID?.unique_id.number,
        title: name.title?.[0]?.plain_text ?? "",
        description: description.rich_text?.[0]?.plain_text ?? "",
        createdAt: new Date(createdAt.date?.start ?? created_time),
        updatedAt: new Date(updatedAt.created_time ?? created_time),
        thumbnailUrl: thumbnail?.files?.[0]?.file.url ?? "기본 이미지 url",
        pageId,
      })
    );
  }

  convertToAllArticleList(): AllArticle[] {
    return this.list.map(
      ({
        id: pageId,
        properties: {
          ID,
          name,
          category,
          createdAt,
          updatedAt,
          tags,
          thumbnail,
        },
        created_time,
      }) => ({
        id: ID?.unique_id.number,
        title: name.title?.[0]?.plain_text ?? "",
        categoryList: category.multi_select.map(
          ({ id, name, description }) => ({
            id,
            name,
            description,
          })
        ),
        tagList: tags.multi_select.map(({ id, name }) => ({ id, name })),
        createdAt: new Date(createdAt.date?.start ?? created_time),
        updatedAt: new Date(updatedAt.created_time ?? created_time),
        thumbnailUrl: thumbnail?.files?.[0]?.file.url ?? "기본 이미지 url",
        pageId,
      })
    );
  }
}

export class NotionDataBaseCategoryAdapter {
  private metaData: DataBaseCategoryResponse;

  constructor(metaData: DataBaseCategoryResponse) {
    this.metaData = metaData;
  }

  convertToCategoryList(): BlogCategory[] {
    return this.metaData.properties.category.multi_select.options;
  }
}
