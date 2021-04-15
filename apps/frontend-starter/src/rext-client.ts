import { TagService } from './tag.service';

export class RextClient {
  public apiUrl: URL;

  constructor(apiUrl: string | URL) {
    this.apiUrl = new URL(apiUrl.toString());
  }

  private tagService!: TagService;

  get tag() {
    if (!this.tagService) {
      this.tagService = new TagService(this.apiUrl);
    }

    return this.tagService;
  }
}
