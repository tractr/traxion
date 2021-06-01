import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'file-storage-upload-button',
  templateUrl: './file-storage-upload-button.component.html',
})
export class FileStorageUploadButtonComponent implements OnInit {
  //  /** The image to inject in the form */
  //  @Input() image: Image;
  //
  //  /** Called the save button is clicked for a new instance */
  //  @Output() create = new EventEmitter<Image>();
  //
  //  /** Called the save button is clicked for an existing instance */
  //  @Output() update = new EventEmitter<Image>();
  //
  //  /** The form group to use */
  //  form: FormGroup;
  //
  //  /** Denotes if the form is pending */
  //  saving = false;
  //
  //  /** Constructor */
  //  constructor(
  //    private formBuilder: FormBuilder,
  //    private errorService: ErrorService,
  //    public explainErrorsService: ExplainErrorsService,
  //    private imageService: ImageService,
  //  ) {}
  //
  //  /** Init */
  //  ngOnInit() {
  //    // If no instance, create a new one
  //    if (!this.image) {
  //      this.image = new Image();
  //    }
  //    // Form validator
  //    this.form = this.formBuilder.group({
  //      uri: new FormControl(this.image.props.uri, [Validators.required]),
  //    });
  //  }
  //
  //  /** Called on form submit */
  //  async onSubmit(): Promise<void> {
  //    // Saving flag
  //    this.saving = true;
  //    try {
  //      // Update model
  //      this.updateModel();
  //      // Creation or update ?
  //      if (this.image.isNew()) {
  //        // Creation
  //        const image: Image = await this.imageService.create(
  //          this.image.toPayload(),
  //        );
  //        this.create.next(image);
  //      } else {
  //        // Update
  //        await this.imageService.update(
  //          this.image.getId(),
  //          this.image.toPayload(),
  //        );
  //        this.update.next(this.image);
  //      }
  //    } catch (error) {
  //      this.errorService.handle(error);
  //    }
  //    // Saving flag
  //    this.saving = false;
  //  }
  //
  //  /** Update models properties from inputs values */
  //  private updateModel(): void {
  //    for (const key of Object.keys(this.form.controls)) {
  //      this.image.props[key] = this.form.get(key).value;
  //    }
  //  }
}
