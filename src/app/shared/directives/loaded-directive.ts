import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { LoadingComponent } from "../../loading/loading.component";

@Directive({
    selector: '[loaded]'
})
export class LoadedDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {

    }

    @Input()
    public set loaded(data: any) {
        this.viewContainer.clear();
        if (!data) {
            this.viewContainer.createComponent(LoadingComponent);
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}