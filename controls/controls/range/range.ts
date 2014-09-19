module platui {
    /**
     * @name Range
     * @memberof platui
     * @kind class
     * 
     * @extends {platui.Slider}
     * 
     * @description
     * An extension of the {@link platui.Slider|Slider} control that allows for a lower and upper value, 
     * thus creating a variable range of values.
     */
    export class Range extends Slider {

    }

    plat.register.control(__Range, Range);
}
