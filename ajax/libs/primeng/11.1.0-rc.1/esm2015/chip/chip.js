import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
export class Chip {
    constructor() {
        this.removeIcon = "pi pi-times-circle";
        this.remove = new EventEmitter();
        this.visible = true;
    }
    containerClass() {
        return {
            'p-chip p-component': true,
            'p-chip-image': this.image != null
        };
    }
    close(event) {
        this.visible = false;
        this.remove.emit(event);
    }
}
Chip.decorators = [
    { type: Component, args: [{
                selector: 'p-chip',
                template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" *ngIf="visible">
            <ng-content></ng-content>
            <img [src]="image" *ngIf="image;else iconTemplate">
            <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="'p-chip-icon'"></span></ng-template>
            <div class="p-chip-text" *ngIf="label">{{label}}</div>
            <span *ngIf="removable" tabindex="0" [class]="removeIcon" [ngClass]="'pi-chip-remove-icon'" (click)="close($event)" (keydown.enter)="close($event)"></span>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-chip{align-items:center;display:inline-flex}.p-chip-icon.pi,.p-chip-text{line-height:1.5}.pi-chip-remove-icon{cursor:pointer;line-height:1.5}.p-chip img{border-radius:50%}"]
            },] }
];
Chip.propDecorators = {
    label: [{ type: Input }],
    icon: [{ type: Input }],
    image: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    removable: [{ type: Input }],
    removeIcon: [{ type: Input }],
    remove: [{ type: Output }]
};
export class ChipModule {
}
ChipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Chip],
                declarations: [Chip]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2hpcC8iLCJzb3VyY2VzIjpbImNoaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBaUIvQyxNQUFNLE9BQU8sSUFBSTtJQWZqQjtRQTZCYSxlQUFVLEdBQVcsb0JBQW9CLENBQUM7UUFFekMsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELFlBQU8sR0FBWSxJQUFJLENBQUM7SUFhNUIsQ0FBQztJQVhHLGNBQWM7UUFDVixPQUFPO1lBQ0gsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1NBQ3JDLENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMzQixDQUFDOzs7WUE3Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUU7Ozs7Ozs7O0tBUVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUV4Qzs7O29CQUdJLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO29CQUVMLEtBQUs7eUJBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUs7cUJBRUwsTUFBTTs7QUFzQlgsTUFBTSxPQUFPLFVBQVU7OztZQUx0QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jaGlwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgKm5nSWY9XCJ2aXNpYmxlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2VcIiAqbmdJZj1cImltYWdlO2Vsc2UgaWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ljb25UZW1wbGF0ZT48c3BhbiAqbmdJZj1cImljb25cIiBbY2xhc3NdPVwiaWNvblwiIFtuZ0NsYXNzXT1cIidwLWNoaXAtaWNvbidcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoaXAtdGV4dFwiICpuZ0lmPVwibGFiZWxcIj57e2xhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVtb3ZhYmxlXCIgdGFiaW5kZXg9XCIwXCIgW2NsYXNzXT1cInJlbW92ZUljb25cIiBbbmdDbGFzc109XCIncGktY2hpcC1yZW1vdmUtaWNvbidcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jaGlwLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoaXAge1xuXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGltYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVtb3ZhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcmVtb3ZlSWNvbjogc3RyaW5nID0gXCJwaSBwaS10aW1lcy1jaXJjbGVcIjtcblxuICAgIEBPdXRwdXQoKSByZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWNoaXAgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtY2hpcC1pbWFnZSc6IHRoaXMuaW1hZ2UgIT0gbnVsbFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNsb3NlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbW92ZS5lbWl0KGV2ZW50KVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ2hpcF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2hpcF1cbn0pXG5leHBvcnQgY2xhc3MgQ2hpcE1vZHVsZSB7IH1cbiJdfQ==