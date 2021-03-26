import { ReplaySubject } from 'rxjs';

export interface BaseModelInterface {
  _id?: string;
}

/** Emit when values are changed with fromObject method */
export abstract class BaseModel<
  I extends BaseModelInterface,
  P extends {}
> extends ReplaySubject<void> {
  /** Store model properties */
  props: I = <I>{};

  /** Constructor */
  constructor(object: I) {
    super();
    if (object !== null) {
      this.fromObject(object);
    }
  }

  /** Short function to get id */
  getId(): string {
    return this.props._id;
  }
  /** Short function to get label of instance */
  abstract getLabel(): string;
  /** Denotes if the instance has been created or already exists in the API */
  isNew(): boolean {
    return !this.getId();
  }
  /** Denotes if the instance has been populated */
  exists(): boolean {
    return !!this.props && typeof this.getId() !== 'undefined';
  }
  /** Extract id from model, interface or string */
  extractId<
    U extends BaseModelInterface,
    V extends {},
    W extends BaseModel<U, V>
  >(input: string | W | U): string {
    if (typeof input === 'string') return input;
    if (typeof input === 'object') {
      if (typeof (<U>input)._id === 'string') return (<U>input)._id;
      if (typeof (<W>input).getId === 'function') return (<W>input).getId();
    }
    return null;
  }
  /** Populate the current instance from an object */
  abstract fromObject(object: I): void;
  /** Convert the current instance to an object */
  abstract toObject(): I;
  /** Convert an instance to an object to be sent to the API */
  abstract toPayload(): P;
}
