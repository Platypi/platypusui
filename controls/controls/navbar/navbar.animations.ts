/// <reference path="../../references.d.ts" />

module platui {
	/**
     * An animation control that enlarges and shrinks a transparent circle behind the navbar action
     */
	export class NavbarActionPulse extends plat.ui.animations.SimpleCssAnimation {
		className = __NavbarActionPulse;
	}

	plat.register.animation(__NavbarActionPulse, NavbarActionPulse);
}